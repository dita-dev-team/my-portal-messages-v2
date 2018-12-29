import * as admin from 'firebase-admin'
var serviceAccount = require('./my-portal-e90f4-firebase-adminsdk-d3oav-6de944c1f0')

export default function connectToFirebaseAdmin() {
    admin.initializeApp({
       credential: admin.credential.cert(serviceAccount),
       databaseURL: 'https://my-portal-e90f4.firebaseio.com'
    });
}