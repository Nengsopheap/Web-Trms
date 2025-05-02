// src/store/auth.js
import { login as apiLogin, logout as apiLogout } from '../api/auth';

const state = {
  token: localStorage.getItem('token') || null,
  role: null,
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    localStorage.setItem('token', token);
  },
  setRole(state, role) {
    state.role = role;
  },
  clearAuth(state) {
    state.token = null;
    state.role = null;
    localStorage.removeItem('token');
  },
};

const actions = {
  async login({ commit }, { email, password }) {
    const response = await apiLogin(email, password);
    const token = response.data.access_token;
    const payload = JSON.parse(atob(token.split('.')[1]));

    commit('setToken', token);
    commit('setRole', payload.role);

    return payload.role;
  },
  async logout({ state, commit }) {
    if (state.token) {
      await apiLogout(state.token);
    }
    commit('clearAuth');
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  isAdmin: (state) => state.role === 'ADMIN',
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
