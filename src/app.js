import axios from 'axios';
import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia'

import App from './vue/App.vue';
import router from './vue/router.js';

// Set up Axios
axios.defaults.baseURL = "https://api.clerk.finance";

// Set up pinia
const pinia = createPinia();
pinia.use(() => {
	return {
		router: markRaw(router)
	};
});

// Set up Vue
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');
