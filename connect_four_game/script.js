{
	const playground = document.querySelector('.game-wrap');
	const scoreEl = document.getElementById('score');
	const playerEl = document.getElementById('player');
	const btn = document.querySelector('.btn-wrap button');

	let player = 1;
	let p1Selected = [];
	let p2Selected = [];
	let gameOver = false;
	let matches = [
		[1,2,3,4],
		[5,6,7,8],
		[9,10,11,12],
		[13,14,15,16],
		[1,5,9,13],
		[2,6,10,14],
		[3,7,11,15],
		[4,8,12,16],
		[1,6,11,16],
		[4,7,10,13]
	];

	(function(){
		for(let i = 1; i <= 16; i++) {
			const div = document.createElement('div');
			div.classList.add('item');
			div.setAttribute('data-id', i);
			div.addEventListener('click', selectCard);
			playground.appendChild(div);
		}
	})();

	function checkMatch(selects) {
		return matches.some(match => {
			return match.every(id => selects.includes(id));
		});
	}

	function selectCard(e) {
		if(gameOver) {
			alert('Game Over! Restart Game to play again.');
			return;
		}
		const card = e.target;
		const id = this.dataset.id * 1;
		if(card.classList.contains('taken')) {
			alert('This card is taken');
			return;
		}
		if(player === 1) {
			card.classList.add('player-1', 'taken');
			card.textContent = 'X';
			p1Selected.push(id);
			if(p1Selected.length === 4) {
				const res = checkMatch(p1Selected);
				if(res) {
					scoreEl.textContent = 'Player One Win!';
					gameOver = true;
				} else {
					scoreEl.textContent = 'Player One Loss!';
				}
			}
			player = 2;
		} else if(player === 2) {
			card.classList.add('player-2', 'taken');
			card.textContent = 'O';
			p2Selected.push(id);
			if(p2Selected.length === 4) {
				const res = checkMatch(p2Selected);
				if(res) {
					scoreEl.textContent = 'Player Two Win!';
					gameOver = true;
				} else {
					scoreEl.textContent = 'Player Two Loss!';
					gameOver = true;
				}
			}
			player = 1;
		}
		playerEl.textContent = player == 1 ? 'One' : 'Two';
		gameOver ? btn.style.display = 'inline-block' : null;
	}

	btn.addEventListener('click', () => window.location.reload() );
}
