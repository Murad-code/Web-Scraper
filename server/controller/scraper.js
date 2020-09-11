const puppeteer = require('puppeteer');

exports.scraper = async (url) => {
    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();
        await page.goto(url);

        const [el] = await page.$x('//*[@id="content_inner"]/article/div[1]/div[2]/h1');
        const text = await el.getProperty('textContent');
        const title = await text.jsonValue();

        const [el2] = await page.$x('//*[@id="content_inner"]/article/div[1]/div[2]/p[1]');
        const text2 = await el2.getProperty('textContent');
        const price = await text2.jsonValue();

        const [el3] = await page.$x('//*[@id="product_gallery"]/div/div/div/img');
        const img = await el3.getProperty('src');
        const imgUrl = await img.jsonValue();

        const itemData = [title, price, imgUrl];
        return itemData;

    } catch (err) {
        console.log(err);
    }
    
    await browser.close();
}