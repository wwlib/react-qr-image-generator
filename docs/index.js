var qr = require('qr-image');
var fs = require('fs');

var qr_svg = qr.image('I really love QR!', { type: 'svg' });
qr_svg.pipe(fs.createWriteStream('i_love_qr.svg'));
// var svg_string = qr.imageSync('I love QR!', { type: 'svg' });

var directory = 'generated';
var ec_level = 'L';
var file_type = 'png';
var character_data = "";
var byte_data = [];

for (i = 0; i < 512; i += 1) {
  var character = String.fromCharCode(65 + Math.floor((i % 256) / 10)); //'A'; //String.fromCharCode(i);
  character_data += character;
}

console.log(character_data);

for (var i = 0; i < 10; i += 1) {
  var data = [255]; // = character_data.substring(0, i+1);
  for (var j = 0; j < i + 1; j += 1) {
    data.push(j + 65); // % 256
  }

  // var data = character_data.substring(0, i+1);

  //console.log(data);
  var qr_image = qr.image(data, { ec_level: ec_level, type: file_type });
  var qr_matrix = qr.matrix(data, { ec_level: ec_level, type: file_type });
  var size = qr_matrix[0].length;
  //console.log(qr_matrix);
  var qr_path = directory + '/' + file_type + '/' + ec_level;

  if (!fs.existsSync(qr_path)) {
    fs.mkdirSync(qr_path);
  }
  qr_image.pipe(fs.createWriteStream(directory + '/' + file_type + '/' + ec_level + '/' + 'qr_' + ec_level + '_' + size + '_' + i + '_' + '.' + file_type));
}
