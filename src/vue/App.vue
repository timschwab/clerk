<template>
	<div class="container">
		<Header></Header>
		<router-view id="content"></router-view>
	</div>
</template>

<script>
const Header = require('./Header.vue').default;

module.exports = {
	components: {
		Header
	}
};
</script>

<style>
</style>
