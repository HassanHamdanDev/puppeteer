let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION == true) {
    // running on the Vercel platform.
    chrome = require('chrome-aws-lambda');
    puppeteer = require('puppeteer-core');
    console.log('chrome-aws-lambda')
} else {
    // running locally.
    puppeteer = require('puppeteer');
    console.log('puppeteer')

}

const getPDFhandler = async (req, res) => {
    const options = (process.env.AWS_LAMBDA_FUNCTION_VERSION == true)
        ? {
            args: [...chrome.args, '--hide-scrollbars', '--disable-web-security', '--no-sandbox', '--disable-setuid-sandbox'],
            defaultViewport: chrome.defaultViewport,
            executablePath: await chrome.executablePath,
            headless: true,
            ignoreHTTPSErrors: true,
        }
        : { args: ['--no-sandbox', '--disable-setuid-sandbox'], };
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