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
* To run the tests against specific standard use `standard: 'WCAG2AA'`,
* To ignore specific rule while performing test use `ignore:['WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail']`
* To capture the screenshot of page use `screenCapture: './login-screen-capture.png'`
