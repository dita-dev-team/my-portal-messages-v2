import {store} from '../store/index'
import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'https://my-portal-fcm-api.herokuapp.com/api/v1',
        headers: {
            Authorization: `Bearer ${store.state.jwtWebToken}`
        }
    })
}