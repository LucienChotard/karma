const landing = document.querySelector('#landing')
const startBtn = document.querySelector('#start-btn')
const wave = document.querySelector('#wave')
const backWave = document.querySelector('#back-wave')
const player = document.querySelector('#player')
const playBtn = document.querySelector('#play-btn')
const changeViewWrapper = document.querySelector('#change-view-wrapper')
const changeViewBtn = document.querySelector('#change-view')
const rewindModal = document.querySelector('#rewind-modal')
const rewindBtn = document.querySelector('#rewind-btn')
let callOnce = true

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

changeViewWrapper.addEventListener('click',changeView)

function changeView(){
  if(vidCity.video.classList.contains('none')){
    vidCity.video.muted = false
    vidOcean.video.muted = true
    changeViewBtn.setAttribute('src','images/wave.svg')
    vidCity.progress.style.setProperty("--c", "#145574");
    vidOcean.progress.style.removeProperty("--c")
  }
  else{
    vidCity.video.muted = true
    vidOcean.video.muted = false
    changeViewBtn.setAttribute('src','images/cityscape.svg')
    vidCity.progress.style.removeProperty("--c")
    vidOcean.progress.style.setProperty("--c", "#145574");
  }
  vidCity.video.classList.toggle('none')
  callOnce = true
}

startBtn.addEventListener('click',(e)=>{
  wave.classList.remove('wave-move')
  backWave.classList.remove('back-wave-move')
  wave.classList.add('wave-slide-out')
  backWave.classList.add('wave-slide-out')
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
    vidCity.progress.style.setProperty("--c", "#145574");
    changeViewWrapper.classList.add('none')
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
  console.log(vidCity.video.currentTime)
  vidCity.progress.setAttribute("value",vidCity.video.currentTime)
  vidOcean.progress.setAttribute("value",vidCity.video.currentTime)
  vidRewind.progress.setAttribute("value",vidCity.video.currentTime)
  if(vidCity.video.currentTime > 4.3){
    changeViewWrapper.classList.remove('none')
  }
  if(vidCity.video.currentTime > 16.4){
    changeViewWrapper.classList.add('none')
  }

  if(vidCity.video.currentTime > 16 && vidCity.video.currentTime < 16.4 && !vidCity.video.classList.contains('none')){
    if(callOnce){
      callOnce = false
      changeView()
    }
  }
  if(vidCity.video.currentTime > 91 && vidCity.video.currentTime < 92 && vidCity.video.classList.contains('none')){
    if(callOnce){
      callOnce = false
      changeView()
    }
  }
  if(vidCity.video.currentTime > 113 && vidCity.video.currentTime < 114 && !vidCity.video.classList.contains('none')){
    if(callOnce){
      callOnce = false
      vidCity.video.classList.add('blur')
      pauseAll()
      rewindModal.style.display="block"
      rewindModal.classList.add("fade-in")
    }
  }
}

rewindBtn.addEventListener('click',(e)=>{
  vidCity.video.classList.add('none')
  vidOcean.video.classList.add('none')
  playAll()
  vidCity.video.muted = true
  vidOcean.video.muted = true
  vidRewind.video.muted= false
  rewindModal.classList.remove("fade-in")
  rewindModal.classList.add("fade-out")
  vidCity.progress.style.removeProperty("--c")
  vidRewind.progress.style.setProperty("--c", "#145574");
})

for(i of globalVid){
  i.progress.setAttribute("max",131.136)
  i.video.addEventListener('timeupdate',seekBarRefresh)
}
