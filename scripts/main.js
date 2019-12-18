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
let curVideo = 0
let callOnce = true

class Info{
  constructor(keyFrame,targetVideo,content,posX,posY,duration)
  {
    this.keyFrame = keyFrame
    this.targetVideo = targetVideo.video
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
  modalClear(){
    this.modal.classList.remove('fade-in')
    this.modal.classList.add('fade-out')
    setTimeout((e)=>{this.modal.style.display="none"},1000)
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
    let border = document.createElement('div')
    border.classList.add('infoProgressBar')
    this.modal.append(paragraph)
    this.modal.append(border)
    player.appendChild(this.modal)
    border.classList.add('loading')
    setTimeout((e)=>{this.modalClear()},8000)
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
    if(this.targetVideo.currentTime > this.keyFrame && this.targetVideo.currentTime < this.keyFrame+1 && this.callOnce && curVideo == this.targetVideo.getAttribute('data-vidid')){
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
let globalVid = [vidCity,vidOcean]
changeViewWrapper.addEventListener('click',changeView)

let factMegot = new Info(
  8,
  vidCity,
  "<h4>Un mégot c'est 500 litres d'eau pollués.</h4><br> En France, le total des mégots jetés représente 25 0000 tonnes par an, soit plus de 2x le poids de la Tour Eiffel.",
  "50%",
  "50vh",
  9000)
factMegot.init()

let factUsines = new Info(
  22,
  vidCity,
  "<h4>La pollution</h4><br> C'est la dégradation d'un écosystème par l'introduction, généralement humaine, d'entités, ou de radiations altérant le fonctionnement de celui-ci.",
  "40%",
  "30vh",
  9000)
factUsines.init()

let factCanette = new Info(
  32,
  vidOcean,
  "<h4>500 zones mortes</h4><br> recouvrant plus de 245 000 km2 dans le monde entier, elles équivalent à la surface du Royaume-Uni.",
  "75%",
  "30vh",
  9000)
factCanette.init()

let factEatingFish = new Info(
  53,
  vidOcean,
  "<h4>Un mégot jeté dans la rue</h4><br> C'est 96h pour tuer un poisson et 10 ans pour qu’il se biodégrade.",
  "60%",
  "50vh",
  9000)
factEatingFish.init()

let factCars = new Info(
  61,
  vidCity,
  "<h4>12%</h4><br> C'est le nombre d'habitants qui prend sa voiture pour aller travailler. Pourtant à Paris, la moitié de l’espace public de circulation est réservée à l’automobile…",
  "65%",
  "55vh",
  9000)
factCars.init()

let factFishing = new Info(
  75,
  vidOcean,
  "<h4>29%</h4><br> C'est le pourcentage des ressources marines surexploitées",
  "40%",
  "28vh",
  9000)
factFishing.init()

let factFishingNet = new Info(
  86,
  vidOcean,
  "<h4>La lente agonie des poissons pêchés</h4><br>La durée de l’agonie peut se prolonger de 25 minutes à 4 heures : à titre de comparaison, elle peut aller jusqu’à 14 minutes pour un bovin.",
  "60%",
  "55vh",
  9000)
factFishingNet.init()

let factOrdure = new Info(
  97,
  vidOcean,
  "<h4>6,5 millions de tonnes</h4><br> C'est le nombre d’ordures qui est rejeté dans l’Océan mondial chaque année.",
  "50%",
  "45vh",
  9000)
factOrdure.init()

let factSolution = new Info(
  119,
  vidCity,
  "<h4>Bravo !</h4><br> Vous avez sauvé un poisson.",
  "50%",
  "60vh",
  9000)
factSolution.init()

let factCleanOcean = new Info(
  120,
  vidOcean,
  "<h4>Sans plus attendre...</h4><br>Adoptez le bon geste, vous ferez la différence.",
  "50%",
  "50vh",
  9000)
factCleanOcean.init()

function changeView(){
  if(vidCity.video.classList.contains('none')){
    vidCity.video.muted = false
    vidOcean.video.muted = true
    vidOcean.video.style.display="none"
    vidCity.video.style.display="block"
    changeViewBtn.setAttribute('src','images/wave.svg')
    vidCity.progress.style.setProperty("--c", "#145574");
    vidOcean.progress.style.removeProperty("--c")
    curVideo = 0
  }
  else{
    vidCity.video.muted = true
    vidOcean.video.muted = false
    vidOcean.video.style.display="block"
    vidCity.video.style.display="none"
    changeViewBtn.setAttribute('src','images/cityscape.svg')
    vidCity.progress.style.removeProperty("--c")
    vidOcean.progress.style.setProperty("--c", "#145574");
    curVideo = 1
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
    vidOcean.video.style.display="none"
    vidCity.progress.style.setProperty("--c", "#145574")
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
  vidOcean.progress.setAttribute("value",vidOcean.video.currentTime)

  if(vidCity.video.currentTime > 113 && vidCity.video.currentTime < 114){
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
  playAll()
  rewindModal.classList.remove("fade-in")
  rewindModal.classList.add("fade-out")
  vidCity.video.classList.remove('blur')
})

for(i of globalVid){
  i.progress.setAttribute("max",130.096633)
  i.video.addEventListener('timeupdate',seekBarRefresh)
  i.progress.addEventListener("click", seek)
}

function seek(event) {
  var percent = event.offsetX / this.offsetWidth;
  vidCity.video.currentTime = percent * vidCity.video.duration
  vidOcean.video.currentTime = percent * vidOcean.video.duration
  vidCity.progress.value = percent / 100;
  if(curVideo != event.target.getAttribute('data-vidid')){
    changeView()
  }
}
