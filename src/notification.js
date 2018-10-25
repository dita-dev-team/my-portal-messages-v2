import Vue from 'vue'
import * as axios from 'axios'
import { Message } from 'element-ui'

export default function sendNotification (title, message, recipient) {
  const url = 'https://fcm.googleapis.com/fcm/send'
  const API_KEY = process.env.VUE_FIREBASE_NOTIFICATION_KEY
  axios.post(url, {
    priority: 'high',
    to: recipient,
    data: {
      title: title,
      content: message
    }
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `key=${API_KEY}`
    }
  }).then(function () {
    Message.success('Message sent successfully')
  }).catch(function (error) {
    Vue.$log.$error(error)
    Message.error('An error occurred while sending the message')
  })
}

