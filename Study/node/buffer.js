const buffer = new Buffer(26);
console.log("buffer length: " + buffer.length);

var data = "aabbcc";
buffer.write(data);
console.log(buffer.length);

