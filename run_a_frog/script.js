{
	const blocks = document.querySelectorAll('.block');
	const scoreEl = document.querySelector('#score');
	const timerEl = document.querySelector('#time');
	const btn = document.querySelector('.btn-wrap button');
	const logLefts = document.querySelectorAll('.log-left');
	const logRights = document.querySelectorAll('.log-right');
	const carLefts = document.querySelectorAll('.car-left');
	const carRights = document.querySelectorAll('.car-right');

	let width = 9;
	let endIndex = 4;
	let direction = 1;
	let frogIndex = 76;
	let time = 12;
	let interval = 0;

	blocks[endIndex].classList.add('end');
	blocks[frogIndex].classList.add('frog');
	timerEl.textContent = time;

	function win() {
		if(blocks[frogIndex].classList.contains('end')) {
			scoreEl.textContent = 'YOU WIN';
			scoreEl.style.color = 'green';
			clearInterval(interval);
			document.removeEventListener('keydown', moveFrog);
		}
	};

	function loss() {
		if(time === 0 || 
			blocks[frogIndex].classList.contains('c1') ||
			blocks[frogIndex].classList.contains('l4') ||
			blocks[frogIndex].classList.contains('l5')
		) {
			scoreEl.textContent = 'YOU LOSS';
			scoreEl.style.color = 'red';
			clearInterval(interval);
			document.removeEventListener('keydown', moveFrog);
		}
	}

	function moveFrog(e) {
		blocks[frogIndex].classList.remove('frog');
		switch(e.keyCode) {
			case 37:
				if(frogIndex % width !== 0) frogIndex -= 1;
				break;
			case 38:
				if(!(frogIndex - width < 0)) frogIndex -= width;
				break;
			case 39:
				if(frogIndex % width !== width -1) frogIndex += 1;
				break;
			case 40:
				if(!(frogIndex + width > blocks.length)) frogIndex += width;
				break;
		}
		blocks[frogIndex].classList.add('frog');

		win();
		loss();
	};

	function autoMoveLog() {
		logLefts.forEach(logLeft => moveLogLeft(logLeft));
		logRights.forEach(logRight => moveLogRight(logRight));
	};

	function moveLogLeft(logLeft) {
		switch(true) {
			case logLeft.classList.contains('l1'):
				logLeft.classList.remove('l1')
				logLeft.classList.add('l2');
				break;
			case logLeft.classList.contains('l2'):
				logLeft.classList.remove('l2')
				logLeft.classList.add('l3');
				break;
			case logLeft.classList.contains('l3'):
				logLeft.classList.remove('l3')
				logLeft.classList.add('l4');
				break;
			case logLeft.classList.contains('l4'):
				logLeft.classList.remove('l4')
				logLeft.classList.add('l5');
				break;
			case logLeft.classList.contains('l5'):
				logLeft.classList.remove('l5')
				logLeft.classList.add('l1');
				break;
		}
	}

	function moveLogRight(logRight) {
		switch(true) {
			case logRight.classList.contains('l1'):
				logRight.classList.remove('l1')
				logRight.classList.add('l5');
				break;
			case logRight.classList.contains('l2'):
				logRight.classList.remove('l2')
				logRight.classList.add('l1');
				break;
			case logRight.classList.contains('l3'):
				logRight.classList.remove('l3')
				logRight.classList.add('l2');
				break;
			case logRight.classList.contains('l4'):
				logRight.classList.remove('l4')
				logRight.classList.add('l3');
				break;
			case logRight.classList.contains('l5'):
				logRight.classList.remove('l5')
				logRight.classList.add('l4');
				break;
		}
	};

	function autoMoveCar() {
		carLefts.forEach(carLeft => moveCarLeft(carLeft));
		carRights.forEach(carRight => moveCarRight(carRight));
	};

	function moveCarLeft(carLeft) {
		switch(true) {
			case carLeft.classList.contains('c1'):
				carLeft.classList.remove('c1');
				carLeft.classList.add('c2');
				break;
			case carLeft.classList.contains('c2'):
				carLeft.classList.remove('c2');
				carLeft.classList.add('c3');
				break;
			case carLeft.classList.contains('c3'):
				carLeft.classList.remove('c3');
				carLeft.classList.add('c1');
				break;
		}
	}

	function moveCarRight(carRight) {
		switch(true) {
			case carRight.classList.contains('c1'):
				carRight.classList.remove('c1');
				carRight.classList.add('c3');
				break;
			case carRight.classList.contains('c2'):
				carRight.classList.remove('c2');
				carRight.classList.add('c1');
				break;
			case carRight.classList.contains('c3'):
				carRight.classList.remove('c3');
				carRight.classList.add('c2');
				break;
		}
	}


	btn.addEventListener('click', (e) => {
		if(interval) {
			clearInterval(interval);
		} else {
			interval = setInterval(() => {
				time--;
				timerEl.textContent = time;
				autoMoveCar();
				autoMoveLog();
				loss();
			}, 800);
			document.addEventListener('keydown', moveFrog);
		}
	});



	






}
