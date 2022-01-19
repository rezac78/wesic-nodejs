
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