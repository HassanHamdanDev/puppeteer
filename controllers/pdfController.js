const puppeteer = require('puppeteer');

const getPDFhandler = async (req, res) => {
    const { pdftemplete } = req.body;
    const browser = await puppeteer.launch();
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