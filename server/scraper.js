const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.endclothing.com/gb/fred-perry-authentic-zip-hoody-j7536-248.html');
  await page.screenshot({path: 'example.png'});

  const [el] = await page.$x('//*[@id="pdp__details__final-price"]');
  const text = await el.getProperty('textContent');
    console.log('text: ' + text);
    const text2 = await text.jsonValue();
    console.log('text2: ' + text2);

  await browser.close();
})();