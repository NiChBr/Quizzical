import React from "react";

export default function Round(props) {
    return (
    <div>
        <h3>Round {props.index}</h3>
        {props.children}
    </div>)
}