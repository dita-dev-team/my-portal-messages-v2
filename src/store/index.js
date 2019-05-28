import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import {Message, Notification} from 'element-ui'
import api from '../services/api'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex);
export const store = new Vuex.Store({
    strict: true,
    plugins: [
        createPersistedState()
    ],
    state: {
        existsUser: null,
        isProcessLoading: null,
        existsError: null,
        userTokenExists: null,
        jwtWebToken: '',
        userDetails: {
            email: '',
            uid: ''
        }
    },
    mutations: {
        setLoading(state, payload) {
            state.isProcessLoading = payload;
        },
        setError(state, payload) {
            state.existsError = payload;
        },
        setUserToken(state, payload) {
            state.userTokenExists = payload;
        },
        clearToken(state) {
            state.userTokenExists = null;
        },
        clearError(state) {
            state.existsError = null;
        },
        setUser(state, payload) {
            state.existsUser = payload;
        },
        setJwtToken(state, payload) {
            state.jwtWebToken = payload;
        },
        setUserEmail(state, payload) {
            state.userDetails.email = payload;
        },
        setUserUID(state, payload) {
            state.userDetails.uid = payload;
        },
        clearUserDetails(state) {
            state.userDetails.email = '';
            state.userDetails.uid = '';
            state.jwtWebToken = null;
        }
    },
    actions: {
        //Define All Actions.
        async fetchAccessToken({commit}, payload) {
            try {
                commit('clearError');
                const response = await api().post('/client/access-token', payload);
                let accessToken = response.data.token.accessToken;
                commit('setJwtToken', accessToken);

            } catch (e) {
                const options = {
                    title: 'Error Occurred Fetching Access Token',
                    message: e.message
                };
                Notification.error(options)
            }
        },
        async sendPushNotification({commit}, payload) {
            try {
                commit('setLoading', true);
                commit('clearError');
                const response = await api().post('/send', payload);
                Vue.$log.info(response.data)
                commit('setLoading', false);
                const successOptions = {
                    title: 'Message Sent Successfully',
                    message: `${payload.messageTitle} has been dispatched`
                };
                Notification.success(successOptions);
            } catch (e) {
                const options = {
                    title: 'Error Sending Push Notification',
                    message: e.message
                };
                Notification.error(options)
            }
        },
        async loginUser({commit}, payload) {
            try {
                commit('setLoading', true);
                commit('clearError');
                const loggedUser = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
                const successOptions = {
                    title: 'Authentication Success',
                    message: `${loggedUser.user.email} Logged in Successfully`
                };
                Vue.$log.info(loggedUser);

                commit('setUser', loggedUser.user.uid);
                commit('setUserEmail', loggedUser.user.email);
                commit('setUserUID', loggedUser.user.uid);
                Notification.success(successOptions);
                commit('setLoading',false);


            } catch (e) {
                Vue.$log.error(e.message);
                const options = {
                    title: 'Authentication Error',
                    message: e.message
                };
                Notification.error(options);
                commit('setLoading',false);

            }
        },
        async uploadFile({commit}, file) {
            commit('setLoading', true);
            commit('clearError');
            let formData = new FormData();
            formData.append('files', file);
            let instance = api();
            instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
            try {
                const response = await instance.post('excel/upload', formData);
                Vue.$log.info(response.message);
                Message.info('Excel uploaded successfully!');
            } catch (e) {
                Vue.$log.error(e);
                Message.error(e.message);
            }

            commit('setLoading', false);
        },
        autoSignIn({commit}, payload) {
            commit('setUser', payload.uid);
        },
        onLogoutUser({commit}) {
            firebase.auth().signOut();
            commit('setUser', null);
            commit('clearUserDetails');
        }
    },
    getters: {
        processLoading(state) {
            return state.isProcessLoading;
        },
        errorExists(state) {
            return state.existsError;
        },
        userToken(state) {
            return state.existsError;
        },
        user(state) {
            return state.existsUser;
        },
        jwtToken(state) {
            return state.jwtWebToken;
        }
    }
});