const express = require('express');
const puppeteer = require('puppeteer');

exports.addItem = async (req, res, next) => {

  try {
    const { url } = req.body;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: 'example.png' }); // Send to DB

    const [el] = await page.$x('//*[@id="content_inner"]/article/div[1]/div[2]/h1');
    const text = await el.getProperty('textContent');
    const title = await text.jsonValue();
    
    const [el2] = await page.$x('//*[@id="content_inner"]/article/div[1]/div[2]/p[1]');
    const text2 = await el2.getProperty('textContent');
    const price = await text2.jsonValue();
    
    const [el3] = await page.$x('//*[@id="product_gallery"]/div/div/div/img');
    const img = await el3.getProperty('src');
    const imgUrl = await img.jsonValue();

    
    res.status(200).json({
      status: true,
      url: url,
      message: title,
      price: price,
      image: imgUrl
    })

  } catch (err) {
    console.log(err);
  }

  await browser.close();
}