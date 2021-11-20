<template>
	<div class="col-lg-4">
		<div class="card">
			<div class="card-body">
				<h4>{{ title }}</h4>
				<p class="card-text">{{ desc }}</p>
			</div>
			<div class="card-footer" v-if="linkDest">
				<router-link :to="linkDest" class="btn btn-primary stretched-link">{{ linkName }}</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['title', 'desc', 'linkDest', 'linkName']
}
</script>

<style>
</style>
