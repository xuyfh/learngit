const fs = require('fs');

fs.readFile('1.txt', function(err, data){
    if(err) return console.error(err);
    console.log(data.toString());
});
console.log(123);

// fs.readFile('1.txt', function (err, data) {
//     if (err) return console.error(err);
//     console.log(data.toString());
// });
// console.log(123);


