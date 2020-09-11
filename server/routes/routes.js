const express = require ('express');
const router = express.Router();

const { addItem } = require('../controller/controller.js');

router
    .route('/add')
    .post(addItem)


module.exports = router;