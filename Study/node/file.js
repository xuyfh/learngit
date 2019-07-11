const fs = require('fs');

var data = fs.readFileSync('1.txt');

console.log('abcdefgh');
console.log(data.toString());
console.log('1234567');

