import React from "react";

export default function Card(props) {
    return (
        <div className="card" onClick={() => props.play(props.id)}>
            <img src={props.image} />
            <div className="card-name">{props.name}</div>
        </div>
    );
}