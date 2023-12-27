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
                var cheese = 'blargus';
            </script>
        </body>
    </html>
`;

const $ = cheerio.load(content);

function strip(test) {
    return _.trim(_.replace(_.replace(_.replace(target, /(\r\n|\n|\r)/g, ''), ';', '; '), /\s+/g, ' '));
}

async function digest(encoded) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

    return hashHex;
}

const target = $('script:eq(0)').text();
// const stripped = _.replace(_.replace(target, /(\r\n|\n|\r)/g, ''), /\s+/g, ' ');
// const stripped = _.replace(_.replace(_.replace(target, /(\r\n|\n|\r)/g, ''), ';', '; '), /\s+/g, ' ');

// console.log(_.trim(stripped));

// const encoded = (new TextEncoder()).encode(stripped);

const reference = `
const name = 'Fred';

console.log(name);
`;

// TODO: replace the semicolons first

// console.log(_.trim(_.replace(_.replace(_.replace(reference, /(\r\n|\n|\r)/g, ''), /\s+/g, ' '), ';', '; ')));

// TODO: replace semicolon with space semicolon

// console.log(` * hash: ${hmac.digest()}`);

// const hash = await crypto.subtle.digest("SHA-256", data);

// crypto.subtle.digest("SHA-256", encoded).then((hash) => console.log(hash.toString('hex')) );

const strippedTarget = strip(target);
const strippedReference = strip(reference);

console.log(strippedTarget);
console.log(strippedReference);

Promise.all([
    digest((new TextEncoder()).encode(strippedTarget)),
    digest((new TextEncoder()).encode(strippedReference))
]).then((res) => {
    console.log(res[0]);
    console.log(res[1]);
})

// verify(encoded);
