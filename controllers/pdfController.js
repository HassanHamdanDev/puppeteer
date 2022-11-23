let chrome = {};

const puppeteer = require('puppeteer');



const getPDFhandler = async (req, res) => {
    const options = { args: ['--no-sandbox', '--disable-setuid-sandbox'], };
    const { pdftemplete } = req.body;
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setContent(pdftemplete);
    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
    });
    await browser.close();
    res.contentType('application/pdf');
    res.send(pdf);
};

module.exports = { getPDFhandler };