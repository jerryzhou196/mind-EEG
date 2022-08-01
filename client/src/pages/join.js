import React, { Component } from "react";
import '../assets/join.css'
import JoinControls from '../components/join-controls'
import VideoPreview from '../components/video-preview'
import Header from "../components/header"
import queryString from 'query-string';
import '../assets/index.css'

const { v4: uniqueID } = require("uuid");






class Join extends Component {
    constructor() {
        const { room } = queryString.parse(window.location.search);

        if (room == null) {
            window.location.href = `/?room=${uniqueID()}`;
        } else {
            super();
        }
    }



    render() {
        return (
            <React.Fragment>
                <Header></Header>
                <div id="lower-container">
                    <VideoPreview />
                    <JoinControls></JoinControls>
                </div>
            </React.Fragment >
        )
    }
}

export default Join;

