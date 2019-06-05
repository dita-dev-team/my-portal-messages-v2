import {store} from '../store/index'
import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'https://us-central1-my-portal-e90f4.cloudfunctions.net/my/api/v1',
        headers: {
            Authorization: `Bearer ${store.state.firebaseAccessToken}`
        }
    })
}