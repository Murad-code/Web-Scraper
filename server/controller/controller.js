const express = require('express');
const puppeteer = require('puppeteer');
const { scraper } = require('./scraper.js');

exports.addItem = async (req, res, next) => {
  const { url } = req.body;

  const itemData = await scraper(url);
  res.status(200).json({
    status: true,
    title: itemData[0],
    price: itemData[1],
    imgUrl: itemData[2]
  })
  
}