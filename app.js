const express = require('express');
const path = require('path');
const app = express();
const cron = require('node-cron');
const sendDifData = require('./cron-jobs/mail-differences');
const logger = require('./utils/logger')(module)
const cors = require("cors");
const redis = require('redis');
const util = require('util');
//Initialize Redis
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
const cronKey = "cron";

//Initialize Key


cron.schedule('* 12 * * *', async () => {
  let sent = await client.get(cronKey);

  if(!sent) {
    logger.info("setting key first time")
    await client.set(cronKey, "no");
  }

  logger.info('Running CRON JOB 12pm');

  if(sent === "no") {
    await sendDifData();
    await client.set(cronKey, "yes", 'EX', 60 * 60);
    logger.info("Set sent to ues");
  } else {
    logger.info("ALLREADY SENT!! ")
  }
 
  logger.info("AWAITED CRON DIF DATA");
  return;
});


//body parser necessary to parse body for express
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
app.use(express.static(path.join(__dirname, 'client/public')));

// parse application/json
app.use(bodyParser.json())
app.use(cors());
//mongodb+srv://" + process.env.MONGO + "@cluster0-ekehs.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect( "mongodb://localhost:27017/thinkpad", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   }).then(() => {
    logger.info('connected to database');
});

app.use("/api/search", require("./routes/search"));

app.use("/api/data", require("./routes/db"))


const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => {
    logger.info("Server started @ port" + PORT)
});