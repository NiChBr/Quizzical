import React from "react";

export default function Player(props) {

return (
    <div className="Player">
        <h2>Player {props.index}</h2>
        {props.children}
    </div>
    )

}