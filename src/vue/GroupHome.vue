<template>
	<div>
		<h1>{{ group }}</h1>
	</div>
</template>

<script>
import useToast from "./stores/toast";
// import groupApi from "../api/groups";

export default {
	props: ["group"],
	data() {
		return {
			data: undefined,
			toastStore: null,
		};
	},
	created() {
		this.toastStore = useToast();
	},
	computed: {
		//
	},
	methods: {
		//
	},
};
</script>

<style></style>
