const pa11y = require('pa11y');

pa11y('https://yourwesite.com/').then((results) => {
    console.log(results)
});