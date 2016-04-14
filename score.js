
/// Setup

var renderer = new frampton.Renderer({
  mediaConfig: mediaConfig,
  timeToLoadVideo: 17500,
  videoSourceMaker: function(filename) {
    return '/media/' + filename;
  }
});

var loadTime = renderer.timeToLoadVideo;
var titleFadeTime = 11000;
var startLoadingIndicatorTime = titleFadeTime + 1200;
var totalLoadingIndicatorTime = loadTime - startLoadingIndicatorTime - 1600;

/// DOM

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

var loadingIndicator = document.querySelector('.loading-indicator');
var loadingStartTime, loadingInterval;

function changeLoadingColor() {
  var timeSinceStart = (new Date()) - loadingStartTime;
  var percentLoaded = Math.min(1, timeSinceStart / totalLoadingIndicatorTime);
  console.log(percentLoaded);

  loadingIndicator.style.height = (50 + percentLoaded * 250) + 'px';
}

setTimeout(function() {
  document.querySelector('.work-note').classList.add('transparent');
}, titleFadeTime);

setTimeout(function() {
  loadingIndicator.style.opacity = 1.0;

  loadingStartTime = new Date();
  changeLoadingColor();
  loadingInterval = setInterval(changeLoadingColor, 100);
}, startLoadingIndicatorTime);

setTimeout(function() {
  loadingIndicator.style.opacity = 0;
}, loadTime - 1200);

setTimeout(function() {
  clearInterval(loadingInterval);
}, loadTime);

/// Framptoning

var framesData = frampton.util.choice(mediaConfig.frames);
var colorSegment = new frampton.ColorSegment(framesData);
colorSegment.loop = true;

var track = frampton.util.choice(mediaConfig.audio);
var audioSegment = new frampton.AudioSegment(track);
audioSegment.preferHTMLAudio = true;
audioSegment.loop = true;

renderer.scheduleSegmentRender(colorSegment, loadTime);
renderer.scheduleSegmentRender(audioSegment, loadTime);
