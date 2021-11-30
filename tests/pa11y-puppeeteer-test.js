const pa11y = require("pa11y");
const puppeteer = require("puppeteer");
const htmlReporter = require("pa11y-reporter-html");
const fs = require("fs");

async function runa11y() {
  let browser;
  let page;

  try {
    browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      headless: false,
      args: ["--no-sandbox"],
      defaultViewport: {
        width: 1100,
        height: 1400,
      },
      slowMo: 50,
    });

    page = await browser.newPage();

    const results = await pa11y("https://yourwesite.com/", {
      browser: browser,
      page: page,
      actions: [
        `click element [href="/account/login"]`,
        `wait for element #customer_email to be visible`,
      ],
      standard: "WCAG2AA",
      ignore: [
        "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.NoContent",
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      ],
      screenCapture: `${__dirname}/loginpage-screen-capture.png`,
    });
    const html = await htmlReporter.results(results);
    fs.writeFile(`${__dirname}/loginpage-report.html`, html, (err) => {
      if (err) {
        console.error(err);
      }
    });
    browser.close();
  } catch (error) {
    console.log(error.message);
    browser.close();
  }
}

runa11y();
