const gameContainer = document.getElementById('game-container');
const imageContainer = document.getElementById('image-container');
const gameImage = document.getElementById('game-image');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const livesContainer = document.getElementById('lives');
const scoreContainer = document.getElementById('score');
const startButton = document.getElementById('start-button');
const leaderboardList = document.getElementById('leaderboard-list');

let lives = 3;
let score = 0;

const yesImagesFolder = 'images/yes/';
const noImagesFolder = 'images/no/';

const leaderboard = [];

startButton.addEventListener('click', () => {
    gameContainer.style.display = 'block';
    startButton.style.display = 'none';
    loadImage();
});

function loadImage() {
    const imageFolders = [yesImagesFolder, noImagesFolder];
    const randomFolder = imageFolders[Math.floor(Math.random() * imageFolders.length)];
    const imageFiles = getImageFiles(randomFolder);
    const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

    gameImage.src = randomImage;
    gameImage.alt = "AI-Generated Image";
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
    `).join('');

    gameContainer.style.display = 'none';
    startButton.style.display = 'block';
    lives = 3;
    score = 0;
}
