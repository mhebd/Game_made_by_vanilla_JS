{
	const moleBoxes = document.querySelectorAll('.mole-box');
	const scoreEl = document.getElementById('score');
	const timeEl = document.getElementById('left');
	const moles = document.querySelectorAll('.game-wrap img');
	const btn = document.querySelector('.btn-wrap button');

	let timeLeft = 12;
	let score = 0;
	timeEl.textContent = timeLeft < 10 ? '0' + timeLeft : timeLeft;

	function randomTime(min, max) {
		return Math.random() * (max - min) + min;
	}

	function randomBox(boxes) {
		const idx = Math.floor(Math.random() * boxes.length);
		return boxes[idx];
	}

	function showMole() {
		const time = randomTime(300, 700);
		const box = randomBox(moleBoxes);
		box.classList.add('show');
		setTimeout(() => {
			box.classList.remove('show');
			timeLeft === 0 ? null : showMole();
		}, time);
	}

	const timeInterval = setInterval(() => {
		if(timeLeft === 0) {
			clearInterval(timeInterval);
			btn.style.display = 'inline-block';
		} else {
			timeLeft--;
			timeEl.textContent = timeLeft < 10 ? '0' + timeLeft : timeLeft;
		}
	}, 1000);

	function displayScore(e) {
		console.log(e);
		score++;
		scoreEl.textContent = score;
	}

	moles.forEach(mole => mole.addEventListener('click', displayScore));

	btn.addEventListener('click', () => window.location.reload());

	showMole();

}
