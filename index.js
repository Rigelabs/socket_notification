const express = require('express');
const env = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const {Server} = require("socket.io");

const logger = require('./middlewares/logger');

env.config();
//initialize an express server
const app = express();
const http = require('http');
const server = http.createServer(app);


//initialize cors
app.use(cors());


// initialize helmet
app.use(helmet())
//initialize bodyparser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
const publisherRoutes= require("./routes/publisher");
app.use('/api', publisherRoutes.router);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    logger.info(`${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
  })


// Capture 500 errors
app.use((err,req,res,next) => {
res.status(500).send('Server Error!');
logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

// Capture 404 erors
app.use((req,res,next) => {
res.status(404).send("PAGE NOT FOUND");
logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

const PORT = process.env.PORT || 2000
server.listen(PORT, ()=>{
    console.log(`Socket Server running in ${process.env.NODE_ENV} on port ${PORT}`)
    logger.info(`Socket Server running in ${process.env.NODE_ENV} on port ${PORT}`)

})

//uncaughtException to crash the nodejs process
process.on('unhandledRejection', (err, origin) => {
logger.error('Unhandled rejection at ', origin, `reason: ${err}`)
console.log('Unhandled rejection at ', origin, `reason: ${err}`)

})  
//The 'rejectionHandled' event is emitted whenever a Promise has been rejected
// and an error handler was attached to it (using promise.catch(), for example) later than one turn of the Node.js event loop.
process.on('rejectionHandled', (err, origin) => {
logger.error('RejectionHandled at ', origin, `reason: ${err}`)
console.log('RejectionHandled at ', origin, `reason: ${err}`)

})  
//The 'exit' event is emitted when the Node.js process is about to exit as a result of either:
//The process.exit() method being called explicitly;
//The Node.js event loop no longer having any additional work to perform.
process.on('exit', (err, origin) => {
logger.error('Process Exited !! ', origin, `reason: ${err}`)
console.log('Process Exited !! ', origin, `reason: ${err}`)

})  