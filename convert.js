
var fs = require('fs');

var framesJSON = JSON.parse(fs.readFileSync('media/flicker.frames.json').toString());

framesJSON.frames.forEach(function(frame) {
  if (frame.colors.dominant[0] > 100) {
    frame.colors.dominant = [255, 255, 255];
  }
  else {
    frame.colors.dominant = [0, 0, 0];
  }
});

fs.writeFileSync('media/flicker_black_and_white.frames.json', JSON.stringify(framesJSON));
