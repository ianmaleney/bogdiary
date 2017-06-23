// Canvas Bindings
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wrap = document.getElementById('canvas-wrapper');
const v = document.getElementById('video');
const img = document.createElement('img');
const textWrap = document.getElementById("text-wrapper");
var videoArray = [];
var imageArray = [];
var globalID;

// Audio Bindings 
const audio = document.getElementById('c-audio-player');
const music = document.getElementById('c-music-player');
var audioArray = [];
var musicArray = [];

//
// Control Bindings
//

// Toggle Control Panel
const controlToggle = document.getElementById("controls_toggle");
const controlPanel = document.getElementById("controls-wrapper");

// Ranges
const videoSpeedControl = document.getElementById("video_speed");
const imageSpeedControl = document.getElementById("photo_speed");
const musicVolumeControl = document.getElementById("music_volume");
const ambienceVolumeControl = document.getElementById("ambience_volume");

// Checkboxes
const videoToggle = document.getElementById("video_toggle");
const photoToggle = document.getElementById("photo_toggle");
const musicToggle = document.getElementById("music_toggle");
const ambienceToggle = document.getElementById("ambience_toggle");
const textToggle = document.getElementById("text_toggle");

// Defaults
var videoSpeed = 1;
var imageSpeed = 8000;

// Listeners
controlToggle.addEventListener("click", function(){
  controlPanel.classList.toggle('visible');
});

videoSpeedControl.addEventListener("input", function(){
  videoSpeed = videoSpeedControl.value / 50;
});

videoToggle.addEventListener("change", function(){
  flip();
});

imageSpeedControl.addEventListener("input", function(){
  imageSpeed = imageSpeedControl.value * 160;
});

photoToggle.addEventListener("change", function(){
  flip();
});

musicVolumeControl.addEventListener("input", function(){
  music.volume = musicVolumeControl.value;
});

ambienceVolumeControl.addEventListener("input", function(){
  audio.volume = ambienceVolumeControl.value;
});

musicToggle.addEventListener("change", function(){
  if (this.checked) {
    if (music.src !== '') {
      music.play();
    } else {
      musicSet();
      musicPlay();
    }
    console.log("Music Toggle Checked");
  } else {
    music.pause();
    console.log("Music Toggle Unchecked");
  }
});

ambienceToggle.addEventListener("change", function(){
  if (this.checked) {
    if (audio.src !== '') {
      audio.play();
    } else {
      audioSet();
      audioPlay();
    }
  } else {
    audio.pause();
  }
});

textToggle.addEventListener("change", function(){
  if (this.checked) {
    textWrap.classList.add('visible');
  } else {
    textWrap.classList.remove('visible');
  }
});

//
// Audio Functions
//

var audioSet = function() {
  var i = 1;
  while(i < 29){
    audioArray.push("assets/audio/bd-audio-" + i++ + ".mp3");
  }
};

var audioPick = function() {
  var rnd = Math.floor(Math.random() * audioArray.length - 1) + 1;
  audio.src = audioArray[rnd];
  if (audioArray.length > 0) {
    audioArray.splice(rnd, 1);
  } else {
    audioSet();
  }
};

var audioPlay = function() {
  audioPick();
  audio.volume = 1;
  audio.play();
  audio.addEventListener("ended", audioPlay);
  console.log("Audio Playing: " + audio.src);
};

//
// Music Functions
//

var musicSet = function() {
  var i = 1;
  while(i < 5){
    musicArray.push("assets/music/bd-music-" + i++ + ".mp3");
  }
};

var musicPick = function() {
  var rnd = Math.floor(Math.random() * musicArray.length - 1) + 1;
  music.src = musicArray[rnd];
  if (musicArray.length > 0) {
    musicArray.splice(rnd, 1);
  } else {
    audioSet();
  }
};

var musicPlay = function() {
  musicPick();
  music.play();
  music.addEventListener("ended", musicPlay);
  console.log("Music Playing: " + music.src);
};

//
// Image Functions
//

var draw = function() {
  img.src = '';
  var imagePick = function() {
    var rnd = Math.floor(Math.random() * imageArray.length - 1) + 1;
    if (imageArray.length === 0) {
      var i = 1;
      while(i < 35){
        imageArray.push("assets/img/bd-img-" + i++ + ".jpg");
      }
      img.src = imageArray[rnd];
    } else {
      img.src = imageArray[rnd];
      imageArray.splice(rnd, 1);
    }
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

//
// Video Functions
//

var videoSet = function(){
  var i = 1;
  while(i < 96){
    videoArray.push("assets/video/bd-video-" + i++ + ".mp4");
  }
};

var videoPick = function() {
  var rnd = Math.floor(Math.random() * videoArray.length - 1) + 1;
  v.src = videoArray[rnd];
  console.log("Video Playing: " + v.src);
  if (videoArray.length > 0) {
    videoArray.splice(rnd, 1);
  } else {
    videoSet();
  }
  v.volume = 0;
  v.play();
  v.addEventListener("ended", flip);
};

var drawVideo = function() {
  v.playbackRate = videoSpeed;
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

//
// Structural Functions
//

var flip = function() {
  
  // Clearing
  var coin = null;
  window.cancelAnimationFrame(globalID);
  v.pause();
  ctx.clearRect(0,0,1000,1000);
  console.log("Clear!");
  
  if (videoToggle.checked && photoToggle.checked){
    // Reset Coin
    coin = Math.floor(Math.random() * 2);
    // Heads: Image, Tails: Video
    if (coin === 0) {
      draw();
      setTimeout(flip, imageSpeed);
    } else {
      videoPick();
      loop();
    }
  }
  
  if (videoToggle.checked && !photoToggle.checked) {
    videoPick();
    loop();
  }

  if (photoToggle.checked && !videoToggle.checked) {
    draw();
    setTimeout(flip, imageSpeed);
  }
  

  // Reset Coin
  coin = null;

};

videoSet();

document.addEventListener("DOMContentLoaded", function(){

  if (musicToggle.checked) {
    musicSet();
    musicPlay();
  }

  if (ambienceToggle.checked) {
    audioSet();
    audioPlay();
  }
  
  flip();

});