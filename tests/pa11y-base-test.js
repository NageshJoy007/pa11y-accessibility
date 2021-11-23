const pa11y = require('pa11y');

pa11y('https://yourwesite.com/').then((results) => {
    console.log(results)
});

pa11y('https://yourwesite.com/', {
  actions:[
            `click element [href="/account/login"]`,
            `wait for element #customer_email to be visible`],
  standard: 'WCAG2AA'
    }).then((results) => {
       console.log(results)
});