import React from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import shuffle from './knuth-fisher-yates-shuffle';

export default function App() {
    const [data, setData] = React.useState([]);
    const [score, setScore] = React.useState(0);
    const [best, setBest] = React.useState(0);
    const [level, setLevel] = React.useState(1);
    const [moves, setMoves] = React.useState([]);

    React.useEffect(() => {
        async function getMonsters() {
            let response = await fetch('https://botw-compendium.herokuapp.com/api/v2/category/monsters')
            let res = await response.json();
            setData(res.data.slice(0, (2 * level) + 2));
        }

        getMonsters();

    }, [level]);

    function play(id) {
        if (moves.includes(id)) { // Player failed, reset game
            setLevel(1);
            setScore(0);
            setMoves([]);
        } else {
            setMoves(oldMoves => [...oldMoves, id]);
            setScore(oldScore => oldScore + 1);
            setBest(oldBest => score > oldBest ? score : oldBest);
        }

        if (moves.length === cards.length - 1) { // Moves does not get updated fast enough so we have to do this...
            setLevel(oldLevel => oldLevel + 1);
            setMoves([]);
        }

        shuffleCards();
    }
    
    function shuffleCards() {
        setData(shuffle(data));
    }

    const cards = data.map(card => <Card key={card.id} name={card.name} image={card.image} play={() => play(card.id)} />);

    return (
        <div>
            <Header score={score} best={best} />
            <div className="level">Choose your next Monster! Level {level}</div>
            <div className="cards">
                {cards}
            </div>
        </div>
    );
}