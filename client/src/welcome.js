import React from "react";

export default function Canvas(props) {
    return (
        <div className="welcome">
            <div className="welcome_text">
                <h1>Welcome!</h1>
                <h2>.</h2>
                <p>!titel</p>

                <button onClick={props.confirm}>Cool, let&apos;s go!</button>
            </div>
        </div>
    );
}
