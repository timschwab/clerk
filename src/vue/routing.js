import { createRouter, createWebHistory } from 'vue-router';

// Includes
import HomePage from './HomePage.vue';
import NotFoundPage from './404.vue';
import LoginPage from './LoginPage.vue';
// import RandomFunds from './RandomFunds.vue';
// import Christmas from './Christmas.vue';

let store; // Injected by app.js

// Base pages
const routing = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage
		},
		{
			path: '/login',
			name: 'login',
			component: LoginPage
		},
		{
			path: '/:pathMatch(.*)*',
			name: '404',
			component: NotFoundPage
		}
	]
});

///*
routing.beforeEach((to, from) => {
	if (store.getters.authenticated || to.name == 'login') {
		return true;
	} else {
		return {
			name: 'login'
		};
	}
});
//*/

if (DEV_MODE) {
	// Expose globally for debugging
	window.routing = routing;
}

function setStore(storeVar) {
	store = storeVar;
}

export default {
	setStore,
	routing
};
