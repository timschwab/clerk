import Vue from 'vue';

import App from './vue/App.vue';
import routing from './vue/routing.js';
import store from './vue/store.js';

// Set up circular dependency - not sure if there is a better solution for this
routing.setStore(store.store);
store.setRouting(routing.routing);

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	router: routing.routing,
	store: store.store,
	render: h => h(App)
});
