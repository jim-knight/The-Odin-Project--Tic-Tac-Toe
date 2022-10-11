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

	const resetActivePlayer = () => {
		players.currentPlayer = players.player1;
	};
	const switchActivePlayer = () => {
		players.currentPlayer === players.player1
			? (players.currentPlayer = players.player2)
			: (players.currentPlayer = players.player1);
	};
	return {
		player1,
		player2,
		currentPlayer,
		resetActivePlayer,
		switchActivePlayer,
	};
})();

// Game variables module
const gameBoard = (() => {
	let gameOver = false;

	// Generating the board array
	let board = new Array(9).fill('');

	const boardMarker = (marker, i) => {
		board[i] = marker;
	};

	const resetBoard = () => {
		board.fill('');
		console.log(board);
	};

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
			gameBoard.gameOver = true;
			displayController.updateMsg('horizontal');
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
			gameBoard.gameOver = true;
			displayController.updateMsg('vertical');
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
			gameBoard.gameOver = true;
			displayController.updateMsg('diagonal');
		}
	};

	// Draw condition
	const drawCondition = () => {
		// Checks to find the first empty square, which means a valid play space is still available
		let emptySquare = board.indexOf('');
		if (emptySquare == -1) {
			gameOver = true;
			displayController.updateMsg('draw');
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
	const squares = document.querySelectorAll('.square');
	const btnReset = document.querySelector('.resetGame');

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
		if (gameBoard.gameOver == false) {
			e.target.innerHTML = `<img src="./icons/${players.currentPlayer.marker}-regular.svg">`;
			e.target.dataset.owner = players.currentPlayer.name;
			gameBoard.boardMarker(players.currentPlayer.name, squareIndex(e));
		}
		gameBoard.winConditions();
		gameBoard.drawCondition();
		console.log(gameBoard.gameOver);
		if (gameBoard.gameOver == false) {
			players.switchActivePlayer();
			updateMsg('switchPlayer');
		}
	};

	// Empty squares
	const clearSquares = () => {
		squares.forEach((square) => {
			square.innerHTML = '';
			delete square.dataset.owner;
		});
	};

	// Update message
	const updateMsg = (msg) => {
		const msgBox = document.querySelector('.info p');
		if (msg === 'horizontal') {
			msgBox.textContent = `${players.currentPlayer.name} wins with a horizontal line!`;
		}
		if (msg === 'vertical') {
			msgBox.textContent = `${players.currentPlayer.name} wins with a vertical line!`;
		}
		if (msg === 'diagonal') {
			msgBox.textContent = `${players.currentPlayer.name} wins with a diagonal line!`;
		}
		if (msg === 'draw') {
			msgBox.textContent = 'All out of play spaces. Reset the game';
		}
		if (msg === 'switchPlayer' || msg === 'resetPlayer') {
			msgBox.innerHTML = `Next: ${players.currentPlayer.name} <img src="./icons/${players.currentPlayer.marker}-regular.svg">`;
		}
	};
	updateMsg('resetPlayer');

	// Clear game screen and reset
	const resetDOMBoard = () => {
		clearSquares();
		gameBoard.resetBoard();
		players.resetActivePlayer();
		updateMsg('resetPlayer');
		gameBoard.gameOver = false;
	};
	btnReset.addEventListener('click', resetDOMBoard);

	return { squareIndex, updateMsg };
})();
