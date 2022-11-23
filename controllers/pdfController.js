let chrome = {};

const puppeteer = require('puppeteer');

const getPDFhandler = async (req, res) => {
    const options = { args: ['--no-sandbox', '--disable-setuid-sandbox'], };
    const { pdftemplete } = req.body;
    console.log(pdftemplete);
    const browser = await puppeteer.launch(options);

    const page = await browser.newPage();
    await page.setContent(pdftemplete);
    const buffer = await page.pdf({
        format: 'A4',
        printBackground: true,
    });
    await browser.close();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', buffer.length);
    res.status(200).send(buffer);
};


module.exports = { getPDFhandler };