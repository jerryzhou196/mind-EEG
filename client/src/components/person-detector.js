import React from "react";
export function PersonDetector({ }) {
    return <div id="div-EEG-person-detector" style={{
        width: "50%",
        height: "100%",
        alignContent: "center"
    }}>
        <div className="status-text-big" id="big" style={{
            margin: "2vw",
            fontSize: "2.4vw"
        }}> Person Tracking </div>

        <div className="div-status-container" style={{
            width: "100%",
            margin: "4vw"
        }}>
            <div id="div-status-person" className="status-text-small"> Person Detected in Camera:  </div>
            <div id="personDetected" className="status-light-green"></div>
        </div>

        <div className="div-status-container" style={{
            width: "100%",
            margin: "4vw"
        }}>
            <div id="div-status-person" className="status-text-small"> Lighting Conditions:  </div>
            <div className="status-light-green"></div>

        </div>
    </div>;
}
