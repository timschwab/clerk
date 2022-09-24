<template>
	<div>
		<h1>Home</h1>

		<div class="card-deck row">
			<Card
				title="Hello!"
				desc="My name is Clerk. I like doing financial tasks humans find tiresome."
			></Card>

			<Card
				title="Profile"
				desc="Who you are"
				linkName="Manage"
				linkDest="/profile"
			></Card>

			<Card
				title="Groups"
				desc="Where the magic happens"
				linkName="Manage"
				linkDest="/my-groups"
			></Card>
		</div>
	</div>
</template>

<script>
import Card from "./Card.vue";

export default {
	components: {
		Card,
	},
};
</script>

<style></style>
