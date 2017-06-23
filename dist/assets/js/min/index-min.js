const canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),wrap=document.getElementById("canvas-wrapper"),v=document.getElementById("video"),img=document.createElement("img"),textWrap=document.getElementById("text-wrapper");var videoArray=[],imageArray=[],globalID;const audio=document.getElementById("c-audio-player"),music=document.getElementById("c-music-player");var audioArray=[],musicArray=[];const controlToggle=document.getElementById("controls_toggle"),controlPanel=document.getElementById("controls-wrapper"),videoSpeedControl=document.getElementById("video_speed"),imageSpeedControl=document.getElementById("photo_speed"),musicVolumeControl=document.getElementById("music_volume"),ambienceVolumeControl=document.getElementById("ambience_volume"),videoToggle=document.getElementById("video_toggle"),photoToggle=document.getElementById("photo_toggle"),musicToggle=document.getElementById("music_toggle"),ambienceToggle=document.getElementById("ambience_toggle"),textToggle=document.getElementById("text_toggle");var videoSpeed=1,imageSpeed=8e3;controlToggle.addEventListener("click",function(){controlPanel.classList.toggle("visible")}),videoSpeedControl.addEventListener("input",function(){videoSpeed=videoSpeedControl.value/50}),videoToggle.addEventListener("change",function(){flip()}),imageSpeedControl.addEventListener("input",function(){imageSpeed=160*imageSpeedControl.value}),photoToggle.addEventListener("change",function(){flip()}),musicVolumeControl.addEventListener("input",function(){music.volume=musicVolumeControl.value}),ambienceVolumeControl.addEventListener("input",function(){audio.volume=ambienceVolumeControl.value}),musicToggle.addEventListener("change",function(){this.checked?(""!==music.src?music.play():(musicSet(),musicPlay()),console.log("Music Toggle Checked")):(music.pause(),console.log("Music Toggle Unchecked"))}),ambienceToggle.addEventListener("change",function(){this.checked?""!==audio.src?audio.play():(audioSet(),audioPlay()):audio.pause()}),textToggle.addEventListener("change",function(){this.checked?textWrap.classList.add("visible"):textWrap.classList.remove("visible")});var audioSet=function(){for(var e=1;29>e;)audioArray.push("assets/audio/bd-audio-"+e++ +".mp3")},audioPick=function(){var e=Math.floor(Math.random()*audioArray.length-1)+1;audio.src=audioArray[e],audioArray.length>0?audioArray.splice(e,1):audioSet()},audioPlay=function(){audioPick(),audio.volume=1,audio.play(),audio.addEventListener("ended",audioPlay),console.log("Audio Playing: "+audio.src)},musicSet=function(){for(var e=1;5>e;)musicArray.push("assets/music/bd-music-"+e++ +".mp3")},musicPick=function(){var e=Math.floor(Math.random()*musicArray.length-1)+1;music.src=musicArray[e],musicArray.length>0?musicArray.splice(e,1):audioSet()},musicPlay=function(){musicPick(),music.play(),music.addEventListener("ended",musicPlay),console.log("Music Playing: "+music.src)},draw=function(){img.src="";var e=function(){var e=Math.floor(Math.random()*imageArray.length-1)+1;if(0===imageArray.length){for(var o=1;35>o;)imageArray.push("assets/img/bd-img-"+o++ +".jpg");img.src=imageArray[e]}else img.src=imageArray[e],imageArray.splice(e,1)};e(),img.addEventListener("load",function(){var e=wrap.getBoundingClientRect().width,o=e/1.6;canvas.width=e,canvas.height=o,ctx.drawImage(this,0,0,e,o),console.log("Image on screen = "+this.src)})},videoSet=function(){for(var e=1;96>e;)videoArray.push("assets/video/bd-video-"+e++ +".mp4")},videoPick=function(){var e=Math.floor(Math.random()*videoArray.length-1)+1;v.src=videoArray[e],console.log("Video Playing: "+v.src),videoArray.length>0?videoArray.splice(e,1):videoSet(),v.volume=0,v.play(),v.addEventListener("ended",flip)},drawVideo=function(){v.playbackRate=videoSpeed;var e=wrap.getBoundingClientRect().width,o=e/1.6;canvas.width=e,canvas.height=o,ctx.drawImage(v,0,0,e,o)},loop=function(){drawVideo(),globalID=requestAnimationFrame(loop)},flip=function(){var e=null;window.cancelAnimationFrame(globalID),v.pause(),ctx.clearRect(0,0,1e3,1e3),console.log("Clear!"),videoToggle.checked&&photoToggle.checked&&(e=Math.floor(2*Math.random()),0===e?(draw(),setTimeout(flip,imageSpeed)):(videoPick(),loop())),videoToggle.checked&&!photoToggle.checked&&(videoPick(),loop()),photoToggle.checked&&!videoToggle.checked&&(draw(),setTimeout(flip,imageSpeed)),e=null};videoSet(),document.addEventListener("DOMContentLoaded",function(){musicToggle.checked&&(musicSet(),musicPlay()),ambienceToggle.checked&&(audioSet(),audioPlay()),flip()});