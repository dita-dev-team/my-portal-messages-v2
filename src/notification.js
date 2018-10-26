import Vue from 'vue'
import { Message } from 'element-ui'
import * as admin from 'firebase-admin'

export default function sendNotification (title, content, recipient) {
  let dryRun = process.env.NODE_ENV === 'test'
  let message = {
    android: {
      priority: 'high',
      data: {
        title: title,
        content: content
      },
      notification: {
        title: title,
        body: content
      }
    }
  } 
  if (recipient === 'messages') {
    message['topic'] = recipient
  } else {
    message['token'] = recipient
  }

  admin.messaging().send(message, dryRun)
  .then((response) => {
    Message.success('Message sent successfully: ', response)
  }).catch((error) => {
    Vue.$log.$error(error)
    Message.error('An error occurred while sending the message')
  })
}

