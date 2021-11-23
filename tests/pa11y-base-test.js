const pa11y = require('pa11y');

pa11y('https://yourwesite.com/').then((results) => {
    console.log(results)
});

pa11y('https://yourwesite.com/', {
  actions:[
            `click element [href="/account/login"]`,
            `wait for element #customer_email to be visible`],
  standard: 'WCAG2AA',
  ignore:[
            'WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.NoContent',
            'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail'],
  screenCapture: `${__dirname}/login-screen-capture.png`
    }).then((results) => {
       console.log(results)
});