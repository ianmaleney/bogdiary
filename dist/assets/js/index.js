const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wrap = document.getElementById('canvas-wrapper');
const v = document.createElement('video');
var videoArray = [];

function draw() {
  // Get Width & Keep Aspect Ratio
  var dw = wrap.getBoundingClientRect().width;
  var ih = dw / 1.6;
  // Create Image Element & Draw to Canvas When Loaded
  var img = new Image(dw, ih);
  img.addEventListener("load", function(){
    canvas.width = dw;
    canvas.height = ih;
    ctx.drawImage(this, 0, 0, dw, ih);
  });
  // Create Array of Images to Draw From
  var imgStart = 1;
  var imgEnd = 11;
  var imageArray = [];
  while(imgStart < imgEnd+1){
    imageArray.push("assets/img/wp-" + imgStart++ + ".jpg");
  }
  // Pick Random Image from Array & Add to Image Element
  function imagePick() {
    var rnd = Math.floor(Math.random() * imageArray.length - 1) + 1;
    img.src = imageArray[rnd];
  }
  imagePick(); 
}

function videoSet(){
  var i = 1;
  while(i < 3){
    videoArray.push("assets/video/bd-w-" + i++ + ".mp4");
  }
}

videoSet();

function videoPick() {
  console.log(videoArray.length);
  var rnd = Math.floor(Math.random() * videoArray.length - 1) + 1;
  v.src = videoArray[rnd];
  videoArray.splice(rnd);
  console.log(videoArray.length);
}

function drawVideo() {
  var dw = wrap.getBoundingClientRect().width;
  var ih = dw / 1.6;
  canvas.width = dw;
  canvas.height = ih;
  ctx.drawImage(v, 0, 0, dw, ih);
  window.requestAnimationFrame(drawVideo);
}

window.addEventListener("load", function(){
  //draw();
  //window.setInterval(draw, 3000);
  videoPick();
  v.addEventListener("ended", function(){
    videoPick();
  });
  v.addEventListener("canplaythrough", function() {
    v.play();
  });

  drawVideo();
  window.requestAnimationFrame(drawVideo);

  

});

/* Shaka Player

var manifestUri = '//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }
}

function initPlayer() {
  // Create a Player instance.
  var video = document.getElementById('video');
  var player = new shaka.Player(video);

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  player.load(manifestUri).then(function() {
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  }).catch(onError);  // onError is executed if the asynchronous load fails.
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

document.addEventListener('DOMContentLoaded', initApp); */