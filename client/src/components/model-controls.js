import React from "react";
export function ModelControls({
    enableCam
}) {
    return <div id="div-model-processing" style={{
        width: "50%",
        height: "100%",
        alignContent: "center",
        zoom: "120%"
    }}>
        <div className="status-text-big" id="big" style={{
            margin: "2vw"
        }}> Object Tracking </div>
        <div className="div-status-container" style={{
            width: "100%",
            height: "fit-content",
            margin: "2vw"
        }}>
            <div id="div-status-model" className="status-text-small"> Model Processing Status:  </div>
            <div id="modelprocessingstatus" className="status-light-green"></div>
        </div>
        <span style={{
            fontSize: "10px",
            fontFamily: "SF-pro-regular",
            textAlign: "center",
            width: "100%",
            margin: "2vw"
        }}>
            NOTE: Activate Image Tracker button can only be pressed <br>
            </br> after Model is finished processing and another person is in your call.</span>
        <button id="activate-image-button" onClick={enableCam} style={{
            margin: "2vw"
        }}> Activate Image Tracker</button>
    </div>;
}
