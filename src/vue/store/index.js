import Vuex from 'vuex';
import axios from 'axios';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

// Includes
let routing; // Injected by app.js

// Define store
const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});

if (DEV_MODE) {
	// Expose globally for debugging
	window.store = store;
}

function setRouting(routingVar) {
	routing = routingVar;
}

export default {
	setRouting,
	store
};