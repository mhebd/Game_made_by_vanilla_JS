{
	const gameWrap = document.querySelector('.game-wrap');
	const scoreEl = document.getElementById('score');
	const timeEl = document.getElementById('time');
	const btn = document.querySelector('.btn-wrap button');

	for (let i = 1; i <= 378; i++) {
		const div = document.createElement('div');
		div.classList.add('block');
		gameWrap.appendChild(div);
	};

	const blocks = document.querySelectorAll('.block');

	// Let's take all variables
	let time = 120;
	let width = 21;
	let ballDirection = {
		x: 1,
		y: 1,
	};
	let speed = 120;
	let interval = 0;
	let timeInterval = 0;
	let paddleDirection = 1;
	let ballIndex = Math.floor(Math.random() * 20);
	let paddleIndexs = [366, 367, 368];
	let playAgain = false;

	// Initially draw ball & bad
	blocks[ballIndex].classList.add('ball');
	timeEl.textContent = time;

	// Draw paddle
	function drawPaddle() {
		paddleIndexs.forEach(paddle => {
			blocks[paddle - width].classList.add('touch');
			blocks[paddle].classList.add('paddle');
		});
	}
	drawPaddle();

	// Undraw paddle
	function unDrawPaddle() {
		paddleIndexs.forEach(paddle => {
			blocks[paddle - width].classList.remove('touch');
			blocks[paddle].classList.remove('paddle');
		});
	};

	// Game Win funtionality
	function win() {
		if(time === 0) {
			scoreEl.textContent = 'YOU WIN';
			clearInterval(interval);
			clearInterval(timeInterval);
			document.removeEventListener('keydown', movePaddle);
			rePlay();
		}
	};

	// Game Loss funtionality
	function loss() {
		if(ballIndex + width > blocks.length) {
			scoreEl.textContent = 'YOU LOSS';
			scoreEl.style.color = 'red';
			clearInterval(interval);
			clearInterval(timeInterval);
			document.removeEventListener('keydown', movePaddle);
			rePlay();
		}
	};

	// Re play game
	function rePlay() {
		btn.textContent = 'Play Again';
		playAgain = true;
	}

	// Move paddle into left and right
	function movePaddle(e) {
		const rightWall = paddleIndexs[2] % width !== width -1;
		const leftWall = paddleIndexs[0] % width !== 0;

		switch(e.keyCode) {
			case 37:
				if(leftWall) {
					unDrawPaddle();
					paddleIndexs = paddleIndexs.map(i => i-3);
					drawPaddle();
				};
				break;
			case 39:
				if(rightWall) {
					unDrawPaddle();
					paddleIndexs = paddleIndexs.map(i => i+3);
					drawPaddle();
				};
				break;
		}
	};


	// Auto move ball into left, right, top & down;
	function autoMoveBall() {
		blocks[ballIndex].classList.remove('ball');

		if(ballIndex % width === width -1) {
			ballDirection.x = -1;
		};
		if(ballIndex % width === 0) {
			ballDirection.x = 1;
		};
		if(ballIndex - width < 0) {
			ballDirection.y = 1;
		};
		if(blocks[ballIndex].classList.contains('touch')) {
			ballDirection.y = -1;
		}

		ballIndex = (ballIndex + ballDirection.x) + (ballDirection.y * width);

		blocks[ballIndex].classList.add('ball');
		win();
		loss();
	}



	// Events listener section
	document.addEventListener('keydown', movePaddle);
	btn.addEventListener('click', (e) => {
		if(interval) {
			clearInterval(interval);
			clearInterval(timeInterval);
			if(playAgain) {
				window.location.reload();
			}
			rePlay();
		} else {
			interval = setInterval(() => {
				autoMoveBall();
				win();
				loss();
			}, speed);
			timeInterval = setInterval(() => {
				time--;
				timeEl.textContent = time;
			}, 1000);
		}
	});


}
