/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'

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
       }
   },
   actions:{
       //Define All Actions.
       async loginUser({commit},payload){

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