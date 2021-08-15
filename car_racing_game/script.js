{
	const gameBox = document.querySelector('.game-wrap');
	const btn = document.querySelector('.btn-wrap button');
	const speedEl = document.querySelector('#speed');
	const resEl = document.querySelector('#result');
	// let play = false;
	gameBox.innerHTML = '';
	speedEl.textContent = 0;
	let finish = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

	for (let i = 1; i <= 9990; i++) {
		const div = document.createElement('div');
		div.classList.add('squire');
		if(i === finish[i-1]) {
			div.classList.add('finish');
		}
		i = String(i);
		if(i.endsWith(97) || i.endsWith(98) || i.endsWith(99) || i.endsWith(96) || i.endsWith(95)) {
			div.classList.add('block');
		}
		gameBox.appendChild(div);
	};

	const squires = Array.from(document.querySelectorAll('.squire'));

	let carIndex = 9967;
	let width = 15;
	let speed = 100;
	let interval = 0;
	let scrollHeight = document.querySelector('.game-wrap').scrollHeight;

	squires[carIndex].classList.add('car');
	gameBox.scrollTo(0, scrollHeight)


	function rideCar() {
		squires[carIndex].classList.remove('car');
		carIndex -=width;
		squires[carIndex].classList.add('car');
		win();
		loss();
	};

	function scorllUp() {
		gameBox.scrollBy(0, -20);
	}

	function moveCar(e) {
		switch(e.keyCode) {
			case 37:
				if(carIndex % width !== 0) {
					squires[carIndex].classList.remove('car');
					carIndex--;
					squires[carIndex].classList.add('car');
				};
				break;
			case 39:
				if(carIndex % width !== width -1) {
					squires[carIndex].classList.remove('car');
					carIndex++;
					squires[carIndex].classList.add('car');
				};
				break;
		}
	};

	function win() {
		if(squires[carIndex].classList.contains('finish')) {
			clearInterval(interval);
			resEl.textContent = 'YOU WIN';
			resEl.style.color = 'green';
			document.removeEventListener('keydown', moveCar);
		}
	};

	function loss() {
		if(squires[carIndex].classList.contains('block')) {
			clearInterval(interval);
			resEl.textContent = 'YOU LOSS';
			resEl.style.color = 'red';
			document.removeEventListener('keydown', moveCar);
		}
	};

	function showSpeed() {
		speed *= 0.99;
		speed = speed < 5 ? 5 : speed;
		let speedPH = Math.ceil(1000 / speed);
		speedEl.textContent = speedPH;
	};



	// setInterval(rideCar, 50);

	document.addEventListener('keydown', moveCar);
	btn.addEventListener('dblclick', (e) => window.location.reload());
	btn.addEventListener('click', () => {
		if(interval) {
			clearInterval(interval);
		} else {
			interval = setInterval(() => {
				win();
				loss();
				rideCar();
				scorllUp();
				showSpeed();
			}, speed)
		}
	});

}
