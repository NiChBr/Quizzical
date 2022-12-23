import React from "react";
import he from "he";

export default function Answer(props) {
    return (
    <div className="Answer">
        <div className="left">Question: {he.decode(props.question)}</div>
        <div className="right">
        <div>Correct Answer: {he.decode(props.correctAnswer)}</div>
        <div>Your Answer: {props.selectedAnswer ? he.decode(props.selectedAnswer) : ""}</div>
        </div>
    </div>
    )
}