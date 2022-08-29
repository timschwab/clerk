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
			component: HomePage,
			meta: { auth: "required" }
		},
		{
			path: '/login',
			name: 'login',
			component: LoginPage,
			meta: { auth: "forbidden" }
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

	if (to.meta.auth == 'required' && !authStore.authenticated) {
		return {
			name: "login"
		};
	} else if (to.meta.auth == 'forbidden' && authStore.authenticated) {
		return {
			name: "home"
		};
	}

	return true;
});

if (DEV_MODE) {
	// Expose globally for debugging
	window.router = router;
}

export default router;
