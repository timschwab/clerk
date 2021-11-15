// Set up vue
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// Includes
let routing; // Injected by app.js

// Define store
const store = new Vuex.Store({
	state: {
		//
	},
	getters: {
		//
	},
	mutations: {
		//
	},
	actions: {
		//
	}
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