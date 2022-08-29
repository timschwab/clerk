<template>
	<div class="container">
		<Header></Header>
		<router-view id="content"></router-view>
	</div>
</template>

<script>
import useAuth from './stores/auth';
import Header from './Header.vue';

export default {
	components: {
		Header
	},
	created() {
		const authStore = useAuth();
		authStore.validateToken();
	}
};
</script>

<style>
</style>
