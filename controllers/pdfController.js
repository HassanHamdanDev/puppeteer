let chrome = {};

const puppeteer = require('puppeteer');

const getPDFhandler = async (req, res) => {
    const options = {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    };
    const { pdftemplete } = req.body;
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setContent(pdftemplete);
    const buffer = await page.pdf({
        format: 'A4',
        printBackground: true,
    });
    await browser.close();
    console.log(buffer)
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': buffer.length,
    });
    res.end(buffer);
};


module.exports = { getPDFhandler };