
/// Score

var renderer = new frampton.Renderer({
  mediaConfig: mediaConfig,
  timeToLoadVideo: 5000,
  log: true,
  videoSourceMaker: function(filename) {
    return '/media/' + filename;
  }
});

var loadingIndicator = document.querySelector('.loading-indicator');
var startTime = new Date();
function changeLoadingColor() {
  var timeSinceStart = (new Date()) - startTime;
  var percentLoaded = Math.min(1, timeSinceStart / loadTime);
  console.log(percentLoaded);

  loadingIndicator.style.height = 125 + percentLoaded * 375;
}

changeLoadingColor();
var loadingInterval = setInterval(changeLoadingColor, 100);

var framesData = frampton.util.choice(mediaConfig.frames);
var colorSegment = new frampton.ColorSegment(framesData);
colorSegment.loop = true;

var track = frampton.util.choice(mediaConfig.audio);
var audioSegment = new frampton.AudioSegment(track);
audioSegment.preferHTMLAudio = true;
audioSegment.loop = true;

var loadTime = renderer.timeToLoadVideo;
renderer.scheduleSegmentRender(colorSegment, loadTime);
renderer.scheduleSegmentRender(audioSegment, loadTime);

var titleEl = document.querySelector('.film-title');

var muteButton = document.querySelector('.mute-button');
var isMuted = false;
muteButton.onclick = function() {
  isMuted = !isMuted;
  muteButton.textContent = isMuted ? 'Unmute' : 'Mute';
  audioSegment.setVolume(isMuted ? 0 : 0.8);
};

var controlsAreHidden = true;
window.addEventListener('keypress', function(ev) {
  switch (ev.which) {
    case 32:
      controlsAreHidden = !controlsAreHidden;
      muteButton.style.opacity = controlsAreHidden ? 0.0 : 1.0;
      break;
  }
}, false);

setTimeout(function() {
  console.log(loadTime);
  loadingIndicator.classList.add('transparent');
  clearInterval(loadingInterval);
}, loadTime);

setTimeout(function() {
  titleEl.classList.add('transparent');
}, loadTime + 3000);
