<template>
	<div>
		<h1>Home</h1>

		<div class="card-deck row">
			<div class="col-lg-4">
				<div class="card">
					<div class="card-body">
						<h4>Hello!</h4>
						<p class="card-text">
							My name is Clerk. I like doing financial tasks you humans find tiresome.
						</p>
					</div>
				</div>
			</div>

			<div class="col-lg-4">
				<div class="card">
					<div class="card-body">
						<h4>Random Funds</h4>
						<p class="card-text">Add or allocate your random funds.</p>
					</div>
					<div class="card-footer bg-white">
						<router-link to="/random-funds" class="btn btn-primary stretched-link">Manage</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	//
};
</script>

<style>
</style>
