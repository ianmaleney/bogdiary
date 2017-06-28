const textStatic = [
  "Spring comes late to the bog.", 
  "Long into April it slumbers, pale and unpeopled.", 
  "The grass overgrown in long tussocks, white as chalk, crunching underfoot like snow.", 
  "The heather is subdued, almost black, a deep, quiet indigo resting in clusters.", 
  "Along the bank the hard stalks of winter grass lie flat, a frosty blue, subtle but shocking in this field, the frozen aftermath of some ancient massacre glinting in the low April sun.",
  "Further towards the western edge burgundy thorns lie across the silver barbed wire fence, one sharp as the other.", 
  "Beneath them both, the drain, soft and slow.", 
  "On the far side, the exposed roots of the tall, thin trees with few branches and but a little crown of dark green leaves shivering in the breeze.", 
  "The roots are caught a muddy red in the late light, like desert sand, like nothing you could believe to be alive.",
  "The roots are out, sunk into the stream and the saturated dirt.", 
  "Out in the next crop the birds are gathering and once in a while a pair of wings breaks cover and wheels around the open space, a lap of joyful energy, loud and free against an empty evening sky.", 
  "I cast a long shadow and feel uselessly apologetic for every brutish step causing untold harm.", 
  "Along the road the sun hangs inches above eye-level and my vision flickers golden in split-second intervals as it streams through the trees.", 
  "My steps are hushed here by encircling branches and all around my head the birds, the birds, the birds."
  ];

var textArray = [];
textArray = textArray.concat(textStatic);

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

// Text Bindings
const text = document.getElementById('text-container');

//
// Control Bindings
//

// Toggle Control Panel
const controlToggle = document.getElementById("controls_toggle");
const controlPanel = document.getElementById("controls-wrapper");
const opening = document.getElementById('open');
const beginButton = document.getElementById('begin');
const info = document.getElementById('info');
const infoButton = document.getElementById('info-button');
const infoClose = document.getElementById('info-close');

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
  } else {
    music.pause();
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
    textPick();
  } else {
    textWrap.classList.remove('visible');
  }
});

beginButton.addEventListener("click", function() {
  opening.classList.remove("visible");
  videoToggle.checked = true;
  photoToggle.checked = true;
  ambienceToggle.checked = true;
  flip();
});

infoButton.addEventListener("click", function() {
  info.classList.toggle("visible");
});

infoClose.addEventListener("click", function() {
  info.classList.remove("visible");
});

//
// Text Functions
//

var pos = function(el, con){
  var elh = el.getBoundingClientRect().height;
  var elw = el.getBoundingClientRect().width;
  var ch = con.getBoundingClientRect().height;
  var cw = con.getBoundingClientRect().width;

  var spaceH = ch - elh;
  var spaceW = cw - elw;

  var top = Math.floor(Math.random() * spaceH);
  var left = Math.floor(Math.random() * spaceW);

  if (top > ch / 2) {
    top = top - 80;
  }

  if (left > cw / 2) {
    left = left - 40;
  }

  el.style.top = top + "px";

  if (cw > 960){
    el.style.left = left + "px";
  } else {
    el.style.left = "20px";
  }
};

var textPick = function() {
  var rnd = Math.floor(Math.random() * textArray.length - 1) + 1;
  var coin = null;
  coin = Math.floor(Math.random() * 2);
    if (coin === 0) {
      textWrap.style.top = 
      text.innerHTML = textArray[rnd];
      pos(text, textWrap);
      setTimeout(textPick, 12000);
      if (textArray.length > 1) {
        textArray.splice(rnd, 1);
      } else {
        textArray = textArray.concat(textStatic);
      }
    } else {
      text.innerHTML = "";
      setTimeout(textPick, 8000);
    }
  
};

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

  if (textToggle.checked){
    textPick();
  }

});