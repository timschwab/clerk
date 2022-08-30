<template>
	<ul>
		<li v-for="toast in list" :key="toast.id">
			{{ toast.type }} - {{ toast.message }}
		</li>
	</ul>
</template>

<script>
import useToast from './stores/toast';

export default {
	computed: {
		list() {
			const toastStore = useToast();
			return toastStore.list;
		}
	}
};
</script>

<style scoped>
</style>
