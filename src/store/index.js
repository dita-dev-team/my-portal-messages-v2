/* eslint-disable no-unused-vars,no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

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
              console.log(loggedUser);
              commit('setUser',loggedUser.user.uid)
              //
          }catch (e) {
              console.log(e.message);
          }
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
       }
    }
});