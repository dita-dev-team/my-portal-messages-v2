import * as firebase from 'firebase'
import _env from '../../env'

export default function connectFirebase(){
    firebase.initializeApp({
        apiKey: _env.apiKey,
        authDomain: _env.authDomain,
        databaseURL: _env.databaseURL,
        projectId: _env.projectId,
        storageBucket: _env.storageBucket,
        messagingSenderId: _env.messagingSenderId
    })
}