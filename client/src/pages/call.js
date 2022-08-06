import { VideoPlayer } from './../components/video-player';
import { EEGGraphs } from './../components/EEG-graphs';
import { PersonDetector } from './../components/person-detector';
import { ModelControls } from './../components/model-controls';
import React, { useEffect, useState } from "react";
import microphone from "../assets/microphone.svg"
import bheart from "../assets/brokenheart.svg"
import chatbubble from "../assets/chatbubble.svg"
import '../assets/call.css'
import '../assets/index.css'

import { Peer } from "peerjs";
import { io } from 'socket.io-client'

import * as  datastreams from 'datastreams-api'
import ganglion from "@brainsatplay/ganglion"
import muse from "@brainsatplay/muse"

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

const dataDevices = new datastreams.DataDevices()
dataDevices.load(ganglion)
dataDevices.load(muse)

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
        createGraph("red", "myChart1");
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
            dropdownTip.style.display = "block";
            document.dropdownTip.style.animationName = "example";
        }, 2500)
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
            alert("model is not ready. please wait.")
            return;
        }


        // getUsermedia parameters.
        const constraints = {
            video: true
        };

        video_client_analysis.style.width = "100%";
        video_client_analysis.style.objectFit = "cover";
        predictWebcam();

    }


    function handleChange(e) {
        console.log(e.target.value);
        dataDevices.getUserDevice({
            label: e.target.value, // declare which device you want to connect to (e.g. 'device', 'ganglion', 'muse')
        }).then(device => {
            console.log("success");
        })
    }




    return (
        <React.Fragment>
            <div id="div-dashboard-regular" style={{ height: "100%", display: 'flex' }}>
                <div id="div-dashboard-inner-regular-left" style={{ width: "60%", height: "100%", display: "flex", backgroundColor: "white", flexFlow: "wrap", justifyContent: "center" }}>
                    <div style={{ display: "flex", width: "100%", height: "50%", margin: "10px", justifyContent: "space-between" }}>
                        <ModelControls enableCam={enableCam} />
                        <PersonDetector />
                    </div>
                    <EEGGraphs />
                </div>
                <VideoPlayer host={host} room_id={room_id} mute={mute} microphone={microphone} bheart={bheart} chatbubble={chatbubble} />
            </div >
        </React.Fragment >

    )
}

export default CallPage;