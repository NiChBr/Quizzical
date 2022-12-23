import React from "react";

export default function WinView(props) {

    function calculateWinner(players) {
        const array = []

        for(let i = 0; i < players.length; i++) {
            let count = 0
            const player = players[i]
            for(let j = 0; j < player.rounds.length; j++) {
                const round = player.rounds[j]
                for(let k = 0; k < round.questions.length; k++) {
                    const question = round.questions[k]
                    if(question.correctAnswer.isSelected) {
                        count += 1
                    }
                }
            }
            array.push({player:i, count: count})
            console.log(count)
        }

        const highestCount =  Math.max(...array.map(o => o.count))
        const winner = array.filter(t => t.count === highestCount)
        console.log(winner)

        return <div className="Winner">And the winner is: <h1>{winner.map(t => "Player " + (t.player+1)).join(" And ")}</h1></div>
    }

    calculateWinner(props.players)

    return (
    <div>
        {calculateWinner(props.players)}
        <button onClick={props.newGame}>New Game</button>
        <button onClick={props.setupGame}>Setup</button>
    </div>)

}