const WHITE_KEYS=['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b']
const BLACK_KEYS=['1','2','3','4','5','6','7','8','9','0','-','=','/','*','+','[',']']

const keys=document.querySelectorAll('.key')
const whitekeys=document.querySelectorAll('.key.white')
const blackkeys=document.querySelectorAll('.key.black')



keys.forEach(key=>{
    key.addEventListener('click',()=> playNote(key))
})

document.addEventListener("keydown" , e=>{
    if(e.repeat)return
    const key=e.key
    const whiteKeyIndex=WHITE_KEYS.indexOf(key)
    const blackKeyIndex=BLACK_KEYS.indexOf(key)

    if(whiteKeyIndex > -1) playNote(whitekeys[whiteKeyIndex])
    if(blackKeyIndex > -1) playNote(blackkeys[blackKeyIndex])

})

function playNote(key){
    const noteAudio=document.getElementById(key.dataset.note)
    noteAudio.currentTime=0
    noteAudio.play()
    key.classList.add("active")
    noteAudio.addEventListener("ended",()=>{
        key.classList.remove("active")
    })
}


// mous
document.onmousemove = animateCircle;

function animateCircle(event) {
  let circle = document.createElement('div')
  let colors = ["#f39c12", "#8e44ad", "#1abc9c","#fc5c65","#3498db"]
  circle.setAttribute('class', 'circle')

  circle.style.left = event.clientX + "px"
  circle.style.top = event.clientY + "px"
  circle.style.transition = "all 0.5s linear"

  document.body.appendChild(circle)

  circle.style.left = circle.offsetLeft - 20 + "px"
  circle.style.top = circle.offsetTop - 20 + "px"

  var mainColor = colors[Math.floor(Math.random() * colors.length)]

  circle.style.backgroundColor = mainColor
  circle.style.width = "50px"
  circle.style.height = "50px"
  circle.style.borderWidth = "5px"
  circle.style.opacity = 0

}

