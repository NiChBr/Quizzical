import React from "react";
import Player from "./Player";
import Round from "./Round";
import Answer from "./Answer";

export default function EndView(props) {
    
    function writePlayerResults(player, index) {

        console.log(player.rounds[0])

    return (
        <Player index={parseInt(index +1)}>
            {player.rounds.map((round, i) =>             
            <Round index={parseInt(i+1)}>
                {round.questions.map(item => <Answer question={item.question} correctAnswer={item.correctAnswer.answer} selectedAnswer={item.selectedAnswer ? item.selectedAnswer.answer : ""}/>)}
            </Round>)}
        </Player>
        )
    }






    return (
        <div className="Results">
            <h1>Results</h1>
            {props.players.map((player, index) => writePlayerResults(player, index))}
            <button onClick={props.handleClick}>Show winner</button>
        </div>
    )
}