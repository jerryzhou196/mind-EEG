import React from "react";
import logo from "../assets/logo.png"

const LoginWidget = () => {
    return (
        <div id="login-page" className="header" style={{ display: "flex", justifyContent: "center", height: "5%", alignItems: "center" }}>
            <div className="text2" style={{ display: "flex", "flexFlow": "wrap" }}>
                <span style={{ width: "100%", textAlign: "right", fontSize: "min(20px, 2vw)" }}> Not Logged In</span>
                <span style={{ width: "100%", textAlign: "right", marginTop: "0.2vw" }}> Create New Account </span>
            </div>
            <div style={{ marginLeft: "1vw" }} className="circle"></div>
        </div >
    )
}

const Header = () => {
    return (
        <div className="upper-container" style={{ display: "flex", justifyContent: "space-between" }}>
            <img id="logo" className="header" src={logo} onClick={() => {
                window.location.href = "/"
            }} />
            <LoginWidget></LoginWidget>
        </div>
    )
}




export default Header;