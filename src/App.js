import { useEffect, useState, useRef } from 'react';
import CardDeck from './CardDeck';
import './App.css';

function App() {
	const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

	const [deck, setDeck] = useState(null);
	const [cards, setCards] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const draw = useRef();

	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => setDeck(data.deck_id));
	}, []);

	const drawCard = () => {
		fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (cards.length === 52 || data.remaining === 0) {
					setGameOver(true);
					clearInterval(draw.current);
				}
				setCards([data.cards[0]]);
			});
	};

	const keepDrawing = () => {
		draw.current = setInterval(() => {
			drawCard();
		}, 1000);
	};

	const stopDrawing = () => {
		clearInterval(draw.current);
	};

	console.log(deck);

	return (
		<div className='App'>
			<button className='draw' onClick={drawCard}>
				Draw Card
			</button>
			<button className='keep-drawing' ref={draw} onClick={keepDrawing}>
				Keep Drawing
			</button>
			<button className='stop' onClick={stopDrawing}>
				Stop Drawing
			</button>
			{gameOver && <h1>Game Over</h1>}
			<CardDeck cards={cards} />
		</div>
	);
}

export default App;
