const GAME_COST = 100;
let games = [{ id: 1, numbers: [], superNumber: 0 }];
let currentGameId = 1;

// DOM Elements
const gamesContainer = document.getElementById('gamesContainer');
const gamesCountElement = document.getElementById('gamesCount');
const totalAmountElement = document.getElementById('totalAmount');
const addGameBtn = document.getElementById('addGameBtn');
const playBtn = document.getElementById('playBtn');
const numberPickerModal = document.getElementById('numberPickerModal');
const ticketModal = document.getElementById('ticketModal');

// Initialize the first game
renderGames();

// Event Listeners
addGameBtn.addEventListener('click', addNewGame);
playBtn.addEventListener('click', handlePlay);

function createProgressBar(count, maxCount, label) {
    return `
        <div class="progress-container">
            <div class="progress-info">
                <span>${label}: ${count}/${maxCount}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(count / maxCount) * 100}%"></div>
            </div>
        </div>
    `;
}

function createGameCard(game) {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    
    // Empty number circles array for all 6 numbers (5 regular + 1 super)
    const numberCircles = Array(5).fill('').map(() => `
        <div class="number-circle"></div>
    `).join('');

    gameCard.innerHTML = `
        <div class="game-header">
            <h3>Ticket ${game.id}</h3>
            <div class="button-group">
                <button class="btn btn-outline" id="editbutton" onclick="pickNumbers(${game.id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="btn btn-outline-red" id="deletebutton" onclick="deleteGame(${game.id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
        <div class="number-display">
             <div class="number-round">
                ${game.numbers.length > 0 ? 
                    [...game.numbers].sort((a, b) => a - b).map(num => `
                        <div class="number-circle">${num}</div>
                    `).join('') : 
                    numberCircles
                }
             </div>
            <div class="super-numberbox">
                <div class="number-circle super-number">${game.superNumber || ''}</div>
            </div>
        </div>
        <div class="button-group game-buttons">
            <button id="pickNumbers" class="btn btn-primary" onclick="pickNumbers(${game.id})">Pick Numbers</button>
            <button id="generateLucky" class="btn btn-outline" onclick="generateLucky(${game.id})">Auto Pick</button>
            <button id="resetGame" class="btn btn-outline-red" onclick="resetGame(${game.id})">Clear</button>
        </div>
    `;
    return gameCard;
}

function renderGames() {
    gamesContainer.innerHTML = '';
    games.forEach(game => {
        gamesContainer.appendChild(createGameCard(game));
    });
    updateGameInfo();
}

function updateGameInfo() {
    // Only count games that have all required numbers selected
    const completedGames = games.filter(game => game.numbers.length === 5 && game.superNumber !== 0);
    gamesCountElement.textContent = completedGames.length;
    totalAmountElement.textContent = (completedGames.length * GAME_COST).toLocaleString();
}

function addNewGame() {
    currentGameId++;
    games.push({ id: currentGameId, numbers: [], superNumber: 0 });
    renderGames();
}

function deleteGame(id) {
    if (games.length === 1) {
        alert('You must have at least one game!');
        return;
    }
    games = games.filter(game => game.id !== id);
    renderGames();
}

function generateLucky(id) {
    const lucky = Array.from({ length: 5 }, () => Math.floor(Math.random() * 49) + 1).sort((a, b) => a - b);
    const luckySuper = Math.floor(Math.random() * 10) + 1;
    
    const gameIndex = games.findIndex(game => game.id === id);
    if (gameIndex !== -1) {
        games[gameIndex].numbers = lucky;
        games[gameIndex].superNumber = luckySuper;
        renderGames();
    }
}

function resetGame(id) {
    const gameIndex = games.findIndex(game => game.id === id);
    if (gameIndex !== -1) {
        games[gameIndex].numbers = [];
        games[gameIndex].superNumber = 0;
        renderGames();
    }
}


function pickNumbers(id) {
    const game = games.find(g => g.id === id);
    if (!game) return;

    const modal = document.getElementById('numberPickerModal');
    const numberGrid = modal.querySelector('.number-grid');
    const superNumberGrid = modal.querySelector('.super-number-grid');
    
     // Remove any existing progress bars first
     const existingProgress = modal.querySelectorAll('.progress-container');
     existingProgress.forEach(progress => progress.remove());
    
    // Add progress bars
    const progressContainer = document.createElement('div');
    progressContainer.innerHTML = `
        <div class="progress-container">
         <div class="progress-bar">
                <div class="progress-fill" style="width: ${(game.numbers.length / 5) * 100}%"></div>
            </div>
            <div class="progress-info">
                <span> ${game.numbers.length}/5</span>
            </div>           
        </div>
        <div class="progress-container">
        <div class="progress-bar">
                <div class="progress-fill" style="width: ${game.superNumber ? 100 : 0}%"></div>
            </div>
            <div class="progress-info">
                <span>${game.superNumber ? '1' : '0'}/1</span>
            </div>            
        </div>
    `;
    
    modal.querySelector('.modal-content').insertBefore(
        progressContainer,
        modal.querySelector('.number-grid')
    );

    // Generate number buttons
    numberGrid.innerHTML = Array.from({ length: 49 }, (_, i) => i + 1)
        .map(num => `
            <button class="number-btn ${game.numbers.includes(num) ? 'selected' : ''}" 
                    data-number="${num}"
                    onclick="toggleNumber(${num}, ${id})">
                ${num}
            </button>
        `).join('');

    // Generate super number buttons
    superNumberGrid.innerHTML = Array.from({ length: 10 }, (_, i) => i + 1)
        .map(num => `
            <button class="number-btn ${game.superNumber === num ? 'selected' : ''}"
                    data-super-number="${num}"
                    onclick="toggleSuperNumber(${num}, ${id})">
                ${num}
            </button>
        `).join('');

    modal.style.display = 'block';

    // Add event listeners for modal buttons
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('.btn-outline-red');
    const resetBtn = modal.querySelector('.btn-outline');
    const confirmBtn = modal.querySelector('.btn-primary');

    closeBtn.onclick = () => modal.style.display = 'none';
    cancelBtn.onclick = () => modal.style.display = 'none';
    resetBtn.onclick = () => resetNumberPicker(id);
    confirmBtn.onclick = () => confirmNumberPicker(id);

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function toggleNumber(num, gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    const btn = document.querySelector(`[data-number="${num}"]`);
    if (game.numbers.includes(num)) {
        game.numbers = game.numbers.filter(n => n !== num);
        btn.classList.remove('selected');
    } else if (game.numbers.length < 5) {
        game.numbers.push(num);
        game.numbers.sort((a, b) => a - b); // Sort numbers in ascending order
        btn.classList.add('selected');
    }
    
    // Update progress bar
    const progressFill = document.querySelector('.progress-container:first-child .progress-fill');
    const progressText = document.querySelector('.progress-container:first-child .progress-info span');
    if (progressFill && progressText) {
        progressFill.style.width = `${(game.numbers.length / 5) * 100}%`;
        progressText.textContent = `${game.numbers.length}/5`;
    }
}

function toggleSuperNumber(num, gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    const btns = document.querySelectorAll('[data-super-number]');
    btns.forEach(btn => btn.classList.remove('selected'));

    game.superNumber = game.superNumber === num ? 0 : num;
    if (game.superNumber !== 0) {
        document.querySelector(`[data-super-number="${num}"]`).classList.add('selected');
    }
    
    // Update progress bar
    const progressFill = document.querySelector('.progress-container:last-child .progress-fill');
    const progressText = document.querySelector('.progress-container:last-child .progress-info span');
    if (progressFill && progressText) {
        progressFill.style.width = game.superNumber ? '100%' : '0%';
        progressText.textContent = `${game.superNumber ? '1' : '0'}/1`;
    }
}

function resetNumberPicker(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    game.numbers = [];
    game.superNumber = 0;
    
    const numberBtns = document.querySelectorAll('[data-number]');
    const superBtns = document.querySelectorAll('[data-super-number]');
    
    numberBtns.forEach(btn => btn.classList.remove('selected'));
    superBtns.forEach(btn => btn.classList.remove('selected'));

     // Reset progress bars
     const numberProgressFill = document.querySelector('.progress-container:first-child .progress-fill');
     const numberProgressText = document.querySelector('.progress-container:first-child .progress-info span');
     const superProgressFill = document.querySelector('.progress-container:last-child .progress-fill');
     const superProgressText = document.querySelector('.progress-container:last-child .progress-info span');
     
     if (numberProgressFill && numberProgressText) {
         numberProgressFill.style.width = '0%';
         numberProgressText.textContent = 'Regular Numbers: 0/5';
     }
     if (superProgressFill && superProgressText) {
         superProgressFill.style.width = '0%';
         superProgressText.textContent = 'Super Number: 0/1';
     }
}

function confirmNumberPicker(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    if (game.numbers.length !== 5 || game.superNumber === 0) {
        alert('Please select 5 numbers and 1 super number');
        return;
    }

    numberPickerModal.style.display = 'none';
    renderGames();
}

function handlePlay() {
    const validGames = games.filter(
        game => game.numbers.length === 5 && game.superNumber !== 0
    );

    if (validGames.length === 0) {
        alert('Please complete at least one game before playing.');
        return;
    }

    showTicket();
}

function showTicket() {
    const modal = document.getElementById('ticketModal');
    const content = modal.querySelector('.ticket-content');
    
    content.innerHTML = `
        <p class="games-count">Ticket Played: ${games.length}</p>
        <div class="ticket-games">
            ${games.map(game => `
                <div class="game-entry">
                    <h4>Ticket ${game.id}</h4>
                    <div class="number-display" id="numberDisplay">
                        ${game.numbers.map(num => `
                            <div class="number-circle">${num}</div>
                        `).join('')}
                        <div class="number-circle super-number">${game.superNumber}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        <p class="total-amount">Total Amount: ₦${(games.length * GAME_COST).toLocaleString()}</p>
    `;

    modal.style.display = 'block';

    const closeBtn = modal.querySelector('.close-btn');
    const acceptBtn = modal.querySelector('.btn-primary');

    closeBtn.onclick = () => modal.style.display = 'none';
    acceptBtn.onclick = () => modal.style.display = 'none';

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Auto-close after 5 seconds

    // setTimeout(() => {
    //     modal.style.display = 'none';
    // }, 25000);    
}



