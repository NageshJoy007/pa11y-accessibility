# pa11y-accessibility
You must have node installed on your pc

* To clone the project `git clone <repoPath>`
* To get the dependencies `npm install`
* To run the tests `node <path of the test.js file>`

## Pa11y basic test
* To create node project do `npm init -y`
* To get pa11y dependency`npm install pa11y --save-dev`
* To write pa11y test `touch pa11y-base-test.js` and add below code

```
const pa11y = require('pa11y');

pa11y('https://yourwesite.com/').then((results) => {
    console.log(results)
});
```

## Additional opts
To add additional opts to pa11y tests use below
* To add user actions `actions['set field #email to test@testemail.com']`
* To run the tests against specific standard `standard: 'WCAG2AA'`,
* To ignore a rule in tests `ignore:['WCAG2AA.Principle4.Guideline4_1.4_1_1.F77']`
* To capture the screenshot of page `screenCapture: './login-screen-capture.png'`
* To hide an element from test `hideElements: '#optanon-popup-more-info-bar'`
* To test mobile view `viewport: {width: 320, height: 480, deviceScaleFactor: 2,isMobile: true}`

## Adding html reports
* To add html reports do `npm install pa11y-reporter-html --save-dev`

```
const html = await htmlReporter.results(results);
fs.writeFile(`${__dirname}/loginpage-report.html`, html, (err) => { 
    if (err) {
    console.error(err);
    }
});
```
