var _ = require('lodash');

const content = `
    <html>
        <head>
            <title>titleTest</title>
        </head>
        <body>
            <a href='test0'>test01</a>
            <a href='test1'>test02</a>
            <a href='test2'>test03</a>
        </body>
    </html>
`;

const words = _.words(content);

console.log(words);

console.log('<html></html>');
