import { createRouter, createWebHistory } from "vue-router";
import useAuth from "./stores/auth";

// Includes
import HomePage from "./HomePage.vue";
import NotFoundPage from "./404.vue";

import RegisterPage from "./RegisterPage.vue";
import LoginPage from "./LoginPage.vue";
import ProfilePage from "./ProfilePage.vue";

import MyGroupsPage from "./MyGroupsPage.vue";
import GroupHome from "./GroupHome.vue";

// Base pages
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomePage,
			meta: { auth: "required" },
		},
		{
			path: "/register",
			name: "register",
			component: RegisterPage,
			meta: { auth: "forbidden" },
		},
		{
			path: "/login",
			name: "login",
			component: LoginPage,
			meta: { auth: "forbidden" },
		},
		{
			path: "/profile",
			name: "profile",
			component: ProfilePage,
			meta: { auth: "required" },
		},
		{
			path: "/my-groups",
			name: "groups",
			component: MyGroupsPage,
			meta: { auth: "required" },
		},
		{
			path: "/group/:group",
			name: "groupHome",
			component: GroupHome,
			props: true,
			meta: { auth: "required" },
		},
		{
			path: "/:pathMatch(.*)*",
			name: "404",
			component: NotFoundPage,
		},
	],
});

router.beforeEach((to, from) => {
	const authStore = useAuth();

	if (to.meta.auth == "required" && !authStore.authenticated) {
		return {
			name: "login",
		};
	} else if (to.meta.auth == "forbidden" && authStore.authenticated) {
		return {
			name: "home",
		};
	}

	return true;
});

if (DEV_MODE) {
	// Expose globally for debugging
	window.router = router;
}

export default router;
