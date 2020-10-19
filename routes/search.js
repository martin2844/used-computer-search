const express = require("express");
const router = express.Router();
const saveQueryToDB = require("../controllers/comparedb");

router.get("/:term", (req, res) => {
    const {term} = req.params
    saveQueryToDB(term).then(x => {
        res.send(x);
    });

})

module.exports = router;