const _ = require('lodash');
const cheerio = require('cheerio');

const content = `
    <html>
        <head>
            <title>titleTest</title>
        </head>
        <body>
            <a href='test0'>test01</a>
            <a href='test1'>test02</a>
            <a href='test2'>test03</a>
            <script>
                const name = 'Fred';
           
                console.log(name);         
                   
            </script>
            <script>
                const text = 'blargus';

                console.log(text.concat('4t'));
            </script>
        </body>
    </html>
`;

const reference = `
const name = 'Fred';

console.log(name);
`;

const $ = cheerio.load(content);

const strip = (target) => {
    const parsedLineBreaks = _.replace(target, /(\r\n|\n|\r)/g, '');
    const parsedCommas = _.replace(parsedLineBreaks, ';', '; ');
    const parsedWhiteSpace = _.replace(parsedCommas, /\s+/g, ' ');

    return _.trim(parsedWhiteSpace);
}

const digest = async (encoded) => {
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

    return hashHex;
}

const target = $('script:eq(0)').text();

const strippedTarget = strip(target);
const strippedReference = strip(reference);

Promise.all([
    digest((new TextEncoder()).encode(strippedTarget)),
    digest((new TextEncoder()).encode(strippedReference))
]).then((res) => {
    console.log(res[0]);
    console.log(res[1]);

    console.log(_.isEqual(res[0], res[1]));
    console.log(_.isEqual($('body').find('script').length, 2));
});
