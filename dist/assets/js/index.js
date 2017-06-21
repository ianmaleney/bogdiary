const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wrap = document.getElementById('canvas-wrapper');

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
    var rnd = Math.floor(Math.random() * imgEnd - 1) + 1;
    img.src = imageArray[rnd];
  }
  imagePick(); 
}

window.addEventListener("load", function(){
  draw();
  window.setInterval(draw, 3000);
});