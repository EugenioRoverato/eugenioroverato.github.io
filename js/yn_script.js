const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.querySelector("button");
const result = document.getElementById("result");

const segments = Array(14).fill().map((_, i) => (i % 2 === 0 ? "SI" : "NO"));
const colors = segments.map((segment, i) => (segment === "SI" ? "#FF6F61" : "#85D896"));
let currentAngle = 0;
const segmentAngle = (2 * Math.PI) / segments.length;
let isSpinning = false;

const indicatorOffset = Math.PI / 2;

function drawWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;

    segments.forEach((segment, index) => {
        const startAngle = currentAngle + index * segmentAngle;
        const endAngle = startAngle + segmentAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = colors[index];
        ctx.fill();
        ctx.closePath();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.translate(radius * 0.8, 0);
        
        ctx.rotate(Math.PI / 2); 
        
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 16px Arial";
    
        ctx.fillText(segment, 0, 0);
    
        ctx.restore();
    });
}

function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;

    const spins = Math.floor(Math.random() * 3) + 3;
    const randomAngle = Math.random() * segmentAngle;
    const finalAngle = spins * 2 * Math.PI + randomAngle;

    let start = null;
    const duration = 4000;

    function animate(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;

        const progress = Math.min(elapsed / duration, 1);
        const easeOut = Math.pow(progress - 1, 3) + 1;

        currentAngle = easeOut * finalAngle;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;

            const adjustedAngle = (currentAngle - indicatorOffset) % (2 * Math.PI);
            
            const positiveAngle = adjustedAngle < 0 ? adjustedAngle + 2 * Math.PI : adjustedAngle;

            const selectedIndex = Math.floor((positiveAngle / segmentAngle) % segments.length);
            
            result.textContent = `Risultato: ${segments[selectedIndex]}!`;
        }
    }

    requestAnimationFrame(animate);
}

drawWheel();

spinButton.addEventListener("click", spinWheel);
