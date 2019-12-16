const landing = document.querySelector('#landing')
const startBtn = document.querySelector('#start-btn')
const wave = document.querySelector('#wave')
const backWave = document.querySelector('#back-wave')
const player = document.querySelector('#player')
const playBtn = document.querySelector('#play-btn')
const changeViewBtn = document.querySelector('#change-view')

class Video {
  constructor(videoId,progressId){
    this.video = document.querySelector(videoId)
    this.progress = document.querySelector(progressId)
  }
  progressInit(){
    this.progress.setAttribute('max',this.video.duration)
  }
}
let vidCity = new Video('#vid-city',"#progress-city")
let vidOcean = new Video('#vid-ocean',"#progress-ocean")
let vidRewind = new Video('#vid-rewind',"#progress-rewind")
let globalVid = [vidCity,vidOcean,vidRewind]

changeViewBtn.addEventListener('click',(e)=>{
  if(vidCity.video.classList.contains('none')){
    vidCity.video.muted = false
    vidOcean.video.muted = true
    changeViewBtn.setAttribute('src','images/wave.svg')
  }
  else{
    vidCity.video.muted = true
    vidOcean.video.muted = false
    changeViewBtn.setAttribute('src','images/cityscape.svg')
  }
  vidCity.video.classList.toggle('none')
})

startBtn.addEventListener('click',(e)=>{
  wave.classList.remove('wave-move')
  backWave.classList.remove('back-wave-move')
  wave.classList.toggle('wave-slide-out')
  backWave.classList.toggle('wave-slide-out')
  setTimeout(function(){
    landing.classList.add('fade-out')
  }, 500);
  setTimeout(function(){
    landing.style.display="none"
    player.style.display="block"
    player.style.opacity="0"
    player.classList.add('fade-in')
    playAll()
    vidOcean.video.muted=true
    vidRewind.video.muted=true
  }, 2500);
})

playBtn.addEventListener('click',(e)=>{
  if(vidCity.video.paused){
    playAll()
  }
  else{
    pauseAll()
  }
})

function playAll(){
  for(i of globalVid){
    i.video.play()
  }
  playBtn.classList.toggle("icofont-ui-play")
  playBtn.classList.toggle("icofont-ui-pause")
}

function pauseAll(){
  for(i of globalVid){
    i.video.pause()
  }
  playBtn.classList.toggle("icofont-ui-pause")
  playBtn.classList.toggle("icofont-ui-play")
}

function seekBarRefresh(){
  vidCity.progress.setAttribute("value",vidCity.video.currentTime)
  vidOcean.progress.setAttribute("value",vidCity.video.currentTime)
  vidRewind.progress.setAttribute("value",vidCity.video.currentTime)
}

for(i of globalVid){
  i.progress.setAttribute("max",131.136)
  i.video.addEventListener('timeupdate',seekBarRefresh)
}
