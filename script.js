const gameContainer = document.getElementById('game-container');
const startContainer = document.getElementById('start-container');
const startButton = document.getElementById('start-button');
const gameContent = document.getElementById('game-content');
const imageContainer = document.getElementById('image-container');
const gameImage = document.getElementById('game-image');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const livesContainer = document.getElementById('lives-container');
const lives = document.getElementById('lives');
const leaderboardContainer = document.getElementById('leaderboard-container');
const leaderboardList = document.getElementById('leaderboard-list');
const playerNameInput = document.getElementById('player-name');
const submitScoreButton = document.getElementById('submit-score');

const yesImagesFolder = 'images/yes/';
const noImagesFolder = 'images/no/';
const images = [];
let currentImageIndex = -1;
let currentImageIsAI = null;
let livesLeft = 3;

startButton.addEventListener('click', () => {
    startContainer.style.display = 'none';
    gameContent.style.display = 'block';
    loadRandomImage();
});

yesButton.addEventListener('click', () => checkAnswer(true));
noButton.addEventListener('click', () => checkAnswer(false));

function loadRandomImage() {
    currentImageIndex = Math.floor(Math.random() * images.length);
    currentImageIsAI = Math.random() < 0.5; // Randomly decide if the image is AI-generated or not

    const imageFolder = currentImageIsAI ? yesImagesFolder : noImagesFolder;
    const randomImage = images[currentImageIndex];

    gameImage.src = `${imageFolder}${randomImage}`;
    gameImage.alt = `AI-Generated Image: ${randomImage}`;
}

function checkAnswer(playerAnswer) {
    const correctAnswer = currentImageIsAI;

    if (playerAnswer === correctAnswer) {
        gameImage.style.borderColor = 'green';
        setTimeout(() => gameImage.style.borderColor = 'initial', 1000);
        loadRandomImage();
    } else {
        livesLeft -= 1;
        lives.textContent = livesLeft;

        if (livesLeft === 0) {
            gameContent.style.display = 'none';
            leaderboardContainer.style.display = 'block';
            playerNameInput.focus();
        } else {
            gameImage.style.borderColor = 'red';
            setTimeout(() => {
                gameImage.style.borderColor = 'initial';
                loadRandomImage();
            }, 1000);
        }
    }
}

submitScoreButton.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();
    if (playerName) {
        const date = new Date();
        const newScore = {
            date: date.toLocaleDateString(),
            name: playerName,
            score: 3 - livesLeft
        };

        // Save the score to the leaderboard (JSON database)
        // For simplicity, we'll just append the new score to the leaderboard array.
        // In a real-world scenario, you would probably want to sort and limit the leaderboard.
        leaderboardList.innerHTML += `<li>${newScore.date} - ${newScore.name}: ${newScore.score}</li>`;

        // Reset the game
        playerNameInput.value = '';
        livesLeft = 3;
        currentImageIndex = -1;
        gameContent.style.display = 'block';
        leaderboardContainer.style.display = 'none';
        loadRandomImage();
    }
});

// Populate the images array with all image file names
const imageFiles = ['image1.jpg', 'image2.jpg', ...]; // Add your image file names here
images.push(...imageFiles.map(file => `yes/${file}`));
images.push(...imageFiles.map(file => `no/${file}`));
