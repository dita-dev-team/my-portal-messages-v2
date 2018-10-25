import * as axios from 'axios'
import { Message } from 'element-ui'

export default function sendNotification (title, message, recipient) {
  const url = 'https://fcm.googleapis.com/fcm/send'
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
      'Authorization': 'key=AAAAeWXPj-8:APA91bGSjyi_HR1SjfTgZAJk9fDPnBORHZ5hZNGiv0N9sNUzqC30qE1f_NHO1OgYFTx9KfUTyREon0Iekeug91fOgk9QYZ7BLEi868861FMBibObrUm8A9MS9F6NOtm5bxK6mFTeiGu9'
    }
  }).then(function (response) {
    Message.success('Message sent successfully')
  }).catch(function (error) {
    console.error(error)
    Message.error('An error occurred while sending the message')
  })
}

