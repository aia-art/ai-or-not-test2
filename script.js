const gameContainer = document.getElementById('game-container');
const imageContainer = document.getElementById('image-container');
const gameImage = document.getElementById('game-image');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const livesContainer = document.getElementById('lives');
const scoreContainer = document.getElementById('score');
const startButton = document.getElementById('start-button');
const leaderboardList = document.getElementById('leaderboard-list');
const yesButtonContainer = document.getElementById('yes-button-container');
const noButtonContainer = document.getElementById('no-button-container');

let lives = 3;
let score = 0;

const yesImagesFolder = 'images/yes/';
const noImagesFolder = 'images/no/';

const leaderboard = [];

let displayedImages = []; // Keep track of displayed images

startButton.addEventListener('click', () => {
    gameContainer.style.display = 'block';
    startButton.style.display = 'none';
    yesButtonContainer.style.display = 'block'; // Show buttons
    noButtonContainer.style.display = 'block';

    loadImage();
});

function loadImage() {
    const imageFolders = [yesImagesFolder, noImagesFolder];
    const randomFolder = imageFolders[Math.floor(Math.random() * imageFolders.length)];
    const imageFiles = getImageFiles(randomFolder);

    // Filter out already displayed images
    const availableImages = imageFiles.filter(image => !displayedImages.includes(image));

    if (availableImages.length === 0) {
        // If all images have been displayed, reset the displayedImages array
        displayedImages = [];
        loadImage(); // Try again
    } else {
        const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
        gameImage.src = randomImage;
        gameImage.alt = "AI-Generated Image";
        displayedImages.push(randomImage); // Add the displayed image to the list
    }
}

function getImageFiles(folder) {
    return Array.from(document.querySelectorAll(`${folder}*.jpg`));
}

yesButton.addEventListener('click', () => {
    const isAI = gameImage.src.includes(yesImagesFolder);
    checkAnswer(isAI);
});

noButton.addEventListener('click', () => {
    const isAI = gameImage.src.includes(yesImagesFolder);
    checkAnswer(!isAI);
});

function checkAnswer(isAI) {
    if (isAI) {
        score++;
        scoreContainer.textContent = score;
    } else {
        lives--;
        livesContainer.textContent = lives;
    }

    if (lives === 0) {
        gameOver();
    } else {
        loadImage();
    }
}

function gameOver() {
    const name = prompt('Enter your name:');
    leaderboard.push({ name, score, date: new Date() });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard.splice(3);

    leaderboardList.innerHTML = leaderboard.map(entry => `
        <li>${entry.name}: ${entry.score} (${entry.date.toLocaleDateString()})</li>
    `).keepDisplayedImagesrt('');

    gameContainer.style.display = 'none';
    startButton.style.display = 'block';
    yesButtonContainer.style.display = 'none'; // Hide buttons
    noButtonContainer.style.display = 'none';
    lives = 3;
    score = 0;
}
