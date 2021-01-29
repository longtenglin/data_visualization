import Vue from "vue";
import Vuex from "vuex";
import {GetOneHistoryData, GetOneLateData, GetSensors} from "../api/app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "abcd1234",
    navStatus: JSON.parse(window.sessionStorage.getItem("navStatus")) || false,
    // mac: JSON.parse(window.sessionStorage.getItem("mac")) || "240AC406AA8C",
  },
  getters: {
    navStatus: state => state.navStatus,
    mac: state=>state.navStatus,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    REMOVE_TOKEN(state){
      state.token = "";
    },
    SET_NAVSTATUS(state){
      state.navStatus = !state.navStatus;
      window.sessionStorage.setItem("navStatus",JSON.stringify(state.navStatus));
    },
    // SET_MAC(content, state, macAddress){
    //   window.sessionStorage.setItem("mac",JSON.stringify(macAddress));
    // }
  },
  actions: {
    GET_LATEST(content, macAddress){
      return new Promise( (resolve, reject) => {
        GetOneLateData(macAddress).then(responseData => {
          resolve(responseData.data);
        }).catch( error => {
          reject(error);
        });
      });
    },
    GET_SENSORS(){
      return new Promise( (resolve, reject) => {
        GetSensors().then(responseData => {
          resolve(responseData.data);
        }).catch(error => {
          reject(error);
        });
      });
    },
    GET_HISTORY(content, requestData){
      return new Promise((resolve, reject) => {
        GetOneHistoryData(requestData).then(responseData =>{
          resolve(responseData.data);
        }).catch(error => {
          reject(error);
        })
      })
    }
  },
  modules: {}
});
