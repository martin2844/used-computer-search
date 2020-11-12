const express = require("express");
const router = express.Router();
const saveQueryToDB = require("../controllers/comparedb");
const logger = require("../utils/logger")(module);

router.post("/:term", (req, res) => {
    const {term} = req.params;
    const { password } = req.body;
    if(password === process.env.SEARCH_PASS) {
        logger.info("searching for term " + term);
        saveQueryToDB(term).then(x => {
            console.log(x);
            res.status(200).send(x);
        });
    } else {
        res.status(401).send("WRONG PASSWORD");
    }
})

module.exports = router;