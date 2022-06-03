const pa11y = require("pa11y");
const puppeteer = require("puppeteer");
const htmlReporter = require("pa11y-reporter-html");
const fs = require("fs");

const baseUrl = "https://yourwesite.com/";

const loginPageActions =  [
  `click element [href="/account/login"]`,
  `wait for element #customer_email to be visible`,
];

const productPageActions = [
  'wait for element input[name="q"] to be visible',
  `set field input[name="q"] to 9781380050274`,
  'click element .live-search-form button[type="submit"]',
  'wait for element h2.productitem--title>a to be visible',
  'click element h2.productitem--title>a',
  'wait for element button.product-form--atc-button to be visible'
];

const contactusPageActions = [
  `navigate to ${baseUrl}/pages/contact-us`
];

const filterIssues = issues => {
  // Filter out thirdparty cookie banner as its a riddled
  // Temporarily filter colour contrast issues as gradient backgrounds seem to confuse pa11y - we check this manually
  // Filtering out freshworks errors
  return issues
    .filter(issue => /insufficient contrast/.test(issue.message) === false)
    .filter(issue => /optanon/.test(issue.selector) === false)
    .filter(issue => /freshworks-frame|launcher-frame/.test(issue.selector) === false);
};

async function runa11y(url,actions, pageName) {
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

    var folder = `${__dirname}/reports`;
  
    if (!fs.existsSync(folder)){
    fs.mkdirSync(folder);
  
    console.log('reports folder created successfully.');
    }

    const results = await pa11y(url, {
      browser: browser,
      page: page,
      actions,
      standard: "WCAG2AA",
      ignore: [
        "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.NoContent",
        "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      ],
      screenCapture: `${__dirname}/reports/${pageName}-capture.png`,
    });
    results.issues = filterIssues(results.issues);
    const html = await htmlReporter.results(results);
    fs.writeFile(`${__dirname}/reports/${pageName}-report.html`, html, (err) => {
      if (err) {
        console.error(err);
      }
      if (results.issues.length > 0) {
        return console.error(`Accessibility issues found on page ${results.pageUrl}`);
      } else {
        return console.error(`no errors on ${pageName}`);
      }
    });
    browser.close();
  } catch (error) {
    console.log(error.message);
    browser.close();
  }
}

(async () => {

    try {
    await runa11y(baseUrl,loginPageActions,"loginPage");
    await runa11y(baseUrl,productPageActions,"productPage");
    await runa11y(baseUrl,contactusPageActions,"contactusPage");
    } catch (errors) {
      console.error(errors);
      process.exit(1);
    }
})();
