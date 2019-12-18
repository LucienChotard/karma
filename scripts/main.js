const landing = document.querySelector('#landing')
const startBtn = document.querySelector('#start-btn')
const wave = document.querySelector('#wave')
const backWave = document.querySelector('#back-wave')
const player = document.querySelector('#player')
const playWrapper = document.querySelector('#play-wrapper')
const playBtn = document.querySelector('#play-btn')
const buttons = document.querySelector('#buttons')
const changeViewWrapper = document.querySelector('#change-view-wrapper')
const changeViewBtn = document.querySelector('#change-view')
const rewindModal = document.querySelector('#rewind-modal')
const rewindBtn = document.querySelector('#rewind-btn')
const $menuButton = document.querySelector('.js-menu-button')
const $menu = document.querySelector('.js-menu')
const asideClose = document.querySelector('#aside-close')
let curVideo = 0
let callOnce = true
let isRewindModalOpened = false

class sideInfo{
  constructor(id,icon,img,title,content){
    this.id = id
    this.icon = icon
    this.img = img
    this.title = title
    this.content = content
    this.btn = document.createElement('img')
    this.modalWrapper = document.querySelector('#side-info-modal-wrapper')
    this.modal = document.querySelector('#side-info-modal')
    this.modalTitle = document.querySelector('#side-info-title')
    this.modalContent = document.querySelector('#side-info-text')
    this.modalImage = document.querySelector('#side-info-img')
    this.closeBtn= document.querySelector('#side-info-modal-close')
    this.isModalOpened = false
  }
  modalSetContent(){
    this.modalWrapper.setAttribute('data-id',this.id)
    this.modalTitle.innerHTML=this.title
    this.modalContent.innerHTML=this.content
    this.modalImage.setAttribute('src',this.img)
  }
  modalEnable(){
    pauseAll()
    if (this.modalWrapper.getAttribute('data-id') == this.id && this.isModalOpened) {
      this.modalDisable()
      playAll()
    }
    else if(this.isModalOpened){
      this.modalSetContent()
    }
    else{
      this.isModalOpened=true
      this.modalWrapper.style.display="flex"
      this.modal.classList.remove('fade-out')
      this.modal.classList.add('fade-in')
      this.modalSetContent()
    }
  }
  modalDisable(){
    this.isModalOpened=false
    this.modal.classList.remove('fade-in')
    this.modal.classList.add('fade-out')
    playAll()
    setTimeout((e)=>{
      this.modalWrapper.style.display="none"
    },1000)
  }
  init(){
    this.modalWrapper.style.display="none"
    this.btn.setAttribute("src",this.icon)
    buttons.append(this.btn)
    this.btn.addEventListener("click",(e)=>{
      this.modalEnable()
    })
    this.closeBtn.addEventListener("click",(e)=>{
      this.modalDisable()
    })
  }
}
let sideInfoArray=[
  new sideInfo(
    0,
    "images/button-cigaret.png",
    "images/megot.png",
    "cigarettes",
    "L’écotoxicité des cigarettes a été prouvée chez les espèces aquatiques. L’un des toxiques en cause est la nicotine. Relarguée par les mégots, elle est retrouvée en quantité significative dans les eaux urbaines.<br><br> Quant aux filtres des cigarettes, is sont constitués de minuscules particules de plastique qui mettent des décennies ou plus à se décomposer. <br><br>Il s’agit donc d’un déchet toxique qui est difficile à collecter en raison de sa dispersion, et difficile à valoriser en raison de sa toxicité et du peu de valeur de sa matière.<br><br> Le vent ou les systèmes de nettoyage par soufflage ou le nettoyage à l’eau sous pression emportent ou dispersent les microparticules de plastique issues de ceux des mégots qui ont déjà été déchiquetés par les véhicules et les piétons."
  ),
  new sideInfo(
    1,
    "images/button-plastic.png",
    "images/bag.png",
    "sacs plastiques",
    "Les sacs plastiques sont une source de pollution considérable, durant tout leur cycle de vie.<br><br> Tout d’abord, leur production consomme des produits pétroliers, de l’eau, de l’énergie, et émet des gaz à effet de serre responsables du réchauffement climatique.<br><br> À la fin de vie de leur vie, les sacs plastiques sont particulièrement nocifs pour l’environnement. Selon l’organisme Éco-emballage, les sacs plastiques seraient trop légers pour être recyclés, et leur recyclage consommerait plus de ressources qu’il n’en restituerait.<br><br> Ils se retrouvent par centaines de millions dans la nature, et sont responsables de la destruction de la biodiversité : 122 millions de sacs plastiques juchent les 5 000 kilomètres de côtes du littoral français, et tuent des milliers d’animaux marins chaque année. Ils étouffent et étranglent de nombreuses espèces marines, comme les tortues, les dauphins, les thons, qui les ingèrent car ils les confondent avec des proies."
  ),
  new sideInfo(
    2,
    "images/button-household.png",
    "images/produit.png",
    "produits ménagers",
    "Selon le magazine 60 Millions de consommateurs, mieux vaut se passer de produits ménagers industriels, composés de « substances toxiques », et favoriser des produits « faits maison ».<br><br> Les produits ménagers émettent des composés organiques volatiles, appelés COV, qui peuvent provoquer des maladies respiratoires. Le principal risque dans la maison est la fumée de cigarette. Mais après le tabac vient ensuite l’utilisation de produits ménagers industriels, notamment ceux en spray, qui émettent beaucoup de COV et représentent donc un danger pour la santé.<br><br> Vous pouvez retrouver sur le site de l’Ademe un guide en ligne de recettes pour faire soi-même ses produits ménagers : du bicarbonate de soude et du savon noir, deux bons dégraissants, du vinaigre blanc pour nettoyer les surfaces et du citron, pour désodoriser, par exemple…"
  )
]
for(let i=0 ; i<sideInfoArray.length; i++){
  sideInfoArray[i].init()
}

class Info{
  constructor(id,keyFrame,targetVideo,content,posX,posY,duration)
  {
    this.id = id
    this.keyFrame = keyFrame
    this.targetVideo = targetVideo.video
    this.targetProgress = targetVideo.progress
    this.content = content
    this.posX = posX
    this.posY = posY
    this.duration = duration
    this.callOnce = true
    this.infoPoint = document.createElement('div')
    this.modal = document.createElement('div')
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
    this.infoPoint.classList.remove('pulse')
    this.infoPoint.classList.remove('fade-in')
    this.infoPoint.classList.add('fade-out')
    this.infoPoint.removeEventListener("click",(e)=>{this.modalOpen})
    setTimeout((e)=>{this.infoPoint.style.display="none"},1000)
    progressPointClear(this.id)
  }
  infoSet(){
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
  check(){
    if(this.targetVideo.currentTime > this.keyFrame && this.targetVideo.currentTime < this.keyFrame+5 && this.callOnce && curVideo == this.targetVideo.getAttribute('data-vidid') ){
      this.callOnce=false
      this.infoSet()
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

let factArray=[
  new Info(
    0,
    8,
    vidCity,
    "<h4>Un mégot c'est 500 litres d'eau pollués.</h4><br> En France, le total des mégots jetés représente 25 0000 tonnes par an, soit plus de 2x le poids de la Tour Eiffel.",
    "50%",
    "50vh",
    9000
  ),
  new Info(
    1,
    30,
    vidCity,
    "<h4>La pollution</h4><br> C'est la dégradation d'un écosystème par l'introduction, généralement humaine, d'entités, ou de radiations altérant le fonctionnement de celui-ci.",
    "40%",
    "30vh",
    9000
  ),
  new Info(
    2,
    32,
    vidOcean,
    "<h4>500 zones mortes</h4><br> recouvrant plus de 245 000 km2 dans le monde entier, elles équivalent à la surface du Royaume-Uni.",
    "75%",
    "30vh",
    9000
  ),
  new Info(
    3,
    53,
    vidOcean,
    "<h4>Un mégot jeté dans la rue</h4><br> C'est 96h pour tuer un poisson et 10 ans pour qu’il se biodégrade.",
    "60%",
    "50vh",
    9000
  ),
  new Info(
    4,
    61,
    vidCity,
    "<h4>12%</h4><br> C'est le nombre d'habitants qui prend sa voiture pour aller travailler. Pourtant à Paris, la moitié de l’espace public de circulation est réservée à l’automobile…",
    "65%",
    "55vh",
    9000
  ),
  new Info(
    5,
    75,
    vidOcean,
    "<h4>29%</h4><br> C'est le pourcentage des ressources marines surexploitées",
    "40%",
    "28vh",
    9000
  ),
  new Info(
    6,
    86,
    vidOcean,
    "<h4>La lente agonie des poissons pêchés</h4><br>La durée de l’agonie peut se prolonger de 25 minutes à 4 heures : à titre de comparaison, elle peut aller jusqu’à 14 minutes pour un bovin.",
    "60%",
    "55vh",
    9000
  ),
  new Info(
    7,
    97,
    vidOcean,
    "<h4>6,5 millions de tonnes</h4><br> C'est le nombre d’ordures qui est rejeté dans l’Océan mondial chaque année.",
    "50%",
    "45vh",
    9000
  ),
  new Info(
    8,
    119,
    vidCity,
    "<h4>Bravo !</h4><br> Vous avez sauvé un poisson.",
    "50%",
    "60vh",
    9000
  ),
  new Info(
    9,
    120,
    vidOcean,
    "<h4>Sans plus attendre...</h4><br>Adoptez le bon geste, vous ferez la différence.",
    "50%",
    "50vh",
    9000)
]

function factsInit(){
  for(let i=0;i<factArray.length;i++){
    factArray[i].init()
  }
}

function progressPointSet(){
  for(let i=0;i<factArray.length;i++){
    let percent = (factArray[i].keyFrame / factArray[i].targetVideo.duration)*100+"%"
    let progressPoint = document.createElement('div')
    progressPoint.classList.add('progress-point')
    progressPoint.setAttribute('data-factid',i)
    progressPoint.style.left=percent
    factArray[i].targetProgress.after(progressPoint)
  }
}

function progressPointClear(id){
  let target = document.querySelector(".progress-point[data-factid='"+id+"']")
  target.classList.add('fade-out')
}

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
    playAll()
    factsInit()
    progressPointSet()
    landing.style.display="none"
    player.style.display="block"
    player.style.opacity="0"
    player.classList.add('fade-in')
    vidOcean.video.muted=true
    vidOcean.video.style.display="none"
    vidCity.progress.style.setProperty("--c", "#145574")
  }, 2500);
})

playWrapper.addEventListener('click',(e)=>{
  if(vidCity.video.paused){
    playAll()
  }
  else{
    pauseAll()
  }
})

function playAll(){
  if(vidCity.video.paused){
    for(i of globalVid){
      i.video.play()
    }
    playBtn.classList.toggle("icofont-ui-play")
    playBtn.classList.toggle("icofont-ui-pause")
  }
}

function pauseAll(){
  if(!vidCity.video.paused){
    for(i of globalVid){
      i.video.pause()
    }
    playBtn.classList.toggle("icofont-ui-pause")
    playBtn.classList.toggle("icofont-ui-play")
  }
}

function seekBarRefresh(){
  vidCity.progress.setAttribute("value",vidCity.video.currentTime)
  vidOcean.progress.setAttribute("value",vidOcean.video.currentTime)

  if(vidCity.video.currentTime > 114 && callOnce){
    if(curVideo==1){
      changeView()
    }
    isRewindModalOpened = true
    callOnce = false
    vidCity.video.currentTime = 114
    vidOcean.video.currentTime = 114
    vidCity.video.classList.add('blur')
    pauseAll()
    rewindModal.style.display="block"
    rewindModal.classList.add("fade-in")
    buttons.classList.add("fade-out")
  }
  if(vidCity.video.currentTime == vidCity.video.duration){
    window.location.href = "https://lucienchotard.github.io/karma/share.html";
  }
}

rewindBtn.addEventListener('click',(e)=>{
  playAll()
  rewindModal.classList.remove("fade-in")
  rewindModal.classList.add("fade-out")
  vidCity.video.classList.remove('blur')
  buttons.classList.remove("fade-out")
  buttons.classList.add("fade-in")
  isRewindModalOpened = false
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
$menuButton.addEventListener ('click', () =>
{
    $menu.classList.toggle('is-active')
    if($menu.classList.contains('is-active')){
      pauseAll()
    }
    else{
      playAll()
    }
})
asideClose.addEventListener ('click', () =>
{
    $menu.classList.toggle('is-active')
    if($menu.classList.contains('is-active')){
      pauseAll()
    }
    else{
      playAll()
    }
})
