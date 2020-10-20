const express = require("express");
const router = express.Router();
const saveQueryToDB = require("../controllers/comparedb");
const logger = require("../utils/logger")(module);

router.get("/:term", (req, res) => {
    const {term} = req.params
    logger.info("searching for term " + term);
    saveQueryToDB(term).then(x => {
        res.send(x);
    });

})

module.exports = router;