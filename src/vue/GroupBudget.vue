<template>
	<div>
		<router-link :to="homeLink">Back to group</router-link>

		<div v-if="loaded">
			<h1>Yo</h1>
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
			loaded: false
		};
	},
	created() {
		this.toastStore = useToast();
		this.fetchBudget();
	},
	computed: {
		admin() {
			if (this.loaded) {
				return this.data.role == "admin";
			} else {
				return false;
			}
		},
		homeLink() {
			return "/group/" + this.group;
		}
	},
	methods: {
		async fetchBudget() {
			let budget = await budgetApi.fromGroup(this.group);

			if (budget.success) {
				if (budget.return) {
					this.toastStore.info(budget.return);
				} else {
					this.toastStore.info("nothin");
				}
			} else {
				this.toastStore.error(budget.message);
			}

			this.loaded = true;
		}
	}
};
</script>

<style></style>
