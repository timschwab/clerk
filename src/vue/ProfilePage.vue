<template>
	<div>
		<h1>o hi, it you</h1>
		<p>{{ info }}</p>
	</div>
</template>

<script>
// import useAuth from './stores/auth';
import user from "../api/user";
import useToast from './stores/toast';

export default {
	data() {
		return {
			info: {}
		};
	},
	async created() {
		let info = await user.info();
		if (info.success) {
			this.info = info.return;
		} else {
			const toastStore = useToast();
			toastStore.error(info.message);
		}
	},
	methods: {
		//
	}
};
</script>

<style>
</style>
