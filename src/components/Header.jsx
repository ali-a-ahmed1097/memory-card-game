import React from "react";

export default function Header(props) {
    return (
        <div className="header">
            <h1>Hyrule Monster Memory Game</h1>
            <div className="score">Score: {props.score} | Best: {props.best}</div>
        </div>
    );
}