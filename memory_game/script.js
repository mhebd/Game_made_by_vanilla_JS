{
	const playground = document.getElementById('playground');
	const scoreEl = document.getElementById('score');
	const missEl = document.getElementById('miss');
	const leftEl = document.getElementById('left');
	const btnEl = document.getElementById('reset');

	let cards = [
		{
			name: 'dinosaur1',
			img: 'icon/dinosaur1.png'
		},
		{
			name: 'dinosaur1',
			img: 'icon/dinosaur1.png'
		},
		{
			name: 'dinosaur2',
			img: 'icon/dinosaur2.png'
		},
		{
			name: 'dinosaur2',
			img: 'icon/dinosaur2.png'
		},
		{
			name: 'dinosaur3',
			img: 'icon/dinosaur3.png'
		},
		{
			name: 'dinosaur3',
			img: 'icon/dinosaur3.png'
		},
		{
			name: 'dinosaur4',
			img: 'icon/dinosaur4.png'
		},
		{
			name: 'dinosaur4',
			img: 'icon/dinosaur4.png'
		},
		{
			name: 'dinosaur5',
			img: 'icon/dinosaur5.png'
		},
		{
			name: 'dinosaur5',
			img: 'icon/dinosaur5.png'
		},
		{
			name: 'dinosaur6',
			img: 'icon/dinosaur6.png'
		},
		{
			name: 'dinosaur6',
			img: 'icon/dinosaur6.png'
		},
	];
	cards = cards.sort(() => .5 - Math.random());

	let chosenCards = [];
	let score = 0;
	let miss = 0;
	let tryLeft = 12;
	leftEl.textContent = tryLeft;

	function displayCard() {
		cards.forEach((card, i) => {
			let img = document.createElement('img');
			img.setAttribute('src', 'icon/flip.png');
			img.setAttribute('data-id', i);
			img.addEventListener('click', flipCard);
			playground.appendChild(img);
		})
	};

	function checkMatch() {
		tryLeft--;
		if(chosenCards[0].name === chosenCards[1].name) {
			score++;
			chosenCards.forEach(card => {
				const matchImg = playground.querySelector(`img[data-id="${card.id}"]`);
				matchImg.setAttribute('src', 'icon/clapping.png');
				matchImg.style.background = '#fff';
			});
			scoreEl.textContent = score;
		} else {
			miss++;
			chosenCards.forEach(card => {
				playground.querySelector(`img[data-id="${card.id}"]`).setAttribute('src', 'icon/flip.png');
			});
			missEl.textContent = miss;
		};

		if(score === (cards.length / 2)) {
			alert('Congratulation! You won the game.');
			btnEl.style.display = 'inline-block';
		}
		chosenCards = [];
		leftEl.textContent = tryLeft;
	}

	function flipCard(e) {
		if(tryLeft > 0) {
			const cardId = this.dataset.id;
			this.setAttribute('src', cards[cardId].img);
			chosenCards.push({
				name: cards[cardId].name,
				id: cardId
			});

			if(chosenCards.length === 2) {
				setTimeout(checkMatch, 500)
			};
		} else {
			alert('Yon loss the game.! Reset & try again.');
			btnEl.style.display = 'inline-block';
		}
	};

	btnEl.addEventListener('click', () => window.location.reload());

	displayCard();
}
