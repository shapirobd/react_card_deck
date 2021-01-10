import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

const Deck = () => {
	const [autoDraw, setAutoDraw] = useState(false);
	const [deck, setDeck] = useState(null);
	const [drawn, setDrawn] = useState([]);
	const [started, setStarted] = useState(false);
	const [timesRestarted, setTimesRestarted] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const timerRef = useRef(null);

	useEffect(() => {
		async function getCards() {
			const resp = await axios.get(`${BASE_URL}/new/shuffle/`);
			setDeck(resp.data);
		}
		getCards();
	}, [setDeck, timesRestarted]);

	useEffect(() => {
		async function draw() {
			const { deck_id } = deck;
			try {
				const resp = await axios.get(`${BASE_URL}/${deck_id}/draw/`);
				console.log(resp.data.remaining);
				if (resp.data.remaining === 0) {
					setAutoDraw(false);
					setGameOver(true);
					throw new Error("no cards remaining!");
				}
				const card = resp.data.cards[0];
				setDrawn((d) => [
					...d,
					{
						id: card.code,
						name: card.value + "" + card.suit,
						image: card.image,
					},
				]);
			} catch (e) {
				alert(e);
			}
		}
		if (autoDraw && !timerRef.current) {
			timerRef.current = setInterval(async () => {
				setStarted(true);
				await draw();
			}, 1000);
		}
		return () => {
			clearInterval(timerRef.current);
			timerRef.current = null;
		};
	}, [setAutoDraw, autoDraw, deck]);

	const toggleAutoDraw = () => {
		setAutoDraw((auto) => !auto);
	};

	const restartGame = () => {
		setDrawn([]);
		setTimesRestarted((r) => r + 1);
		if (gameOver) {
			setGameOver(false);
		}
	};

	const cards = drawn.map((card) => {
		return <Card key={card.id} name={card.name} image={card.image} />;
	});

	return (
		<div className="Deck">
			{!gameOver && (
				<button className="Deck-btn" onClick={toggleAutoDraw}>
					{autoDraw ? "Stop" : "Start"} Drawing
				</button>
			)}
			{started && (
				<button className="Deck-btn" onClick={restartGame}>
					Restart
				</button>
			)}
			<div className="Deck-cards">{cards}</div>
		</div>
	);
};

export default Deck;
