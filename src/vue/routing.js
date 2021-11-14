// Set up vue
const Vue = require('vue').default;
const VueRouter = require('vue-router').default;
Vue.use(VueRouter);

// Includes
let store; // Injected by app.js

// Base pages
const HomePage = require('./HomePage.vue').default;

const routing = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: HomePage
		}
	]
});

if (DEV_MODE) {
	// Expose globally for debugging
	window.routing = routing;
}

function setStore(storeVar) {
	store = storeVar;
}

module.exports = {
	setStore,
	routing
};