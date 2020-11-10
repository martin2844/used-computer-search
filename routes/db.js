const express = require("express");
const router = express.Router();
const Compare = require("../models/Compare");

router.get("/all/:term", async (req, res) => {
    console.log(req.params.term);
    let {term} = req.params
    const query = await Compare.findOne({query: term, type:"scratch"}, (err, query) => {
        return query;
    });
    res.json(query);
})


router.get("/terms/", async (req, res) => {
    console.log(req.params.term);
    const query = await Compare.find({type:"scratch"}, (err, query) => {
        return query;
    });
    let titles = query.map((query) => {
       return query.query;
    })
    res.json(titles);
})

router.get("/difference-terms/", async(req, res) => {
    const differencesQuery = await Compare.find({type:"difference"}, (err, query) => {
        return query;
    });
    let differences = differencesQuery.filter((query) => {
        return query.data.length !== 0;
    });

    let titles = differences.map((query) => {
        return query.query;
     })

    res.json(titles);
})


router.get("/difference/:term", async (req, res) => {
    console.log(req.params.term);
    let {term} = req.params
    const query = await Compare.findOne({query: term, type:"difference"}, (err, query) => {
        return query;
    });
    res.json(query);
})

router.get("/differences/:term", async (req, res) => {
    console.log(req.params.term);
    let {term} = req.params
    const query = await Compare.find({query: term, type:"difference"}, (err, query) => {
        return query;
    });
    res.json(query);
})

router.get("/all-differences/", async (req, res) => {
    const query = await Compare.find({type:"difference"}, (err, query) => {
        return query;
    });
    res.json(query);
})

router.get("/difference-doc/:id", async (req, res) => {
    console.log(req.params.id);
    let {id} = req.params
    const query = await Compare.findById(id, (err, query) => {
        return query;
    });
    res.json(query);
})

module.exports = router;