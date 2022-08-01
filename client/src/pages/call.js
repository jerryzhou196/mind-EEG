import React, { useEffect, useState } from "react";
import microphone from "../assets/microphone.svg"
import bheart from "../assets/brokenheart.svg"
import chatbubble from "../assets/chatbubble.svg"
import '../assets/call.css'
import '../assets/index.css'

import { Peer } from "peerjs";
import { io } from 'socket.io-client'

import queryString from 'query-string';



// import Plot from 'react-plotly.js';

import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
} from 'chart.js';

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
);

require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocoSsd = require('@tensorflow-models/coco-ssd');

// function EEGGraph() {
//     var arrayLength = 30;
//     const [newArray, changeData] = useState([]);

//     useEffect(() => {
//         for (var i = 0; i < arrayLength; i++) {
//             var y = Math.round(Math.random() * 10) + 1
//             newArray[i] = y
//             changeData(newArray);
//         }
//         var cnt = 0;
//         var interval = setInterval(function () {

//             var y = Math.round(Math.random() * 10) + 1
//             changeData(newArray.concat(y));
//             changeData(newArray.splice(0, 1));

//             var data_update = {
//                 y: [newArray]
//             };

//             if (cnt === 100) clearInterval(interval);
//         }, 500);
//     })

//     var margins = {
//         l: 0,
//         r: 0,
//         b: 0,
//         t: 0,
//     }

//     return (
//         <Plot
//             data={[
//                 {
//                     y: newArray,
//                     type: 'lines',
//                     line: { color: '#80CAF6' },
//                 },
//             ]}
//             config={{
//                 responsive: true
//             }
//             }
//             layout={{ title: 'A Fancy Plot', responsive: true, width: 500, height: 250, margin: margins }}
//         />
//     );
// }

const CallPage = () => {
    const [muted, setMute] = useState(false);
    const [personVisible, setpersonVisible] = useState(false);
    const { room } = queryString.parse(window.location.search);
    const room_id = room;


    var segments = window.location.href.split("/");
    segments.pop();
    const host = segments.join("/");
    // console.log(host)
    useEffect(() => {
        if (personVisible) {
            console.log("person detected!");
            document.getElementById("personDetected").style.backgroundColor = "rgb(116, 225, 140)"
        } else {
            document.getElementById("personDetected").style.backgroundColor = "gray"
        }
    }, [personVisible])




    var myVideoStream;

    function addData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }

    function removeData(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.splice(0, 1);
        });
        chart.update();
    }

    function createGraph(color, divname) {
        var xValues = [];
        var yValues = [];
        var x = 0;
        var y = 0;
        var count = 0;

        const chart1 = new Chart(divname, {
            type: "line",
            data: {
                datasets: [{
                    fill: false,
                    borderColor: color,
                    lineTension: 0,
                    data: yValues
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: false,
                },
                legend: {
                    display: false,
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    xAxes: {
                        display: false
                    },
                    y: {
                        max: 4,
                        min: -4,
                    }

                }
            }
        });

        for (var x = 0; x < 200; x++) {
            x += (Math.random() * 0.1);
            y = Math.sin(x * 180 / (Math.PI));
            addData(chart1, x, y);
        }

        setInterval(() => {
            removeData(chart1);
            x += (Math.random() * 0.1);
            y = Math.sin(x * 180 / (Math.PI));
            addData(chart1, x, y);
        }, 500)

    }

    function mute() {
        document.getElementById("novideo-reflection").muted = (muted) ? false : true;
        if (muted) {
            document.getElementById("microphone").style.backgroundColor = "rgb(255, 0, 122)";
        } else {
            document.getElementById("microphone").style.backgroundColor = "#636669";

        }
        setMute(!muted)
    }

    function video() {
        document.getElementById("novideo-reflection").muted = (muted) ? false : true;
        if (muted) {
            document.getElementById("microphone").style.backgroundColor = "rgb(255, 0, 122)";
        } else {
            document.getElementById("microphone").style.backgroundColor = "#636669";

        }
        setMute(!muted)
    }


    useEffect(() => {
        createGraph("blue", "myChart2");
        createGraph("yellow", "myChart3");
        createGraph("purple", "myChart4");
        createGraph("green", "myChart5");
        createGraph("brown", "myChart6");

        const peer = new Peer();
        const socket = io();


        function addVideoStream(stream, id) {
            var video = document.getElementById(id);
            video.srcObject = stream;

            video.addEventListener("loadedmetadata", () => {
                video.play();
            })
        }


        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {

                addVideoStream(stream, "novideo-reflection");

                //if our socket says a user connected, we create the peer connection to that userID
                //WARNING: this is emitted to everyone except the person who just joined
                socket.on("userconnected", (id) => {
                    console.log("someone answered our link! calling them.")
                    const answer = peer.call(id, stream);
                    answer.on("stream", (client_stream) => {
                        addVideoStream(client_stream, "webcam");
                    });
                });

                socket.on("goodbye", () => {
                    console.log("someone left");
                })

                peer.on("call", (call) => { //no new connections - just says that if there is a call, we answer it and give the job to addVideoStream
                    call.answer(stream);
                    console.log("getting called!");
                    call.on("stream", (client_stream) => {
                        addVideoStream(client_stream, "webcam");
                    });
                });
            })



        peer.on('open', (id) => {
            console.log(id);
            socket.emit("userjoined", room_id, id);
        });

    }, [])

    useEffect(() => {
        var dropdownTip = document.getElementById("div-dropdown-copylink");
        dropdownTip.style.display = "none";

        setTimeout(() => {
            document.dropdownTip.style.animation = "none";
        }, 1000)

        setTimeout(() => {
            dropdownTip.style.display = "block";
            document.dropdownTip.style.animation = "example";
        }, 1000)

        setTimeout(() => {
            document.dropdownTip.style.animation = "fadeout 1s"
            document.dropdownTip.style.opacity = "0"
        }, 1000 * 20)
    }, [])

    var model = undefined;

    useEffect(() => {
        cocoSsd.load().then(function (loadedModel) {
            model = loadedModel;
            // Show demo section now model is ready to use.
            document.getElementById("modelprocessingstatus").style.backgroundColor = "#74E18C";
        });
    })

    // const video_client = document.getElementById('novideo-reflection');
    // function predictWebcam() {
    //     // Now let's start classifying the stream.
    //     model.detect(video_client).then(function (predictions) {
    //         // Remove any highlighting we did previous frame.
    //         for (let i = 0; i < children.length; i++) {
    //             liveView.removeChild(children[i]);
    //         }
    //         children.splice(0);

    //         // Now lets loop through predictions and draw them to the live view if
    //         // they have a high confidence score.
    //         for (let n = 0; n < predictions.length; n++) {
    //             // If we are over 66% sure we are sure we classified it right, draw it!
    //             if (predictions[n].score > 0.66) {
    //                 const p = document.createElement('p');
    //                 p.innerText = predictions[n].class + ' - with '
    //                     + Math.round(parseFloat(predictions[n].score) * 100)
    //                     + '% confidence.';
    //                 // Draw in top left of bounding box outline.
    //                 p.style = 'left: ' + predictions[n].bbox[0] + 'px;' +
    //                     'top: ' + predictions[n].bbox[1] + 'px;' +
    //                     'width: ' + (predictions[n].bbox[2] - 10) + 'px;';

    //                 // Draw the actual bounding box.
    //                 const highlighter = document.createElement('div');
    //                 highlighter.setAttribute('class', 'highlighter');
    //                 highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
    //                     + predictions[n].bbox[1] + 'px; width: '
    //                     + predictions[n].bbox[2] + 'px; height: '
    //                     + predictions[n].bbox[3] + 'px;';

    //                 liveView.appendChild(highlighter);
    //                 liveView.appendChild(p);

    //                 // Store drawn objects in memory so we can delete them next time around.
    //                 children.push(highlighter);
    //                 children.push(p);
    //             }
    //         }

    //         // Call this function again to keep predicting when the browser is ready.
    //         window.requestAnimationFrame(predictWebcam);
    //     });
    // }

    var model = undefined;
    var video_client_analysis;
    var liveView;
    var children = [];

    useEffect(() => {
        video_client_analysis = document.getElementById('webcam');
        liveView = document.getElementById('liveView');
    })

    // Prediction loop!
    function predictWebcam() {
        var rect = video_client_analysis.getBoundingClientRect();
        var topOffset = rect.top;
        var leftOffset = rect.left;
        // Now let's start classifying the stream.
        model.detect(video_client_analysis).then(function (predictions) {
            // Remove any highlighting we did previous frame.
            for (let i = 0; i < children.length; i++) {
                liveView.removeChild(children[i]);
            }
            children.splice(0);

            // Now lets loop through predictions and draw them to the live view if
            // they have a high confidence score.
            for (let n = 0; n < predictions.length; n++) {
                // If we are over 66% sure we are sure we classified it right, draw it!
                if (predictions[n].class == "person") {
                    setpersonVisible(true);
                } else {
                    setpersonVisible(false);
                }
                if (predictions[n].score > 0.66 && predictions[n].class == "person") {
                    const p = document.createElement('p');

                    p.innerText = predictions[n].class + ' - with '
                        + Math.round(parseFloat(predictions[n].score) * 100)
                        + '% confidence.';
                    // Draw in top left of bounding box outline.
                    p.style = 'left: ' + (predictions[n].bbox[0] + leftOffset) + 'px;' +
                        'top: ' + (predictions[n].bbox[1] + topOffset) + 'px;' +
                        'width: ' + (predictions[n].bbox[2] - 10) + 'px;';

                    // Draw the actual bounding box.
                    const highlighter = document.createElement('div');
                    highlighter.setAttribute('class', 'highlighter');
                    highlighter.style = 'left: ' + (predictions[n].bbox[0] + leftOffset) + 'px; top: '
                        + (predictions[n].bbox[1] + topOffset) + 'px; width: '
                        + (predictions[n].bbox[2]) + 'px; height: '
                        + predictions[n].bbox[3] + 'px;';

                    liveView.appendChild(highlighter);
                    liveView.appendChild(p);

                    // Store drawn objects in memory so we can delete them next time around.
                    children.push(highlighter);
                    children.push(p);
                }
            }

            // Call this function again to keep predicting when the browser is ready.
            window.requestAnimationFrame(predictWebcam);
        });
    }

    function enableCam() {
        if (!model) {
            console.log("model is not yet ready");
            return;
        }


        console.log("hello");
        // getUsermedia parameters.
        const constraints = {
            video: true
        };

        video_client_analysis.style.width = "100%";
        video_client_analysis.style.objectFit = "cover";
        predictWebcam();

    }




    return (
        <React.Fragment>

            <div id="div-dashboard-regular" style={{ height: "100%", display: 'flex' }}>
                <div id="div-dashboard-inner-regular-left" style={{ width: "60%", height: "100%", display: "flex", backgroundColor: "white", flexFlow: "wrap", justifyContent: "center" }}>

                    <div id="div-model-processing">
                        <div className="status-text-big" id="big"> Object Tracking </div>
                        <div className="div-status-container" style={{ width: "100%" }}>
                            <div id="div-status-model" className="status-text-small" > Model Processing Status:  </div>
                            <div id="modelprocessingstatus" className="status-light-green"></div>
                        </div>
                        <span style={{ fontSize: "10px", fontFamily: "SF-pro-regular", textAlign: "center", width: "100%" }}>
                            NOTE: Activate Image Tracker button can only be pressed <br>
                            </br> after Model is finished processing</span>

                        <button id="activate-image-button" onClick={enableCam}> Activate Image Tracker</button>

                    </div>
                    <div id="div-EEG-person-detector">
                        <div className="status-text-big" id="big"> Person Tracking </div>

                        <div className="div-status-container" style={{ width: "100%" }}>
                            <div id="div-status-person" className="status-text-small"> Person Detected in Camera:  </div>
                            <div id="personDetected" className="status-light-green"></div>
                        </div>

                        <div className="div-status-container" style={{ width: "100%" }}>
                            <div id="div-status-person" className="status-text-small" > Lighting Conditions:  </div>
                            <div className="status-light-green"></div>

                        </div>
                    </div>



                    <div id="div-EEG-graph-container">
                        <div id="div-dashboard-inner-regular-header"> EEG Readings </div>
                        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "0.5vw", marginTop: "0.5vw" }}>
                            <select id="select-eeg-novalue" defaultValue={"nice"} className="option-eeg">
                                <option value="nice" id="placeholder" disabled> </option>
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
                    </div>



                </div>

                <div id="div-dashboard-inner-regular-right" style={{ width: '40%', height: "100%", display: "flex", justifyContent: "center", backgroundColor: "#303030", flexFlow: "wrap" }}>
                    <div id="div-dropdown-copylink" style={{ width: "400px", height: "50px", display: "none", borderRadius: "5px", position: "fixed", top: "20px" }}>
                        <div id="span-dropdown-copylink"> Press Here to Copy Join Link: <div id="div-dropdown-copylink-button" onClick={() => {
                            navigator.clipboard.writeText(`${host}/?room=${room_id}`);
                        }}> COPY </div>  </div>
                    </div>





                    <div style={{ width: '95%', height: '90%', display: 'flex', alignItems: 'center', flexFlow: "wrap", flexDirection: "row-reverse", marginTop: "70px" }} id="div-video-regular">
                        <video style={{ width: '190px', height: "190px", borderRadius: "5px", objectFit: 'cover', backgroundColor: "black" }} id="novideo-reflection" />
                        <div id="object-detector-wrapper" style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                            <div id="liveView" className="videoView">
                                <video id="webcam" autoPlay style={{ width: "100%" }}></video>
                            </div>
                        </div>
                        {/* <video style={{ width: '100%', marginBottom: '150px', backgroundColor: "black", objectFit: "cover" }} id="novideo-patient" /> */}
                    </div>

                    <div id="videocontrols" style={{ zoom: "120%" }} >
                        <button id="microphone" className="videocontrol-button" onClick={mute}>
                            <img style={{ width: "15px", marginTop: "3px" }} src={microphone} />
                        </button>
                        <button id="chat" className="videocontrol-button">
                            <img style={{ width: "20px", marginTop: "3px" }} src={bheart} />
                        </button>
                        <button style={{ backgroundColor: "#FF007A" }} className="videocontrol-button">
                            <img style={{ width: "20px", marginTop: "5px" }} src={chatbubble} />
                        </button>
                    </div>
                </div>
            </div >
        </React.Fragment >

    )
}

export default CallPage;