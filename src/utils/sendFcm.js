import * as admin from 'firebase-admin';
import { Message } from 'element-ui'

export default function sendNotificationWithAdmin(headline,message){


    let topic = 'debug';

    let messageBody = {
      data:{
          score:headline,
          time: message
      },
      topic:topic
    };
    admin.messaging().send(messageBody)
        .then((response) => {
            console.log('Successfully Sent Message',response);
            Message.success('Message sent successfully')
        })
        .catch((err)=>{
            console.log('Error Sending Message',err.message);
            Message.error('Error Occured Sending Message',err.message);
        })

};