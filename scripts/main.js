const landing = document.querySelector('#landing')
const startBtn = document.querySelector('#start-btn')
const wave = document.querySelector('#wave')
const backWave = document.querySelector('#back-wave')

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
  }, 2500);
})
