let slideIndex = 1;
function setSlide(input, index) {
    slideIndex = index;
    let item = document.querySelector(`#${input}`)
    let slides = [...document.querySelector('.slides').children];
    slides.forEach((element) => {
        element.classList.remove('active');
    })
    item.classList.add('active');
}

setInterval(() => {
    slideIndex += 1;
    if (slideIndex == 6) {
        slideIndex = 1;
    }
    setSlide(`slide${slideIndex}`, slideIndex)
}, 4000)

function clickEvent() {
    document.querySelector("a").remove()
}
let projectFlage = true;

function myFunction() {
    var myScrollTop = window.scrollY;
    let animates = document.querySelectorAll(".animate__animated")
    if (myScrollTop >= 550 && projectFlage) {
        animates.forEach(animate => {
            animate.classList.add("animate__bounce")
        })
    }
}

// ! icon music

let music = document.querySelector("audio")
let musicIcon = document.getElementById("musicIcon")
let isPlaying = true;

function playSong() {
    isPlaying = true;
    musicIcon.classList.remove("fa-play")
    musicIcon.classList.add("fa-pause")
    music.play()
}
function pauseSong() {
    isPlaying = false
    musicIcon.classList.remove("fa-pause")
    musicIcon.classList.add("fa-play")
    music.pause()
}


musicIcon.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));




const hearts = document.querySelectorAll(".fa-heart")

hearts.forEach(heart => {
    heart.addEventListener("click", () => {
        if (heart.style.color === "red") {
            heart.style.color = "blue"
            heart.classList.add("animate__flip")
        } else {
            heart.style.color = "red"
            heart.classList.remove("animate__flip")
        }
    })
})