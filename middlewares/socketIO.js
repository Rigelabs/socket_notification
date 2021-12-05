const express = require('express');
const {Server} = require("socket.io");

const logger = require('./logger');


//initialize an express server
const app = express();
const http = require('http');
const server = http.createServer(app);

//intialize an IO server on top of the express server
const io = new Server(server)


//io listen on connection event for incoming sockets
io.on("connection",(socket)=>{
    console.log("Someone Connected", socket);
    logger.info("Someone Connected", socket);
    //each connection is followed by a disconnection event
    socket.on('disconnect', () => {   
        console.log("Someone Disconnected");
        logger.info("Someone Disconnected")
     });
})

module.exports={io}