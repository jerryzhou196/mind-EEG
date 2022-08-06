import React from "react";
export function VideoControls({
    mute,
    microphone,
    bheart,
    chatbubble
}) {
    return <div id="videocontrols" style={{
        zoom: "120%"
    }}>
        <button id="microphone" className="videocontrol-button" onClick={mute}>
            <img style={{
                width: "15px",
                marginTop: "3px"
            }} src={microphone} />
        </button>
        <button id="chat" className="videocontrol-button">
            <img style={{
                width: "20px",
                marginTop: "3px"
            }} src={bheart} />
        </button>
        <button style={{
            backgroundColor: "#FF007A"
        }} className="videocontrol-button">
            <img style={{
                width: "20px",
                marginTop: "5px"
            }} src={chatbubble} />
        </button>
    </div>;
}
