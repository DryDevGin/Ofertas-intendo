import express from 'express'
const puppeteer = require('puppeteer');
const websites = require('./websites.json');
const path = require('path');

const app = express()
app.listen(3000)

(async () => {

    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    //for que lee todos los websites 
    for(const website of websites){
        const scriptPath = path.join(__dirname, 'scripts', website.scriptName);
        await require(scriptPath)(page,website);
        console.log('Scraping done for', website.name);
    }
    await browser.close();
    
})();
