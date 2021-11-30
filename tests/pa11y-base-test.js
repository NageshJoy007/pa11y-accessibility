const pa11y = require("pa11y");
const htmlReporter = require("pa11y-reporter-html");
const fs = require("fs");
pa11y("https://yourwesite.com/").then((results) => {
  console.log(results);
});

pa11y("https://yourwesite.com/", {
  actions: [
    `click element [href="/account/login"]`,
    `wait for element #customer_email to be visible`,
  ],
  standard: "WCAG2AA",
  ignore: [
    "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.NoContent",
    "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
  ],
  screenCapture: `${__dirname}/login-screen-capture.png`,
  hideElements: "#optanon-popup-more-info-bar",
}).then((results) => {
  console.log(results);
});

pa11y("https://yourwesite.com/", {
  actions: [
    `click element .productitem--title`,
    `wait for element .product-form--atc-button to be visible`,
  ],
  standard: "WCAG2AA",
  ignore: ["WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.NoContent"],
  screenCapture: `${__dirname}/product-screen-capture-mob.png`,
  viewport: {
    width: 320,
    height: 480,
    deviceScaleFactor: 2,
    isMobile: true,
  },
  hideElements: "#optanon-popup-more-info-bar",
}).then((results) => {
  console.log(results);
});

async function runa11y() {
  const results = await pa11y("https://yourwesite.com/", {
    actions: [
      `click element [href="/account/login"]`,
      `wait for element #customer_email to be visible`,
    ],
    standard: "WCAG2AA",
    ignore: [
      "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.NoContent",
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
    ],
    screenCapture: `${__dirname}/login-screen-capture.png`,
  });
  const html = await htmlReporter.results(results);
  fs.writeFile(`${__dirname}/login-report.html`, html, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

runa11y();
