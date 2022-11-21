<template>
	<div>
		<router-link :to="backLink" class="btn btn-primary"
			>Back to group</router-link
		>

		<div v-if="loaded">
			<p>
				There was some sort of problem loading this group's budget. Yeah, not a
				very helpful error message, I know.
			</p>
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

			if (budget.success && budget.return) {
				this.gotoBudget(budget.return);
			}

			this.loaded = true;
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
