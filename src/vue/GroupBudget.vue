<template>
	<div>
		<router-link :to="homeLink">Back to group</router-link>

		<div v-if="loaded">
			<div v-if="successful">
				<h1>Budget</h1>
				<p>
					It looks like this group doesn't have a budget yet. Click below to
					create one!
				</p>
				<p><button @click="create">Create budget</button></p>
			</div>
			<div v-else>
				<p>
					There was some sort of problem loading this group's budget. Yeah, not
					a very helpful error message, I know.
				</p>
			</div>
		</div>
		<div v-else>
			<p>Loading...</p>
		</div>
	</div>
</template>

<script>
import budgetApi from "../api/budget";

export default {
	props: ["group"],
	data() {
		return {
			loaded: false,
			successful: undefined
		};
	},
	created() {
		this.fetchBudget();
	},
	computed: {
		homeLink() {
			return "/group/" + this.group;
		}
	},
	methods: {
		async fetchBudget() {
			let budget = await budgetApi.fromGroup(this.group);

			if (budget.success) {
				this.successful = true;
				if (budget.return) {
					this.$router.push({
						name: "budgetHome",
						params: {
							budget: budget.return
						}
					});
				} else {
					// Stay on the page and have the user create a budget
				}
			} else {
				this.successful = false;
			}

			this.loaded = true;
		},
		async create() {
			//
		}
	}
};
</script>

<style></style>
