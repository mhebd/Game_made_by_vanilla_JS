{
	const boxes = document.querySelectorAll('.box');
	const scoreEl = document.querySelector('#score');
	const resEl = document.querySelector('#result');
	const btn = document.querySelector('.btn-wrap button');

	let width = 15;
	let	currentSooterIndex = 202;
	let direction = 1;
	let goingRight = true;
	let enemyInterval = 0;
	let score = 0;

	let enemy = [
		0,1,2,3,4,5,6,7,8,9,
		15,16,17,18,19,20,21,22,23,24,
		30,31,32,33,34,35,36,37,38,39
	];
	let enemyRemoves = [];

	function draw() {
		enemy.forEach((e,i) => {
			if(!enemyRemoves.includes(i)) boxes[enemy[i]].classList.add('enemy');
		});
	};
	draw();

	boxes[currentSooterIndex].classList.add('gun');

	function moveEnemy() {
		const left = enemy[0] % width === 0;
		const right = enemy[enemy.length -1] % width === width -1;

		enemy.forEach(i => boxes[i].classList.remove('enemy'));

		if(right && goingRight) {
			enemy.forEach((e, i) => {
				enemy[i] += width + 1;
				direction = -1;
				goingRight = false;
			})
		} 

		if(left && !goingRight) {
			enemy.forEach((e, i) => {
				enemy[i] += width - 1;
				direction = 1;
				goingRight = true;
			})
		} 

		enemy = enemy.map(i => i + direction);

		draw();

		enemy.forEach(i => {
			if(boxes[i].classList.contains('gun')) {
				clearInterval(enemyInterval);
				resEl.textContent = 'GAME OVER';
				resEl.style.color = 'red';
			}
		});

		//display res
		if(enemyRemoves.length === enemy.length) {
			resEl.textContent = 'YOU WIN';
			resEl.style.color = '#00dd00';
		}
	}
	enemyInterval = setInterval(moveEnemy, 600);

	// Move shooter
	function moveShooter(e) {
		boxes[currentSooterIndex].classList.remove('gun');
		switch(e.keyCode) {
			case 39:
				if(currentSooterIndex % width < width -1) currentSooterIndex += 1;
				break;
			case 37:
				if(currentSooterIndex % width !== 0) currentSooterIndex -= 1;
				break;
		};
		boxes[currentSooterIndex].classList.add('gun');
	};
	document.addEventListener('keydown', moveShooter);


	// Shoot bullet
	function shoot(e) {
		let bulletInterval;
		let currentBulletIndex = currentSooterIndex;
		
		if(currentBulletIndex <= 0) {
			console.log('currentBulletIndex');
			clearInterval(bulletInterval)
		}

		function moveBullet() {
			boxes[currentBulletIndex].classList.remove('bullet');
			currentBulletIndex -= width;
			boxes[currentBulletIndex].classList.add('bullet');

			if(boxes[currentBulletIndex].classList.contains('enemy')) {
				boxes[currentBulletIndex].classList.remove('enemy', 'bullet');
				boxes[currentBulletIndex].classList.add('boom');
				score++;
				scoreEl.textContent = score;
				setTimeout(() => boxes[currentBulletIndex].classList.remove('boom'), 300);
				clearInterval(bulletInterval);

				const enemyRemoveId = enemy.indexOf(currentBulletIndex);
				enemyRemoves.push(enemyRemoveId);
				console.log(enemyRemoves);
			}
		}



		switch(e.keyCode) {
			case 32:
			case 38:
				bulletInterval = setInterval(() => {
					if(!(currentBulletIndex < 0)) {
						moveBullet();
					}
				}, 100);
				break;
		}
	}
	document.addEventListener('keydown', shoot);
	btn.addEventListener('click', () => window.location.reload());

}