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

class Info{
  constructor(keyFrame,targetVideo,isVideoPaused,content,posX,posY,duration)
  {
    this.keyFrame = keyFrame
    this.targetVideo = targetVideo.video
    this.isVideoPaused = isVideoPaused
    this.content = content
    this.callOnce = true
    this.posX = posX
    this.posY = posY
    this.infoPoint = document.createElement('div')
    this.modal = document.createElement('div')
    this.duration = duration
  }
  init(){
    this.targetVideo.addEventListener('timeupdate',(e)=>{
      this.check()
    })
  }
  modalOpen(){
    this.infoClear()
    this.modal.classList.add('modal-info')
    this.modal.style.display="block"
    this.modal.classList.add('fade-in')
    this.modal.style.left=this.posX
    this.modal.style.top=this.posY
    let paragraph = document.createElement('p')
    paragraph.innerHTML=this.content
    this.modal.append(paragraph)
    player.appendChild(this.modal)
  }
  infoClear(){
    console.log('ok')
    this.infoPoint.classList.remove('pulse')
    this.infoPoint.classList.remove('fade-in')
    this.infoPoint.classList.add('fade-out')
    this.infoPoint.removeEventListener("click",(e)=>{this.modalOpen})
    setTimeout((e)=>{this.infoPoint.style.display="none"},1000)
  }
  check(){
    if(this.targetVideo.currentTime > this.keyFrame && this.targetVideo.currentTime < this.keyFrame+1 && this.callOnce && !this.targetVideo.style.display=="none"){
      this.callOnce=false
      this.infoPoint.classList.add('info-point')
      this.infoPoint.classList.add('pulse')
      this.infoPoint.style.left=this.posX
      this.infoPoint.style.top=this.posY
      this.infoPoint.addEventListener('click',(e)=>{this.modalOpen()})
      player.appendChild(this.infoPoint)
      this.infoPoint.style.display="block"
      this.infoPoint.classList.add('fade-in')
      setTimeout((e)=>{this.infoClear()},this.duration)
    }
  }
}

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

let factTest = new Info(5,vidCity,true,"500 zones mortes. C'est plus de 245 000 km² dans le monde entier, soit la surface du Royaume-Uni.","50vw","50vh",4000)
factTest.init()

function changeView(){
  if(vidCity.video.classList.contains('none')){
    vidCity.video.muted = false
    vidOcean.video.muted = true
    vidOcean.video.style.display="none"
    vidCity.video.style.display="block"
    changeViewBtn.setAttribute('src','images/wave.svg')
    vidCity.progress.style.setProperty("--c", "#145574");
    vidOcean.progress.style.removeProperty("--c")
  }
  else{
    vidCity.video.muted = true
    vidOcean.video.muted = false
    vidOcean.video.style.display="block"
    vidCity.video.style.display="none"
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
    vidRewind.video.style.display="none"
    vidOcean.video.style.display="none"
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

for(i of globalVid){
  i.progress.addEventListener('click',(e)=>{console.log('test')})
}


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
  vidRewind.video.style.display="block"
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
