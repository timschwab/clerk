<template>
	<div>
		<h1>Home</h1>

		<div class="card-deck row">
			<HomePageCard
				title="Hello!"
				desc="My name is Clerk. I like doing financial tasks humans find tiresome."
			></HomePageCard>
		</div>
	</div>
</template>

<script>
import HomePageCard from "./HomePageCard.vue";

export default {
	components: {
		HomePageCard
	}
};
</script>

<style>
</style>
