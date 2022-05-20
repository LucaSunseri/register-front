import { createStore } from 'vuex'
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export default createStore({

  state: {
    user: null,
    attendances: null,
    attendance: {},
    activities: null,
    checkSignature: null,
  },

  getters: {

    getUser (state) {
      if(!state.user) {
        if(localStorage.getItem('user')) {
          state.user = JSON.parse(localStorage.getItem('user') as string);
       }
      }
      return state.user;
    },

    getAttendances (state) {
      return state.attendances;
    },

    getAttendance (state) {
      return state.attendance;
    },

    getActivities (state) {
      return state.activities;
    },

    getCheckSignature (state) {
      return state.checkSignature;
    },
  
  },

	mutations: {

    setUser(state, user) {
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },

    setAttendances(state, attendances) {
      state.attendances = attendances;
    },

    setAttendance(state, attendance) {
      state.attendance = attendance;
    },

    setActivities(state, activities) {
      state.activities = activities;
    },

    setCheckSignature(state, checkSignature) {
      state.checkSignature = checkSignature;
    },

	},

  actions: {

    login({commit, dispatch}, payload) {
      return axios
      .post(API_URL + 'login', payload)
      .then(function (response) {
          commit('setUser', response.data.data);
          return Promise.resolve;
      })
      .catch(function (error) {
          return Promise.reject(error);
      });
    },

    logout({ commit, getters }) {
      return axios
      .get(API_URL + 'logout', {
        headers: {
          'Authorization': `Bearer ${getters.getUser.token}`
        }
      })
      .then(function (response) {
        commit('setUser', null);
        return Promise.resolve(response);
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
    },

    register({commit}, payload) {
      return axios
      .post(API_URL + 'register', payload)
      .then(function (response) {
        commit('setUser', response.data.data);
        return Promise.resolve;
      })
      .catch(function (error) {
          return Promise.reject(error);
      });
    },

    getAttendance({commit, getters}, payload) {
      let api_url = API_URL + 'attendance/index';
      if(payload?.month && payload?.year) {
        api_url = API_URL + `attendance/index/?month=${payload.month}&&year=${payload.year}`;
      } else if(payload?.month) {
        api_url = API_URL + `attendance/index/?month=${payload.month}`;
      } else if(payload?.year) {
        api_url = API_URL + `attendance/index/?year=${payload.year}`;
      }
      axios
      .get( api_url, {
        headers: {
          'Authorization': `Bearer ${getters.getUser.token}`
        }
      })
      .then(function (response) {
        console.log(response.data.data);
        
        commit('setAttendances', response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    showAttendance({commit, getters}, id) {
      axios
      .get( API_URL + `attendance/show/${id}`, {
        headers: {
          'Authorization': `Bearer ${getters.getUser.token}`
        }
      })
      .then(function (response) {
        commit('setAttendance', response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    createAttendance({ getters }, payload) {
      return axios
      .post( API_URL + 'attendance/create', payload, {
        headers: {
          'Authorization': `Bearer ${getters.getUser.token}`
        }
      })
      .then(function (response) {
        console.log(response);
        return Promise.resolve;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
    },

    editAttendance({ getters }, [id, payload]) {
      return axios
      .post( API_URL + `attendance/edit/${id}`, payload, {
        headers: {
          'Authorization': `Bearer ${getters.getUser.token}`
        }
      })
      .then(function (response) {
        console.log(response);
        return Promise.resolve;
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
    },

    getActivity({commit}) {
      axios
      .get( API_URL + 'activity')
      .then(function (response) {
        commit('setActivities', response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    checkSignature({getters, commit}) {
      return axios
      .get( API_URL + 'signature/check', {
        headers: {
          'Authorization': `Bearer ${getters.getUser.token}`
        }
      })
      .then(function (response) {
        commit('setCheckSignature', response.data);
      })
      .catch(function (error) {
        return Promise.reject(error);
      });
    },

    saveSignature({getters, commit}, payload) {
      axios
      .post( API_URL + 'signature/save', payload, {
        headers: {
          'Authorization': `Bearer ${getters.getUser.token}`
        }
      })
      .then(function (response) {
        commit('setCheckSignature', true);
        console.log(response.data); 
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    exportWord({getters}, payload) {
      axios
      .post( API_URL + 'export/word', payload, {
        headers: {
          'Authorization': `Bearer ${getters.getUser.token}`
        }, 
        responseType: 'blob'
      })
      .then(function (response) {
        debugger;
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ciao.docx'); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(function (error) {
        console.log(error);
      });
    },

  },

  modules: {
  }
  
})

