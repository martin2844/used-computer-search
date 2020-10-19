const express = require('express');
const path = require('path');
const app = express();
const cron = require('node-cron');
const sendDifData = require('./cron-jobs/mail-differences');
 
cron.schedule('* 5 * * *', () => {
  console.log('Running at 5 am');
});

sendDifData();

//body parser necessary to parse body for express
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
app.use(express.static(path.join(__dirname, 'client/public')));

// parse application/json
app.use(bodyParser.json())

//mongodb+srv://" + process.env.MONGO + "@cluster0-ekehs.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect( "mongodb://localhost:27017/thinkpad", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   }).then(() => {
    console.log('connected to database');
});

app.use("/api/comparetodb", require("./routes/search"));

app.use("/api/data", require("./routes/db"))


const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => {
    console.log("Server started @ port" + PORT);
});