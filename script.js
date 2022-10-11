'use strict';

// Reference
//https://github.com/ken862734801/Tic-Tac-Toe/blob/main/script.js

// Players module
const players = (() => {
	// Player creation factory function
	const playerCreator = (name, marker) => {
		return { name, marker };
	};
	const player1 = playerCreator('Player 1', 'xmark');
	const player2 = playerCreator('Player 2', 'circle');
	let currentPlayer = player1;

	let switchActivePlayer = () => {
		if (players.currentPlayer === players.player1) {
			players.currentPlayer = players.player2;
			console.log(`Next turn: Player 2`);
		} else {
			players.currentPlayer = players.player1;
			console.log(`Next turn: Player 1`);
		}
	};

	return { player1, player2, currentPlayer, switchActivePlayer };
})();

// Game variables module
const gameBoard = (() => {
	// Generating the board array
	let board = new Array(9).fill('');

	let gameOver = false;

	return { board, gameOver };
})();

// DOM manipulation module
const displayController = (() => {
	// DOM elements
	const squares = document.querySelectorAll('.squares');
	// const messageDisplay
	// const refreshBtn

	// Click element for squares
	squares.forEach((square) => {
		square.addEventListener('click', (e) => {
			drawSquare(e);
		});
	});

	const drawSquare = (e) => {
		// Check if this square is already taken
		if (e.target.innerHTML) {
			return console.log(
				'This spot has already been chosen by the other player! Select another square'
			);
		}
		e.target.innerHTML = `<i class="fa-regular fa-${players.currentPlayer.marker}"></i>`;
		e.target.dataset.owner = players.currentPlayer.name;
		players.switchActivePlayer();
	};

	// Message

	// Clear game screen
})();
