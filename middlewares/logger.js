const {createLogger, format, transports, transport} =require('winston');
const SlackHook = require('winston-slack-webhook-transport');
//const WinstonSNS = require('winston-sns');
require('winston-mongodb');


const env= require('dotenv');

env.config();

const MONGO_URI = process.env.MONGO_URI;

module.exports = createLogger({
    transports:[

 // File transport
    new transports.File({
    filename: 'logs/winstonLogs.log',
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
    new transports.MongoDB({
        level:'error',
        db: MONGO_URI,
        options:{
            useUnifiedTopology:true
        },
        collection:'server_logs',
        tryReconnect:true,
        format:format.combine(
            format.timestamp(),
            //convert logs to a json format for mongodb
            format.json()
                )
    }),
    new SlackHook({
        webhookUrl:process.env.SLACK_WEBHOOK_URI
    }),
    //new WinstonSNS({subscriber:227620199801,topic_arn:process.env.TOPICARN,level:'error',
      //  aws_key:process.env.AWS_ACCESS_KEY_ID, aws_secret:  process.env.AWS_SECRET_ACCESS_KEY, region:process.env.AWS_REGION})
    ]
})