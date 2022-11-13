<template>
	<div>
		<router-link :to="backLink">Back to group</router-link>

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
import useToast from "./stores/toast";
import budgetApi from "../api/budget";

export default {
	props: ["group"],
	data() {
		return {
			toastStore: null,
			loaded: false,
			successful: undefined
		};
	},
	created() {
		this.toastStore = useToast();
		this.fetchBudget();
	},
	computed: {
		backLink() {
			return "/group/" + this.group;
		}
	},
	methods: {
		async fetchBudget() {
			let budget = await budgetApi.fromGroup(this.group);

			if (budget.success) {
				if (budget.return) {
					this.gotoBudget(budget.return);
				} else {
					// Stay on the page and have the user create a budget
					this.successful = true;
				}
			} else {
				this.successful = false;
			}

			this.loaded = true;
		},
		async create() {
			let budget = await budgetApi.create(this.group);

			if (budget.success) {
				this.gotoBudget(budget.return);
			} else {
				this.toastStore.error(budget.message);
			}
		},
		gotoBudget(budget) {
			this.$router.push({
				name: "budgetHome",
				params: {
					budget: budget
				}
			});
		}
	}
};
</script>

<style></style>
