'use strict';

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
		players.currentPlayer === players.player1
			? (players.currentPlayer = players.player2)
			: (players.currentPlayer = players.player1);
	};
	return { player1, player2, currentPlayer, switchActivePlayer };
})();

// Game variables module
const gameBoard = (() => {
	let gameOver = false;

	// Generating the board array
	let board = new Array(9).fill('');

	const boardMarker = (marker, i) => {
		board[i] = marker;
	};

	const resetBoard = () => board.fill('');

	// Win conditions
	const winConditions = () => {
		const square = gameBoard.board;
		const curPlayer = players.currentPlayer.name;
		// Horizontals
		if (
			(square[0] == curPlayer &&
				square[1] == curPlayer &&
				square[2] == curPlayer) ||
			(square[3] == curPlayer &&
				square[4] == curPlayer &&
				square[5] == curPlayer) ||
			(square[6] == curPlayer &&
				square[7] == curPlayer &&
				square[8] == curPlayer)
		) {
			console.log('You win with a horizontal line!');
		}
		// Verticals
		else if (
			(square[0] == curPlayer &&
				square[3] == curPlayer &&
				square[6] == curPlayer) ||
			(square[1] == curPlayer &&
				square[4] == curPlayer &&
				square[7] == curPlayer) ||
			(square[2] == curPlayer &&
				square[5] == curPlayer &&
				square[8] == curPlayer)
		) {
			console.log('You win with a vertical line!');
		}
		// Diagonals
		else if (
			(square[0] == curPlayer &&
				square[4] == curPlayer &&
				square[8] == curPlayer) ||
			(square[2] == curPlayer &&
				square[4] == curPlayer &&
				square[6] == curPlayer)
		) {
			console.log('You win with a diagonal line!');
		}
	};

	// Draw condition
	const drawCondition = () => {
		// Checks to find the first empty square, which means a valid play space is still available
		let emptySquare = board.indexOf('');
		if (emptySquare == -1) {
			gameOver = true;
			console.log('All out of play spaces');
		}
	};

	return {
		board,
		boardMarker,
		drawCondition,
		gameOver,
		resetBoard,
		winConditions,
	};
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

	// Get index position of current square
	const squareIndex = (e) => {
		let sqIndex = e.target.dataset.id;
		return sqIndex;
	};

	const drawSquare = (e) => {
		// Check if this square is already taken
		if (e.target.innerHTML) {
			return console.log(
				'This spot has already been chosen by the other player! Select another square'
			);
		}
		e.target.innerHTML = `<i class="fa-regular fa-${players.currentPlayer.marker}"></i>`;
		e.target.dataset.owner = players.currentPlayer.name;
		gameBoard.boardMarker(players.currentPlayer.name, squareIndex(e));
		gameBoard.winConditions();
		gameBoard.drawCondition();
		players.switchActivePlayer();
	};

	// Message
	// Clear game screen

	return { squareIndex };
})();
