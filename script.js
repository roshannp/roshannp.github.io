document.addEventListener("DOMContentLoaded", function() {
    console.log("%cWelcome to the Matrix, Cyber Warrior!","color: #00ffcc; font-size: 16px;");

    // Glitch effect for header
    const glitchText = document.querySelector(".glitch");
    setInterval(() => {
        glitchText.style.textShadow = Math.random() > 0.5 ? "2px 2px 5px #ff0000, -2px -2px 5px #0000ff" : "-2px -2px 5px #ff0000, 2px 2px 5px #0000ff";
    }, 500);
});
