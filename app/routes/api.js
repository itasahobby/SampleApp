const fs = require('fs');
const router = require("express").Router();
var path = require('path');
const cities = require('../db/cities.json')
const CITIES_DB = path.join('db', 'cities.json');

//  Get cities
router.get("/city", async (req, res) => {
    res.status(200).send(cities);
});

// Get city by id
router.get("/city/:id", async (req, res) => {
    try {
        const cityId = req.params['id'];
        city = cities[cityId];
        if(!city) res.status(404).send()
        res.status(200).send(city);
    } catch (error) {
        res.status(500).send();
    }
});

// Create new city
router.post("/city", async (req, res) => {
    try{
        const {nombre, provincia, comAutonoma} = req.body;
        cities.push({nombre, provincia, comAutonoma});
        dict = JSON.stringify(cities);
        console.log(dict)
        
        fs.writeFile(CITIES_DB,dict, (err,data) => {if(err) throw err});
        res.status(200).send(cities);
    } catch(error) {
        console.log(error)
        res.status(500).send();
    }
});

module.exports = router;