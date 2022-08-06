import React from "react";
import { VideoControls } from './../components/video-controls';

export function VideoPlayer({
    host,
    room_id,
    mute,
    microphone,
    bheart,
    chatbubble
}) {
    return <div id="div-dashboard-inner-regular-right" style={{
        width: '40%',
        height: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#303030",
        flexFlow: "wrap"
    }}>
        <div id="div-dropdown-copylink" style={{
            width: "35vw",
            height: "50px",
            display: "none",
            borderRadius: "5px",
            position: "fixed",
            top: "20px"
        }}>
            <div id="span-dropdown-copylink"> Press Here to Copy Join Link: <div id="div-dropdown-copylink-button" onClick={() => {
                navigator.clipboard.writeText(`${host}/callpage?room=${room_id}`);
            }}> COPY </div>  </div>
        </div>

        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: "flex-end",
            alignItems: 'flex-end'
        }} id="div-video-reflection">
            <video style={{
                width: '190px',
                height: "190px",
                borderRadius: "5px",
                objectFit: 'cover',
                backgroundColor: "black"
            }} id="novideo-reflection" />
        </div>
        <div style={{
            width: '95%',
            height: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            flexFlow: "wrap",
            flexDirection: "row-reverse",
            marginTop: "70px"
        }} id="div-video-regular">
            <div id="object-detector-wrapper" style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px"
            }}>
                <div id="liveView" className="videoView">
                    <video id="webcam" autoPlay style={{
                        width: "100%"
                    }}></video>
                </div>
            </div>
            {
                /* <video style={{ width: '100%', marginBottom: '150px', backgroundColor: "black", objectFit: "cover" }} id="novideo-patient" /> */
            }
        </div>

        <VideoControls mute={mute} microphone={microphone} bheart={bheart} chatbubble={chatbubble} />
    </div>;
}
