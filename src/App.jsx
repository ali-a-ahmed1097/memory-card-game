import React from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import shuffle from './knuth-fisher-yates-shuffle';

export default function App() {
    const [data, setData] = React.useState([]);
    const [score, setScore] = React.useState(0);
    const [level, setLevel] = React.useState(1);
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        async function getMonsters() {
            let response = await fetch('https://botw-compendium.herokuapp.com/api/v2/category/monsters')
            let res = await response.json();
            setData(res.data.slice(0, (2 * level) + 2));
        }

        getMonsters();

    }, [level]);

    function shuffleCards() {
        setData(shuffle(data));
        setCards(data.map(card => <Card key={card.id} name={card.name} image={card.image} shuffle={shuffleCards} />));
    }

    React.useEffect(() => {
        setCards(data.map(card => <Card key={card.id} name={card.name} image={card.image} shuffle={shuffleCards} />));
    }, [data]);

    // const cards = data.map((card, index) => <Card key={index} index={index} data={data} shuffle={shuffleCards} />);

    return (
        <div>
            <Header score={score} />
            <button onClick={() => setLevel(l => l + 1)}>Increase level</button>
            <div>Choose your next Monster! Level {level}</div>
            <div className="cards">
                {cards}
            </div>
        </div>
    );
}