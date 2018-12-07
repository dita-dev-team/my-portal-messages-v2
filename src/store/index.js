/* eslint-disable no-unused-vars,no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import {Notification} from 'element-ui'

Vue.use(Vuex);
export const store = new Vuex.Store({
   strict:true,
   state:{
      existsUser:null,
      isProcessLoading:null,
      existsError:null,
      userTokenExists:null
   },
   mutations:{
       setLoading(state,payload){
           state.isProcessLoading = payload;
       },
       setError(state,payload){
           state.existsError= payload;
       },
       setUserToken(state,payload){
           state.userTokenExists = payload;
       },
       clearToken(state){
           state.userTokenExists = null;
       },
       clearError(state){
           state.existsError = null;
       },
       setUser(state,payload){
           state.existsUser = payload;
       }
   },
   actions:{
       //Define All Actions.
       async loginUser({commit},payload){
          try{
              commit('setLoading',true)
              commit('clearError')
              const loggedUser = await firebase.auth().signInWithEmailAndPassword(payload.email,payload.password);
              const successOptions= {
                title:'Authentication Success',
                message:`${loggedUser.user.email} Logged in Successfully`
              };
              console.log(loggedUser);
              commit('setUser',loggedUser.user.uid);
              Notification.success(successOptions);

          }catch (e) {
              console.log(e.message);
              const options = {
                  title:'Authentication Error',
                  message:e.message
              };
              Notification.error(options)

          }
       },
       autoSignIn({commit},payload){
         commit('setUser',payload.uid);
       },
       onLogoutUser({commit}){
           firebase.auth().signOut();
           commit('setUser',null);
       }
   },
    getters:{
       processLoading(state){
           return state.isProcessLoading;
       },
       errorExists(state){
           return state.existsError;
       },
       userToken(state){
           return state.existsError;
       },
        user(state){
           return state.existsUser;
        }
    }
});