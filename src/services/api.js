import {store} from '../store/index'
import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'http://localhost:3000/api/v1',
        headers: {
            Authorization: `Bearer ${store.state.jwtWebToken}`
        }
    })
}