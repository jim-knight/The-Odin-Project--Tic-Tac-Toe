'use strict';

// Gameboard creation
const gameBoard = () => {
	// Generating the board array
	let board = [];
	for (let i = 0; i < 9; i++) {
		board.push('');
	}

	// Inserting board into DOM
	const squares = document.querySelector('.squares');
	board.forEach((square, i) => {
		square = document.createElement('div');
		square.className = 'square';
		// if (i % 2 == 0) {
		// 	square.textContent = 'X';
		// } else {
		// 	square.textContent = '0';
		// }
		squares.appendChild(square);
	});

	// Event listener
	Array.from(squares.children).forEach((square, i) => {
		square.addEventListener('click', (e) => {
			if (square.classList.contains('X')) {
				return console.log('This spot has already been chosen!');
			}
			square.classList.add(game.activePlayer.marker);
			square.textContent = game.activePlayer.marker;
		});
	});

	return board;
};

gameBoard();

// Player creation
const playerCreator = (name, marker) => {
	return { name, marker };
};

const game = (() => {
	const player1 = playerCreator('Player 1', 'X');
	const player2 = playerCreator('Player 2', 'O');

	// Initial state
	let activePlayer = player1;

	// Change players

	return {
		activePlayer,
	};
})();
