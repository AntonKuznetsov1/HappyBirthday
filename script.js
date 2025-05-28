// Set base particle size for consistency across screens
const baseSize = 6;

// Confetti Animation Setup
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function startAnimation() {
    // Reset confetti array to prevent buildup
    confetti = [];

    // Generate confetti elements
    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * baseSize + 4,  // Ensures consistent size
            color: `hsl(${Math.random() * 360}, 100%, 70%)`,
            speedY: Math.random() * 3 + 2,
            speedX: (Math.random() - 0.5) * 2, // Horizontal movement
            rotation: Math.random() * 360,
        });
    }
    animateConfetti();
}

// Animation loop
function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confetti.forEach((particle, index) => {
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.rotation += 2; // Rotate the particles slightly for effect

        // Remove particles once they fall out of view
        if (particle.y > canvas.height) confetti.splice(index, 1);

        // Draw confetti particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // Continue animation while confetti exists
    if (confetti.length > 0) requestAnimationFrame(animateConfetti);
}

// Resize canvas dynamically when window resizes
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
