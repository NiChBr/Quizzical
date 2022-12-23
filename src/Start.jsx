import React from "react";

export default function Start(props) {
    return (<div className="Start">
          <h1>Quizzical</h1>
          <h2>Test your knowledge!</h2>
          <button onClick={props.handleClick}>Start game</button>
    </div>)
}