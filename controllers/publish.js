const {io}= require('../middlewares/socketIO');

async function publisher(event,data){
    io.on("connection",(socket)=>{
        
      
        socket.on(event,()=>{
            console.log("Someone Connected", socket);
            logger.info("Someone Connected", socket);
            socket.broadcast.emit(event,data)
        })
          //each connection is followed by a disconnection event
          socket.on('disconnect', () => {   
            console.log("Someone Disconnected");
            logger.info("Someone Disconnected")
         });
    })
}
module.exports = {publisher}