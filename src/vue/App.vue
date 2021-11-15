<template>
	<div class="container">
		<Header></Header>
		<router-view id="content"></router-view>
	</div>
</template>

<script>
import Header from './Header.vue';

export default {
	components: {
		Header
	}
};
</script>

<style>
</style>
