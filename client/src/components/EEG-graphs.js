import React from "react";
export function EEGGraphs({
    e,
    handleChange
}) {
    return <div id="div-EEG-graph-container" style={{
        height: "44%",
        width: "100%"
    }}>
        <div id="div-dashboard-inner-regular-header"> EEG Readings </div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: "0.5vw",
            marginTop: "0.5vw"
        }}>
            <select id="select-eeg-novalue" defaultValue={"synthetic"} className="option-eeg">
                <option value="muse"> Muse 2</option>
                <option value="ganglion"> Ganglion </option>
                <option value="synthetic"> Synthetic Device</option>
            </select>
        </div>


        <div className="div-EEG-graph"> <canvas id="myChart6"></canvas> </div>
        <div className="div-EEG-graph"> <canvas id="myChart5"></canvas> </div>
        <div className="div-EEG-graph"> <canvas id="myChart4"></canvas> </div>
        <div className="div-EEG-graph"> <canvas id="myChart3"></canvas> </div>
        <div className="div-EEG-graph"> <canvas id="myChart2"></canvas> </div>
        <div className="div-EEG-graph"> <canvas id="myChart1"></canvas> </div>

    </div>;
}
