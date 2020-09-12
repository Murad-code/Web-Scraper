const express = require ('express');
const router = express.Router();

const { addFavourite, getFavourites, updateFavourites } = require('../controller/controller.js');
const { scraper } = require('../controller/scraper.js');

router
    .route('/scrape')
    .post(scraper)

router
    .route('/get')
    .post(getFavourites)

router
    .route('/add')
    .post(addFavourite)

router
    .route('/update')
    .put(updateFavourites)

module.exports = router;