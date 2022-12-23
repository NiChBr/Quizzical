import React from "react";

export default function Setup(props) {
    return (
        <div className="Setup">
          <div className="Setup--item">
            <label htmlFor="numPlayers">Number of players?</label>
            <select value={props.setup.numberOfPlayers} onChange={props.handleChange} name="numberOfPlayers" id="numPlayers">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="Setup--item">
            <label htmlFor="difficulty">Difficulty?</label>
            <select value={props.setup.difficulty} onChange={props.handleChange} name="difficulty" id="difficulty">
              <option value="">random</option>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          <div className="Setup--item">
            <label htmlFor="numRounds">Number of rounds?</label>
            <select value={props.setup.numberOfRounds} onChange={props.handleChange} name="numberOfRounds" id="numRounds">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <button onClick={props.handleClick}>Start playing</button>
        </div>
    )
}