const imageSources = ["images/nota.png", "images/nota2.png"];
const numImagesPerType = 50;
const images = [];
const positions = [];
const velocities = [];
const speedMultiplier = 15;

function createImages() {
    for (let i = 0; i < imageSources.length; i++) {
        for (let j = 0; j < numImagesPerType; j++) {
            let img = document.createElement('img');
            img.src = imageSources[i];
            img.className = 'bouncingImage';
            img.style.left = '0px';
            img.style.top = '0px';
            document.body.appendChild(img);
            images.push(img);

            positions.push({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
            velocities.push({ x: (Math.random() - 0.5) * speedMultiplier, y: (Math.random() - 0.5) * speedMultiplier });
        }
    }
}

function animate() {
    for (let i = 0; i < images.length; i++) {
        positions[i].x += velocities[i].x;
        positions[i].y += velocities[i].y;

        if (positions[i].x + images[i].width > window.innerWidth || positions[i].x < 0) {
            velocities[i].x = -velocities[i].x;
        }
        if (positions[i].y + images[i].height > window.innerHeight || positions[i].y < 0) {
            velocities[i].y = -velocities[i].y;
        }

        images[i].style.left = positions[i].x + 'px';
        images[i].style.top = positions[i].y + 'px';
    }

    requestAnimationFrame(animate);
}

function startAnimation() {
    createImages();
    animate();
}
