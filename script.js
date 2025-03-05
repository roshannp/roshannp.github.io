document.addEventListener("DOMContentLoaded", function() {
    console.log("%cWelcome to the Matrix, Cyber Warrior!", "color: #00ffcc; font-size: 16px;");

    // Glitch effect for header
    const glitchText = document.querySelector(".glitch");
    setInterval(() => {
        glitchText.style.textShadow = Math.random() > 0.5 ? "2px 2px 5px #ff0000, -2px -2px 5px #0000ff" : "-2px -2px 5px #ff0000, 2px 2px 5px #0000ff";
    }, 500);

    // Matrix Rain Effect
    const canvas = document.createElement("canvas");
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "01 10 110 001 101 010 011 100 0001 0110";
    const charArray = characters.split("");
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ffcc";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);
});
