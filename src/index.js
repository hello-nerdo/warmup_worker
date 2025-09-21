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
                        value="8"
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
            <div class="game-panel">
                <div id="current-task" class="current-task-container">-</div>
                <div id="challenges" class="challenges">
                    <!-- Challenges will be generated here -->
                </div>
            </div>
            <button id="start-stop-btn" class="start-stop-btn">Start Game</button>
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

.settings-panel.hidden {
    display: none;
}

.scores-section.hidden {
    display: none;
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
    max-height: 200px;
    overflow-y: auto;
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

.previous-score-badges {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.current-task-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
    width: 100%;
    border-bottom: 1px solid #e5e7eb;
}

.current-task-container.hidden {
    display: none;
}

.current-task-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.operation-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
}

.operation-badge.add {
    background: #dcfce7;
    color: #166534;
}

.operation-badge.subtract {
    background: #e9d5ff;
    color: #6b21a8;
}

.amount-pill {
    background: white;
    border: 1px solid #d1d5db;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #1f2937;
}

.seconds-pill {
    background: #f3f4f6;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.seconds-pill .seconds-value {
    font-weight: 600;
    color: #1f2937;
}

.game-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 100%;
}

.game-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 600px;
    overflow: hidden;
}

.challenges {
    display: none;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1.5rem;
    width: 100%;
}

.challenges.visible {
    display: flex;
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

.start-stop-btn {
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

.start-stop-btn:hover {
    background: #2563eb;
    box-shadow: 0 6px 8px rgba(59, 130, 246, 0.3);
}

.start-stop-btn.stopped {
    background: #ef4444;
}

.start-stop-btn.stopped:hover {
    background: #dc2626;
}

@media (max-width: 768px) {
    .main {
        padding: 1rem;
    }

    .game-section {
        gap: 1rem;
    }

    .settings-panel {
        padding: 1rem;
    }

    .setting-group {
        gap: 0.75rem;
    }

    .operation-buttons {
        gap: 0.75rem;
    }

    .operation-btn {
        min-height: 44px; /* Ensure touch targets are accessible */
        padding: 0.75rem 1rem;
    }

    .setting-input {
        min-height: 44px; /* Ensure touch targets are accessible */
        font-size: 1rem; /* Prevent zoom on iOS */
    }

    .scores-section {
        gap: 0.75rem;
    }

    .score-item {
        padding: 0.75rem;
    }

    .previous-scores {
        max-height: 150px; /* Smaller max height on mobile */
        min-height: 200px;
    }

    .current-task-container {
        padding: 0.75rem 1rem;
        margin-bottom: 0.75rem;
        border-bottom: 1px solid #e5e7eb;
    }

    .current-task-left {
        gap: 0.75rem;
    }

    .challenges {
        padding: 1rem;
        gap: 0.25rem;
    }

    .challenges.visible {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, auto);
        justify-items: center;
    }

    .challenge {
        min-width: 2rem; /* Slightly larger for better touch targets */
    }

    .challenge-number,
    .challenge-input {
        width: 2rem;
        height: 2rem;
        min-width: 2rem;
        min-height: 2rem;
        font-size: 1rem; /* Prevent zoom on iOS */
    }

    .start-stop-btn {
        padding: 1rem 2rem;
        min-height: 48px;
        font-size: 1.1rem;
    }
}

/* Extra small screens (phones in portrait) */
@media (max-width: 480px) {
    .main {
        padding: 0.75rem;
    }

    .settings-panel {
        padding: 0.75rem;
    }

    .setting-group {
        gap: 0.5rem;
    }

    .setting-desc {
        font-size: 0.7rem;
        line-height: 1.3;
    }

    .operation-buttons {
        gap: 0.5rem;
    }

    .operation-btn {
        padding: 0.5rem 0.75rem;
        font-size: 0.8rem;
    }

    .scores-section {
        gap: 0.5rem;
    }

    .score-item {
        padding: 0.5rem;
        font-size: 0.9rem;
    }

    .previous-scores {
        max-height: 120px;
        min-height: 180px;
        gap: 0.25rem;
    }

    .previous-score {
        padding: 0.5rem 0.75rem;
        font-size: 0.8rem;
    }

    .previous-score-badges {
        gap: 0.25rem;
    }

    .current-task-container {
        padding: 0.5rem 0.75rem;
        margin-bottom: 0.5rem;
    }

    .challenges {
        padding: 0.75rem;
        gap: 0.5rem;
    }

    .challenges.visible {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, auto);
        justify-items: center;
    }

    .challenge {
        min-width: 2.25rem;
    }

    .challenge-number,
    .challenge-input {
        width: 2.25rem;
        height: 2.25rem;
        font-size: 1rem; /* Prevent zoom on iOS */
    }

    .start-stop-btn {
        padding: 0.875rem 1.5rem;
        font-size: 1rem;
        width: 100%;
        max-width: 300px;
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
}

/* Animation for new scores */
.slide-right {
    animation: slide-right .2s cubic-bezier(.25,.46,.45,.94) both;
}

@keyframes slide-right {
    0% {
        transform: translateX(-100px);
    }
    100% {
        transform: translateX(0);
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
        timeLimit: 8
    },
    isRunning: false,
    timer: null,
    currentTimeRemaining: 8
};

// DOM elements
const difficultyInput = document.getElementById('difficulty');
const subtractBtn = document.getElementById('subtract-btn');
const addBtn = document.getElementById('add-btn');
const timeLimitInput = document.getElementById('timeLimit');
const currentScoreEl = document.getElementById('current-score');
const currentTaskEl = document.getElementById('current-task');
const previousScoresEl = document.getElementById('previous-scores');
const challengesEl = document.getElementById('challenges');
const startStopBtn = document.getElementById('start-stop-btn');

// Single persistent input for mobile keyboard continuity
let persistentInput = null;
let isMobileDevice = false;

// Mobile detection and persistent input management
function detectMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768 && window.innerHeight <= 1024);
}

function createPersistentInput() {
    if (persistentInput) return;

    persistentInput = document.createElement('input');
    persistentInput.type = 'tel';
    persistentInput.pattern = '[0-9]';
    persistentInput.maxLength = 1;
    persistentInput.inputMode = 'numeric';
    persistentInput.autocomplete = 'off';
    persistentInput.autocorrect = 'off';
    persistentInput.autocapitalize = 'off';
    persistentInput.spellcheck = false;
    persistentInput.style.position = 'fixed';
    persistentInput.style.top = '-100px';
    persistentInput.style.left = '-100px';
    persistentInput.style.opacity = '0';
    persistentInput.style.pointerEvents = 'none';
    persistentInput.style.width = '1px';
    persistentInput.style.height = '1px';

    persistentInput.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= 9) {
            handlePersistentInput(value);
        }
        // Clear the input immediately after processing
        e.target.value = '';
    });

    persistentInput.addEventListener('blur', () => {
        // On mobile, if the persistent input loses focus, refocus it after a short delay
        if (isMobileDevice && gameState.isRunning) {
            setTimeout(() => {
                if (persistentInput && gameState.isRunning) {
                    persistentInput.focus();
                }
            }, 100);
        }
    });

    document.body.appendChild(persistentInput);
}

function handlePersistentInput(value) {
    if (!gameState.isRunning) return;

    const currentIndex = gameState.level.currentChallenge;
    handleAttempt(currentIndex, value);
}

function focusPersistentInput() {
    if (persistentInput && isMobileDevice && gameState.isRunning) {
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
            if (persistentInput) {
                persistentInput.focus();
                // On iOS, sometimes we need to trigger a click or touch event
                if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                    persistentInput.click();
                }
            }
        }, 10);
    }
}

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

function generateSettings(numCompletedLevels = 0, currentSettings = null) {
    const baseTimeLimit = currentSettings ? currentSettings.timeLimit : 8;
    return {
        difficulty: normalizeAnswer(1 + Math.floor(numCompletedLevels / 2)),
        operation: numCompletedLevels % 2 === 0 ? 'subtract' : 'add',
        timeLimit: Math.max(baseTimeLimit - numCompletedLevels * 0.2, 2)
    };
}

// Game logic
function initializeGame() {
    isMobileDevice = detectMobileDevice();
    if (isMobileDevice) {
        createPersistentInput();
    }

    gameState.level = generateInitialLevel();
    gameState.scores.currentScore = 0;
    gameState.scores.previousScores = [];
    gameState.isRunning = false;
    gameState.currentTimeRemaining = gameState.settings.timeLimit;
    updateUI();
}

function updateUI() {
    // Update settings panel visibility
    const settingsPanel = document.querySelector('.settings-panel');
    settingsPanel.classList.toggle('hidden', gameState.isRunning);

    // Update scores section visibility
    const scoresSection = document.querySelector('.scores-section');
    scoresSection.classList.toggle('hidden', !gameState.isRunning);

    // Update current task visibility
    const currentTaskContainer = document.querySelector('.current-task-container');
    currentTaskContainer.classList.toggle('hidden', !gameState.isRunning);

    // Update challenges visibility
    challengesEl.classList.toggle('visible', gameState.isRunning);

    // Update settings
    difficultyInput.value = gameState.settings.difficulty;
    timeLimitInput.value = gameState.settings.timeLimit;

    // Update operation buttons
    subtractBtn.classList.toggle('active', gameState.settings.operation === 'subtract');
    addBtn.classList.toggle('active', gameState.settings.operation === 'add');

    // Update scores
    currentScoreEl.textContent = gameState.scores.currentScore;

    // Update current task
    if (gameState.isRunning && gameState.level.challenges.length > 0) {
        const operation = gameState.settings.operation;
        const difficulty = gameState.settings.difficulty;
        const timeLimit = gameState.settings.timeLimit;

        // Clear existing content
        currentTaskEl.innerHTML = '';

        // Create left side container
        const leftContainer = document.createElement('div');
        leftContainer.className = 'current-task-left';

        // Create operation badge
        const operationBadge = document.createElement('span');
        operationBadge.className = 'operation-badge ' + operation;
        operationBadge.textContent = operation;

        // Create amount pill
        const amountPill = document.createElement('span');
        amountPill.className = 'amount-pill';
        amountPill.textContent = difficulty;

        // Create seconds pill for right side
        const secondsPill = document.createElement('span');
        secondsPill.className = 'seconds-pill';

        const secondsValue = document.createElement('span');
        secondsValue.className = 'seconds-value';
        secondsValue.textContent = timeLimit.toFixed(1);

        const secondsText = document.createTextNode(' seconds');

        secondsPill.appendChild(secondsValue);
        secondsPill.appendChild(secondsText);

        // Append elements to left container
        leftContainer.appendChild(operationBadge);
        leftContainer.appendChild(amountPill);

        // Append containers to main container
        currentTaskEl.appendChild(leftContainer);
        currentTaskEl.appendChild(secondsPill);
    } else {
        currentTaskEl.textContent = '';
    }

    // Update previous scores
    previousScoresEl.innerHTML = '';
    gameState.scores.previousScores.forEach((score, index) => {
        const levelNumber = gameState.scores.previousScores.length - index;
        const scoreEl = document.createElement('div');
        scoreEl.className = 'previous-score';
        if (score.isNew) {
            scoreEl.classList.add('slide-right');
            score.isNew = false; // Remove the flag so it only animates once
        }

        // Create operation badge
        const operationBadge = document.createElement('span');
        operationBadge.className = 'operation-badge ' + score.settings.operation;
        operationBadge.textContent = score.settings.operation;

        // Create amount pill
        const amountPill = document.createElement('span');
        amountPill.className = 'amount-pill';
        amountPill.textContent = score.settings.difficulty;

        // Create the score text
        const scoreText = document.createElement('span');
        scoreText.textContent = 'Level ' + levelNumber + ': ' + score.score + ' points';

        // Create the badges container
        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'previous-score-badges';
        badgesContainer.appendChild(operationBadge);
        badgesContainer.appendChild(amountPill);

        scoreEl.appendChild(scoreText);
        scoreEl.appendChild(badgesContainer);
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
        inputEl.className = \`challenge-input \${challenge.correct === true ? 'correct' : ''} \${challenge.correct === false ? 'incorrect' : ''} \${index === gameState.level.currentChallenge && gameState.isRunning ? 'current' : ''}\`;
        inputEl.type = 'tel';
        inputEl.pattern = '[0-9]';
        inputEl.maxLength = 1;
        inputEl.inputMode = 'numeric';
        inputEl.autocomplete = 'off';
        inputEl.autocorrect = 'off';
        inputEl.autocapitalize = 'off';
        inputEl.spellcheck = false;

        if (challenge.correct !== undefined) {
            inputEl.value = challenge.correct === false ? '[X]' : challenge.attempt;
            inputEl.disabled = true;
        } else if (index === gameState.level.currentChallenge && gameState.isRunning) {
            inputEl.disabled = false;
            if (!isMobileDevice) {
                setTimeout(() => inputEl.focus(), 0);
            }
        } else {
            inputEl.disabled = true;
        }

        inputEl.addEventListener('input', (e) => handleAttempt(index, parseInt(e.target.value)));
        inputEl.addEventListener('focus', (e) => e.target.select());

        challengeEl.appendChild(numberEl);
        challengeEl.appendChild(inputEl);
        challengesEl.appendChild(challengeEl);
    });

    // Update start/stop button
    startStopBtn.textContent = gameState.isRunning ? 'Stop Game' : 'Start Game';
    startStopBtn.classList.toggle('stopped', gameState.isRunning);
}

function handleAttempt(index, attempt) {
    if (isNaN(attempt) || attempt < 0 || attempt > 9) return;

    // Only accept input for the current active challenge
    if (index !== gameState.level.currentChallenge) return;

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
        gameState.scores.previousScores.unshift({
            score: gameState.scores.currentScore,
            settings: { ...gameState.settings },
            isNew: true
        });
        gameState.scores.currentScore = 0;
        gameState.level = generateInitialLevel();
        gameState.settings = generateSettings(gameState.scores.previousScores.length, gameState.settings);
    }

    // Restart timer for the next challenge if game is running
    if (gameState.isRunning) {
        startTimer();
    }

    updateUI();

    // Ensure persistent input stays focused on mobile after handling attempt
    if (isMobileDevice && gameState.isRunning) {
        focusPersistentInput();
    }
}

function toggleStartStop() {
    if (!gameState.isRunning) {
        // Start the game
        gameState.isRunning = true;
        startTimer();
        // Focus the persistent input on mobile when game starts
        if (isMobileDevice) {
            focusPersistentInput();
        }
    } else {
        // Stop the game - reload the page
        window.location.reload();
        return;
    }

    updateUI();
}

function startTimer() {
    clearTimer();
    gameState.currentTimeRemaining = gameState.settings.timeLimit;
    gameState.timer = setInterval(() => {
        gameState.currentTimeRemaining -= 0.2;
        if (gameState.currentTimeRemaining <= 0) {
            // Time's up - mark as incorrect
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
                gameState.scores.previousScores.unshift({
                    score: gameState.scores.currentScore,
                    settings: { ...gameState.settings },
                    isNew: true
                });
                gameState.scores.currentScore = 0;
                gameState.level = generateInitialLevel();
                gameState.settings = generateSettings(gameState.scores.previousScores.length);
            }

            clearTimer();
            if (gameState.isRunning) {
                startTimer();
            }
        }
        // Only update UI when timer expires, not every tick
        if (gameState.currentTimeRemaining <= 0) {
            updateUI();
            // Ensure persistent input stays focused on mobile after timer expires
            if (isMobileDevice && gameState.isRunning) {
                focusPersistentInput();
            }
        }
    }, 200);
}

function clearTimer() {
    if (gameState.timer) {
        clearInterval(gameState.timer);
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
    if (!gameState.isRunning) {
        gameState.currentTimeRemaining = gameState.settings.timeLimit;
        updateUI();
    }
});

startStopBtn.addEventListener('click', toggleStartStop);

// Initialize the game
initializeGame();`;
}
