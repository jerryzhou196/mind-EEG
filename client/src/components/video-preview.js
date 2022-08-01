import React, { useEffect } from 'react';
import transition_gif from '../assets/ezgif.com-gif-maker (3).gif'


const VideoPreview = () => {

    useEffect(() => {
        document.getElementById("lower-container").style.animation = "none !important";

        function addVideoStream(stream, id) {
            var video = document.getElementById(id);
            video.srcObject = stream;


            video.addEventListener("loadedmetadata", () => {
                document.getElementById("lower-container").style.animation = "none";

                console.log("metadata loaded!");
                video.play();
            })
        }

        navigator.mediaDevices
            .getUserMedia({
                video: true,
            })
            .then((stream) => {
                addVideoStream(stream, "video-client-join");
            })
    })

    return (
        <React.Fragment>
            <div id="video-container">
                <video id="video-client-join" style={{ height: "", width: "800px", maxWidth: "800px", borderRadius: "20px", backgroundColor: "black", backgroundColor: "black" }} > </video>
                <img id="loading" style={{ display: 'none' }} src={transition_gif} alt="transition gif" />


            </div>
        </React.Fragment>


    )
}

export default VideoPreview;

