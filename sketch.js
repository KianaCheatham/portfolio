function random(min, max) {
    return Math.random() * (max - min) + min
}

class Blob {
    constructor(el) {
        this.el = el
        this.size = el.getBoundingClientRect().width; //200
        this.x = random(0, window.innerWidth - this.size)
        this.y = random(0, window.innerHeight - this.size)
        this.vx = random(0.5, 1) * (Math.random() > 0.5 ? -1 : 1)
        this.vy = random(0.5, 1) * (Math.random() > 0.5 ? -1 : 1)
    }

    update(deltaTime = 1) {
        this.x += this.vx * deltaTime
        this.y += this.vy * deltaTime

        if (this.x >= window.innerWidth - this.size) {
            this.vx *= -1
            this.x = window.innerWidth - this.size
        }
        if (this.y >= window.innerHeight - this.size) {
            this.vy *= -1
            this.y = window.innerHeight - this.size
        }
        if (this.x <= 0) {
            this.vx *= -1
            this.x = 0
        }
        if (this.y <= 0) {
            this.vy *= -1
            this.y = 0
        }
    }

    move() {
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}

// mouse follower blob
const mouseBlob = document.getElementById('mouse-blob')
const mouseBlobSize = 400
let mouseX = window.innerWidth / 2
let mouseY = window.innerHeight / 2
let followerX = mouseX
let followerY = mouseY
let lastTime = performance.now()

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - mouseBlobSize / 2
    mouseY = e.clientY - mouseBlobSize / 2
})

function initBlobs() {
    const blobEls = document.querySelectorAll('.blob, .blobXS')
    const blobs = Array.from(blobEls)
        .filter((el) => el.id !== 'mouse-blob')
        .map((blobEl) => new Blob(blobEl))

    function update() {
        const now = performance.now()
        const deltaTime = (now - lastTime) / 16.67
        lastTime = now

        // smooth lag follow
        followerX += (mouseX - followerX) * 0.03
        followerY += (mouseY - followerY) * 0.03
        mouseBlob.style.transform = `translate(${followerX}px, ${followerY}px)`

        blobs.forEach((blob) => {
            blob.update(deltaTime)
            blob.move()
        })
        requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
}

initBlobs()