import { createRouter, createWebHistory } from 'vue-router';
import useAuth from './stores/auth';

// Includes
import HomePage from './HomePage.vue';
import NotFoundPage from './404.vue';
import LoginPage from './LoginPage.vue';

// Base pages
const router = createRouter({
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

router.beforeEach((to, from) => {
	const authStore = useAuth();
	if (authStore.authenticated || to.name == 'login') {
		return true;
	} else {
		return {
			name: 'login'
		};
	}
});

if (DEV_MODE) {
	// Expose globally for debugging
	window.router = router;
}

export default router;
