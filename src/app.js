const Vue = require('vue').default;

const App = require('./vue-components/App.vue').default;
const routing = require('./vue-components/routing.js');
const store = require('./vue-components/store.js');

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