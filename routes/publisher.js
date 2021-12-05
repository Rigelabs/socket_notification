const express = require('express');
const { publisher } = require('../controllers/publish');

const router = express.Router();

router.post('/publish',async(req,res)=>{
   const data= req.body.data
    const event = req.body.event;
    if(event && data){
        try {
            publisher(event,data).then((result)=>{
                res.status(200).json({message:`${event} emmited`})
            }).catch(error=>{
                res.status(500).json({message: error})
            })
            
           
        } catch (error) {
            res.status(501).json({message: error})
        }
    }else{
        res.status(400).json({message: "Invalid Request"})
    }
})



module.exports = {router};