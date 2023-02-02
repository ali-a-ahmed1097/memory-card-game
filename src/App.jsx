import React from "react";
import Header from "./components/Header";

export default function App() {
    const [data, setData] = React.useState([]);
    const [score, setScore] = React.useState(0);

    React.useEffect(() => {
        fetch('https://botw-compendium.herokuapp.com/api/v2/category/monsters')
        .then(response => response.json())
        .then(response => setData(response.data));
    }, []);

    return (
        <div>
            <Header score={score} />
        </div>
    );
}