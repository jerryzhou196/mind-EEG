import React, { useEffect, useState } from "react";
import * as  datastreams from 'datastreams-api'
import ganglion from "@brainsatplay/ganglion"
import muse from "@brainsatplay/muse"
import queryString from 'query-string';

const { v4: uniqueID } = require("uuid");




// var ganglion = window.ganglion;
// var muse = window.muse;
// var datastreams = window.datastreams;

const dataDevices = new datastreams.DataDevices()
dataDevices.load(ganglion)
dataDevices.load(muse)

// function UsernameInput() {
//     const [Username, setUsername] = useState('');

//     useEffect(() => {
//         var i = 0;
//         var txt = 'enter your name';
//         var speed = 100;

//         function typeWriter() {
//             if (i < txt.length) {
//                 console.log("test");
//                 console.log("test");
//                 document.getElementById("placeholder").innerHTML = txt.charAt(i);
//                 i++;
//                 setTimeout(typeWriter, speed);
//             }
//         }

//         typeWriter();
//     })

//     return (
//         <input style={{ height: 'min(2.5vw, 60px)', width: '90%', backgroundColor: '#2C2E31', borderRadius: '5px', borderStyle: 'none' }} id="usernameinput" >
//         </input>
//     )
// }

function CallButton({ color, text, textcolor, href }) {
    return (
        <button style={{ width: '40%', backgroundColor: color }} className="square" id="callbutton" onClick={() => { window.location.href = `${href}` }}>
            <span className="text3" style={{ color: textcolor }}> {text} </span>
        </button >
    )
}

function JoinControls() {
    const { room } = queryString.parse(window.location.search);

    useEffect(() => {
        var i = 0;
        var txt = 'choose EEG device';
        var speed = 23;

        function typeWriter() {
            if (i < txt.length) {
                document.getElementById("placeholder").innerHTML += txt.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
    }, [])

    function handleControls(e) {
        console.log(e.target.value);
        dataDevices.getUserDevice({
            label: e.target.value, // declare which device you want to connect to (e.g. 'device', 'ganglion', 'muse')
        }).then(device => {
            console.log("success");
        })
    }



    return (
        <div id="joincontrols">

            <select id="select-eeg-novalue" defaultValue={"nice"} className="option-eeg" onChange={(e) => { handleControls(e) }}>
                <option value="nice" id="placeholder" disabled> </option>
                <option value="muse"> Muse 2</option>
                <option value="ganglion"> Ganglion </option>
                <option value="synthetic"> Synthetic Device</option>

            </select>
            <CallButton color={'#FF007A'} text={"let's call"} textcolor={"#D1D0C5"} href={`/callpage?room=${room}`} />
            <CallButton color={'#FFFFFF'} text={"create account"} textcolor={"#9A9A9D"} />
            <a href="/" style={{ width: "100%", color: "#FF007A", marginTop: "2vw", textDecoration: "unset" }} className="text3"> Sign In </a>
        </div >
    )
}



export default JoinControls;