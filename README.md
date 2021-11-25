# pa11y-accessibility
You must have node installed on your pc

* To clone the project `git clone <repoPath>`
* To get the dependencies `npm install`
* To run the tests `node <path of the test.js file>`

### Pa11y basic test

```
pa11y('https://yourwesite.com/').then((results) => {
    console.log(results)
});
```

### Additional opts
To add additional opts to pa11y tests use below
* To add user actions `actions['set field #email to test@testemail.com']`
* To run the tests against specific standard `standard: 'WCAG2AA'`,
* To ignore a rule in tests `ignore:['WCAG2AA.Principle4.Guideline4_1.4_1_1.F77']`
* To capture the screenshot of page `screenCapture: './login-screen-capture.png'`
* To hide an element from test `hideElements: '#optanon-popup-more-info-bar'`
