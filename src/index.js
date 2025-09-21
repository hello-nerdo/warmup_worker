export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Serve the main HTML page
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(getHTML(), {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
        },
      });
    }

    // Serve CSS
    if (url.pathname === '/styles.css') {
      return new Response(getCSS(), {
        headers: {
          'Content-Type': 'text/css;charset=UTF-8',
        },
      });
    }

    // Serve JavaScript
    if (url.pathname === '/script.js') {
      return new Response(getJS(), {
        headers: {
          'Content-Type': 'application/javascript;charset=UTF-8',
        },
      });
    }

    // 404 for other routes
    return new Response('Not Found', { status: 404 });
  },
};

function getHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Warmup Math Game</title>
    <link rel="stylesheet" href="/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
    <main class="main">
        <div class="game-section">
            <div class="settings-panel">
                <div class="setting-group">
                    <label for="difficulty" class="setting-label">Amount:</label>
                    <span class="setting-desc">
                        Select a level from 1 to 9; this determines the number to add or subtract from each integer.
                    </span>
                    <input
                        id="difficulty"
                        type="number"
                        min="1"
                        max="9"
                        value="1"
                        class="setting-input"
                    />
                </div>

                <div class="setting-group">
                    <label class="setting-label">Operation:</label>
                    <div class="operation-buttons">
                        <button id="subtract-btn" class="operation-btn active">Subtract</button>
                        <button id="add-btn" class="operation-btn">Add</button>
                    </div>
                </div>

                <div class="setting-group">
                    <label for="timeLimit" class="setting-label">Time Limit (seconds):</label>
                    <input
                        id="timeLimit"
                        type="number"
                        min="1"
                        max="10"
                        step="0.5"
                        value="5"
                        class="setting-input"
                    />
                </div>
            </div>

            <div class="scores-section">
                <div class="score-item">
                    <span class="score-label">Current Score:</span>
                    <span id="current-score" class="score-value">0</span>
                </div>
                <div id="previous-scores" class="previous-scores">
                    <!-- Previous scores will be added here -->
                </div>
            </div>
        </div>

        <div class="game-area">
            <div id="challenges" class="challenges">
                <!-- Challenges will be generated here -->
            </div>
            <button id="pause-btn" class="pause-btn">Start Game</button>
        </div>
    </main>

    <script src="/script.js"></script>
</body>
</html>`;
}

function getCSS() {
  return `/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #1f2937;
}

.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem 1rem;
    gap: 2rem;
}

.game-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 800px;
}

.settings-panel {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.setting-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.setting-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
}

.setting-desc {
    font-size: 0.75rem;
    color: #6b7280;
    line-height: 1.4;
}

.setting-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 1rem;
    color: #374151;
    background: white;
    transition: border-color 0.2s;
}

.setting-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.operation-buttons {
    display: flex;
    gap: 0.5rem;
}

.operation-btn {
    flex: 1;
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db;
    background: white;
    color: #374151;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.operation-btn:hover {
    border-color: #9ca3af;
}

.operation-btn.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

.scores-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.score-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.score-label {
    font-weight: 500;
    color: #374151;
}

.score-value {
    font-weight: 700;
    font-size: 1.25rem;
    color: #1f2937;
}

.previous-scores {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.previous-score {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f9fafb;
    padding: 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
}

.game-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 100%;
}

.challenges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 600px;
}

.challenge {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 2rem;
    gap: 0.25rem;
}

.challenge-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: #f3f4f6;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
}

.challenge-input {
    width: 2rem;
    height: 2rem;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.2);
    color: #374151;
    transition: all 0.2s;
}

.challenge-input:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
}

.challenge-input.correct {
    background: #dcfce7;
    border-color: #16a34a;
    color: #166534;
}

.challenge-input.incorrect {
    background: #fee2e2;
    border-color: #dc2626;
    color: #991b1b;
}

.challenge-input.current {
    border-color: #3b82f6;
    background: white;
}

.pause-btn {
    padding: 0.75rem 2rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
}

.pause-btn:hover {
    background: #2563eb;
    box-shadow: 0 6px 8px rgba(59, 130, 246, 0.3);
}

.pause-btn.paused {
    background: #ef4444;
}

.pause-btn.paused:hover {
    background: #dc2626;
}

@media (max-width: 768px) {
    .main {
        padding: 1rem;
    }

    .game-section {
        gap: 1rem;
    }

    .challenges {
        padding: 1rem;
        gap: 0.25rem;
    }

    .challenge {
        min-width: 1.75rem;
    }

    .challenge-number,
    .challenge-input {
        width: 1.75rem;
        height: 1.75rem;
        font-size: 0.75rem;
    }
}

@media (min-width: 768px) {
    .game-section {
        flex-direction: row;
        align-items: flex-start;
    }

    .settings-panel,
    .scores-section {
        flex: 1;
    }

    .game-area {
        flex: 1;
    }
}`;
}

function getJS() {
  return `// Game state
let gameState = {
    level: {
        challenges: [],
        currentChallenge: 0
    },
    scores: {
        currentScore: 0,
        previousScores: []
    },
    settings: {
        difficulty: 1,
        operation: 'subtract',
        timeLimit: 5
    },
    isPaused: true,
    timer: null
};

// DOM elements
const difficultyInput = document.getElementById('difficulty');
const subtractBtn = document.getElementById('subtract-btn');
const addBtn = document.getElementById('add-btn');
const timeLimitInput = document.getElementById('timeLimit');
const currentScoreEl = document.getElementById('current-score');
const previousScoresEl = document.getElementById('previous-scores');
const challengesEl = document.getElementById('challenges');
const pauseBtn = document.getElementById('pause-btn');

// Utility functions
function generateRandomIntegers() {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
}

function normalizeAnswer(value) {
    return (value + 10) % 10;
}

function correctAnswerIs(integer, difficulty, operation) {
    switch (operation) {
        case 'add':
            return normalizeAnswer(integer + difficulty);
        case 'subtract':
            return normalizeAnswer(integer - difficulty);
        default:
            return 0;
    }
}

function validateAnswer(integer, userValue, difficulty, operation) {
    const correctAnswer = correctAnswerIs(integer, difficulty, operation);
    const valid = normalizeAnswer(correctAnswer) === userValue;
    return [valid, correctAnswer];
}

function generateRandomChallenges() {
    const numbers = generateRandomIntegers();
    return numbers.map(num => ({
        test: num,
        correctAnswer: undefined,
        correct: undefined,
        attempt: undefined
    }));
}

function generateInitialLevel() {
    return {
        challenges: generateRandomChallenges(),
        currentChallenge: 0
    };
}

function generateSettings(numCompletedLevels = 0) {
    return {
        difficulty: normalizeAnswer(1 + Math.floor(numCompletedLevels / 2)),
        operation: numCompletedLevels % 2 === 0 ? 'subtract' : 'add',
        timeLimit: Math.max(5 - numCompletedLevels * 0.2, 2)
    };
}

// Game logic
function initializeGame() {
    gameState.level = generateInitialLevel();
    gameState.scores.currentScore = 0;
    gameState.scores.previousScores = [];
    gameState.isPaused = true;
    updateUI();
}

function updateUI() {
    // Update settings
    difficultyInput.value = gameState.settings.difficulty;
    timeLimitInput.value = gameState.settings.timeLimit;

    // Update operation buttons
    subtractBtn.classList.toggle('active', gameState.settings.operation === 'subtract');
    addBtn.classList.toggle('active', gameState.settings.operation === 'add');

    // Update scores
    currentScoreEl.textContent = gameState.scores.currentScore;

    // Update previous scores
    previousScoresEl.innerHTML = '';
    gameState.scores.previousScores.forEach((score, index) => {
        const scoreEl = document.createElement('div');
        scoreEl.className = 'previous-score';
        scoreEl.innerHTML = \`
            <span>Level \${index + 1}: \${score.score} points</span>
            <span>\${score.settings.operation} \${score.settings.difficulty}</span>
        \`;
        previousScoresEl.appendChild(scoreEl);
    });

    // Update challenges
    challengesEl.innerHTML = '';
    gameState.level.challenges.forEach((challenge, index) => {
        const challengeEl = document.createElement('div');
        challengeEl.className = 'challenge';

        const numberEl = document.createElement('div');
        numberEl.className = 'challenge-number';
        numberEl.textContent = challenge.test;

        const inputEl = document.createElement('input');
        inputEl.className = \`challenge-input \${challenge.correct === true ? 'correct' : ''} \${challenge.correct === false ? 'incorrect' : ''} \${index === gameState.level.currentChallenge && !gameState.isPaused ? 'current' : ''}\`;
        inputEl.type = 'tel';
        inputEl.pattern = '[0-9]';
        inputEl.maxLength = 1;
        inputEl.inputMode = 'numeric';

        if (challenge.correct !== undefined) {
            inputEl.value = challenge.attempt;
            inputEl.disabled = true;
        } else if (index === gameState.level.currentChallenge && !gameState.isPaused) {
            inputEl.disabled = false;
            setTimeout(() => inputEl.focus(), 0);
        } else {
            inputEl.disabled = true;
        }

        inputEl.addEventListener('input', (e) => handleAttempt(index, parseInt(e.target.value)));
        inputEl.addEventListener('focus', (e) => e.target.select());

        challengeEl.appendChild(numberEl);
        challengeEl.appendChild(inputEl);
        challengesEl.appendChild(challengeEl);
    });

    // Update pause button
    pauseBtn.textContent = gameState.isPaused ? 'Start Game' : 'Pause Game';
    pauseBtn.classList.toggle('paused', !gameState.isPaused);
}

function handleAttempt(index, attempt) {
    if (isNaN(attempt) || attempt < 0 || attempt > 9) return;

    const [valid, correctAnswer] = validateAnswer(
        gameState.level.challenges[index].test,
        attempt,
        gameState.settings.difficulty,
        gameState.settings.operation
    );

    gameState.scores.currentScore += valid ? 1 : 0;
    gameState.level.challenges[index].correct = valid;
    gameState.level.challenges[index].attempt = attempt;
    gameState.level.challenges[index].correctAnswer = correctAnswer;

    // Move to next challenge
    const nextIndex = (index + 1) % 10;
    gameState.level.currentChallenge = nextIndex;

    // Check if level is complete
    if (nextIndex === 0) {
        gameState.scores.previousScores.push({
            score: gameState.scores.currentScore,
            settings: { ...gameState.settings }
        });
        gameState.scores.currentScore = 0;
        gameState.level = generateInitialLevel();
        gameState.settings = generateSettings(gameState.scores.previousScores.length);
    }

    updateUI();
}

function togglePause() {
    gameState.isPaused = !gameState.isPaused;

    if (!gameState.isPaused) {
        startTimer();
    } else {
        clearTimer();
    }

    updateUI();
}

function startTimer() {
    clearTimer();
    gameState.timer = setTimeout(() => {
        const challenge = gameState.level.challenges[gameState.level.currentChallenge];
        const correctAnswer = correctAnswerIs(
            challenge.test,
            gameState.settings.difficulty,
            gameState.settings.operation
        );

        gameState.level.challenges[gameState.level.currentChallenge].correct = false;
        gameState.level.challenges[gameState.level.currentChallenge].correctAnswer = correctAnswer;

        const nextIndex = (gameState.level.currentChallenge + 1) % 10;
        gameState.level.currentChallenge = nextIndex;

        if (nextIndex === 0) {
            gameState.scores.previousScores.push({
                score: gameState.scores.currentScore,
                settings: { ...gameState.settings }
            });
            gameState.scores.currentScore = 0;
            gameState.level = generateInitialLevel();
            gameState.settings = generateSettings(gameState.scores.previousScores.length);
        }

        updateUI();
        if (!gameState.isPaused) {
            startTimer();
        }
    }, gameState.settings.timeLimit * 1000);
}

function clearTimer() {
    if (gameState.timer) {
        clearTimeout(gameState.timer);
        gameState.timer = null;
    }
}

// Event listeners
difficultyInput.addEventListener('change', (e) => {
    gameState.settings.difficulty = Math.max(1, Math.min(9, parseInt(e.target.value) || 1));
});

subtractBtn.addEventListener('click', () => {
    gameState.settings.operation = 'subtract';
    updateUI();
});

addBtn.addEventListener('click', () => {
    gameState.settings.operation = 'add';
    updateUI();
});

timeLimitInput.addEventListener('change', (e) => {
    gameState.settings.timeLimit = Math.max(1, Math.min(10, parseFloat(e.target.value) || 5));
});

pauseBtn.addEventListener('click', togglePause);

// Initialize the game
initializeGame();`;
}
