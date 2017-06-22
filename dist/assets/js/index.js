const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wrap = document.getElementById('canvas-wrapper');
const v = document.getElementById('video');
const img = document.createElement('img');
var videoArray = [];
var imageArray = [];
var globalID;

var draw = function() {
  img.src = '';

  if (imageArray.length === 0) {
    var i = 1;
    while(i < 12){
      imageArray.push("assets/img/wp-" + i++ + ".jpg");
    }
  }
  
  var imagePick = function() {
    var rnd = Math.floor(Math.random() * imageArray.length - 1) + 1;
    img.src = imageArray[rnd];
  };

  imagePick();

  img.addEventListener("load", function(){
    var dw = wrap.getBoundingClientRect().width;
    var ih = dw / 1.6;
    canvas.width = dw;
    canvas.height = ih;
    ctx.drawImage(this, 0, 0, dw, ih);
    console.log("Image on screen = " + this.src);
  });
  
};

var videoSet = function(){
  var i = 1;
  while(i < 3){
    videoArray.push("assets/video/bd-w-" + i++ + ".mp4");
  }
};

var videoPick = function() {
  var rnd = Math.floor(Math.random() * videoArray.length - 1) + 1;
  v.src = videoArray[rnd];
  if (videoArray.length > 0) {
    videoArray.splice(rnd);
  } else {
    videoSet();
    v.src = videoArray[rnd];
  }
};

var drawVideo = function() {
  v.play();
  var dw = wrap.getBoundingClientRect().width;
  var ih = dw / 1.6;
  canvas.width = dw;
  canvas.height = ih;
  ctx.drawImage(v, 0, 0, dw, ih);
};

var loop = function() {
  drawVideo();
  globalID = requestAnimationFrame(loop);
};

var flip = function() {
  
  // Clearing
  var coin = null;
  window.cancelAnimationFrame(globalID);
  v.pause();
  ctx.clearRect(0,0,1000,1000);
  console.log("Clear!");
  
  // Reset Coin
  coin = Math.floor(Math.random() * 2);
  
  // Heads: Image, Tails: Video
  if (coin === 0) {
    draw();
  } else {
    videoPick();
    loop();
  }

  // Reset Coin
  coin = null;
  
};

videoSet();

document.addEventListener("DOMContentLoaded", function(){

  setInterval(flip, 3000);

});