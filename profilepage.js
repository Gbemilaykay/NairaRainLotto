// Example game data (numbers and super pick)
const games = [
    { date: '2024-09-01', game: 'Rapid Games', numbers: [5, 18, 23, 42, 56], superPick: 0, outcome: 'win', amount: 5000 },
    { date: '2024-09-05', game: 'Daily Games', numbers: [12, 25, 34, 45, 60], superPick: 0, outcome: 'lose', amount: -50 },
    { date: '2024-09-10', game: 'Rapid Games', numbers: [3, 15, 22, 39, 50], superPick: 0, outcome: 'win', amount: 200 },
    { date: '2024-09-12', game: 'Weekly Games', numbers: [7, 14, 30, 33, 45], superPick: 8, outcome: 'lose', amount: -100 },
    { date: '2024-09-15', game: 'Weekly Games', numbers: [8, 22, 34, 43, 55], superPick: 12, outcome: 'win', amount: 1000 },
    { date: '2024-09-25', game: 'Rapid Games', numbers: [8, 2, 14, 43, 35], superPick: 0, outcome: 'win', amount: 1000 }
];

// Elements to update
const totalGamesElem = document.getElementById('total-games');
const totalWinsElem = document.getElementById('total-wins');
const totalLossesElem = document.getElementById('total-losses');
const gameHistoryTable = document.querySelector('#game-history-table tbody');

// Initialize profile statistics
let totalGames = games.length;
let totalWins = 0;
let totalLosses = 0;

// Populate the game history table
games.forEach(game => {
    const row = document.createElement('tr');
    
    // Create table cells
    const dateCell = document.createElement('td');
    dateCell.textContent = game.date;

    const gameCell = document.createElement('td');
    gameCell.textContent = game.game;

    const numbersCell = document.createElement('td');
    numbersCell.textContent = game.numbers.join(', ');

    const superPickCell = document.createElement('td');
    superPickCell.textContent = game.superPick;

    const outcomeCell = document.createElement('td');
    outcomeCell.textContent = game.outcome === 'win' ? 'Won' : 'Lost';
    outcomeCell.classList.add(game.outcome === 'win' ? 'win' : 'lose');

    const amountCell = document.createElement('td');
    amountCell.textContent = game.amount > 0 ? `+$${game.amount}` : `-$${Math.abs(game.amount)}`;

    // Append cells to row
    row.appendChild(dateCell);
    row.appendChild(gameCell);
    row.appendChild(numbersCell);
    row.appendChild(superPickCell);
    row.appendChild(outcomeCell);
    row.appendChild(amountCell);

    // Append row to the table
    gameHistoryTable.appendChild(row);

    // Update win/loss count
    if (game.outcome === 'win') {
        totalWins++;
    } else {
        totalLosses++;
    }
});

// Update profile statistics in the DOM
totalGamesElem.textContent = totalGames;
totalWinsElem.textContent = totalWins;
totalLossesElem.textContent = totalLosses;
