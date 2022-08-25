import { createApp } from 'vue';

import App from './vue/App.vue';
import routing from './vue/routing.js';
import store from './vue/store/index.js';

// Set up circular dependency - not sure if there is a better solution for this
routing.setStore(store.store);
store.setRouting(routing.routing);

// Set up the app
const app = createApp(App);
app.use(routing.routing);
app.use(store.store);
app.mount('#app');
