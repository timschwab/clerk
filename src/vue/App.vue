<template>
	<div class="container">
		<Header></Header>
		<router-view id="content"></router-view>
		<Toast></Toast>
	</div>
</template>

<script>
import useAuth from './stores/auth';
import Header from './Header.vue';
import Toast from './Toast.vue';

export default {
	components: {
		Header,
		Toast
	},
	created() {
		const authStore = useAuth();
		authStore.validateToken();
	}
};
</script>

<style>
</style>
