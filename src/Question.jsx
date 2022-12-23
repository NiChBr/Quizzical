import React from "react";
import he from "he";

export default function Question(props) {    
    return (
        <div className="Question">
            <div className="left">{he.decode(props.question)}</div>
            <div className="right">
                {props.children}
            </div>
        </div>
    )
}