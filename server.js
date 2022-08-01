const express = require('express'); //require('express') is a function object. app returns 
// const app = require('express')(); //we don't do this because we also need to reference 
// properties part of the express object. we can combine it to one line if we only plan 
// on using express without middleware

const app = express()
//calling the function object returns another function with the response/request trace

const server = require("http").Server(app);
// NOTE: we only need this for socket.io, which requires a direct HTTP link instead of express
//creates the http server, but automated by express() which already has the function (req, res) signature 
const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});
const { v4: uniqueID } = require("uuid");

const path = require('path');

var cors = require('cors')

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
    debug: true,
});

app.use("/peerjs", peerServer);
app.use(cors())

app.use(express.static("client/build"));


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
})



lovers = [];

io.on("connection", (socket) => {
    console.log("new socket connection");
    socket.on("userjoined", (roomID, userID) => {
        lovers.push(socket);
        console.log(`new peer connection. total: ${lovers.length}`);
        socket.join(roomID);
        socket.broadcast.to(roomID).emit("userconnected", userID);
    })

    socket.on("disconnect", () => {
        lovers.splice(lovers.indexOf(socket), 1);
        io.emit("goodbye");
        console.log(`peer connection left. total: ${lovers.length}`);
    })
})



server.listen(3030, () => {
    console.log("listening on port 3030");
});

