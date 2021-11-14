// Set up vue
const Vue = require('vue').default;
const Vuex = require('vuex').default;
Vue.use(Vuex);

// Includes
const axios = require('axios').default;
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

module.exports = {
	setRouting,
	store
};