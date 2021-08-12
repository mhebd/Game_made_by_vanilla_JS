{
	const dots = document.querySelectorAll('.dot');
	const scoreEl = document.querySelector('#score');
	const startBtn = document.querySelector('#start');

	//Initial varaables
	let width = 20,
		currentIndex = 0,
		appleIndex = 0,
		score = 0,
		currentSnake = [2, 1, 0],
		direction = 1,
		intervalTime = 0,
		interval = 0,
		speed = 0.9;

	// Start game 
	function startGame() {
		dots.forEach(dot => dot.classList.remove('snake'));
		dots[appleIndex].classList.remove('apple');
		clearInterval(interval);
		score = 0;
		randomApple();
		scoreEl.textContent = score;
		currentSnake = [2, 1, 0];
		intervalTime = 1000;
		currentSnake.forEach(i => dots[i].classList.add('snake'));
		interval = setInterval(moveSnake, intervalTime);
	}

	// Move snake 
	function moveSnake() {
		// Be sure the snake can't move outside of the box
		if((currentSnake[0] + width >= (width * width) && direction === width) || 
			(currentSnake[0] - width < 0 && direction === -width) || 
			(currentSnake[0] % width === width - 1 && direction === 1) || 
			(currentSnake[0] % width === 0 && direction === -1) || 
			(dots[currentSnake[0] + direction].classList.contains('snake'))
			) {
			return clearInterval(interval);
		};
		
		// Select snake tail and remove it from snake
		const tail = currentSnake.pop();
		dots[tail].classList.remove('snake');
		currentSnake.unshift(currentSnake[0] + 
			direction);

		// If snake hit an apple 
		if(dots[currentSnake[0]].classList.contains('apple')) {
			dots[currentSnake[0]].classList.remove('apple');
			currentSnake.push(tail);
			dots[tail].classList.add('snake');
			score++;
			clearInterval(interval);
			scoreEl.textContent = score;
			intervalTime *= speed;
			randomApple();
			interval = setInterval(moveSnake, intervalTime);
		}

		dots[currentSnake[0]].classList.add('snake');
	};

	// Select random apple 
	function randomApple() {
		do {
			appleIndex = Math.floor(Math.random() * dots.length);
		} while(dots[appleIndex].classList.contains('snake')) {
			dots[appleIndex].classList.add('apple');
		}
	};

	// Controll sname by key prass
	function controlSnake(e) {
		if(e.keyCode === 37 || e.keyCode === 65) {
			direction = -1;
		} else if(e.keyCode === 38 || e.keyCode === 87) {
			direction = -width;
		} else if(e.keyCode === 39 || e.keyCode === 68) {
			direction = 1;
		} else if(e.keyCode === 40 || e.keyCode === 83) {
			direction = width;
		}
	}

	// Events
	document.addEventListener('keyup', controlSnake);
	startBtn.addEventListener('click', startGame);

}
