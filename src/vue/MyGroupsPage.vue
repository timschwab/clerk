<template>
	<div>
		<h1>It's your groups</h1>
		<p>You are a member of {{ groups.length }} groups.</p>
		<button @click="createGroup" class="btn btn-primary">
			Create a new group
		</button>

		<div>
			<div
				v-for="cardBucket in cardData"
				:key="cardBucket.id"
				class="card-deck row"
			>
				<Card
					v-for="group in cardBucket.groups"
					:key="group.id"
					:title="group.title"
					:desc="group.desc"
					:linkName="group.linkName"
					:linkDest="group.linkDest"
				></Card>
			</div>
		</div>
	</div>
</template>

<script>
import useToast from "./stores/toast";
import groupApi from "../api/group";
import Card from "./Card.vue";

export default {
	components: {
		Card
	},
	data() {
		return {
			groups: [],
			toastStore: null
		};
	},
	created() {
		this.toastStore = useToast();
		this.fetchGroups();
	},
	computed: {
		cardData() {
			let mappedGroups = this.groups.map((group) => {
				return {
					id: group.id,
					title: group.name,
					desc: group.id,
					linkName: "View",
					linkDest: "/group/" + group.id
				};
			});

			let bucketed = [];
			let i = 0;
			for (let group of mappedGroups) {
				let rem = i % 3;
				let index = Math.floor(i / 3);

				if (rem == 0) {
					bucketed.push({
						id: index,
						groups: []
					});
				}

				bucketed[index].groups.push(group);
				i++;
			}

			return bucketed;
		}
	},
	methods: {
		async fetchGroups() {
			let groups = await groupApi.myGroups();
			if (groups.success) {
				this.groups = groups.return;
			} else {
				this.toastStore.error(groups.message);
			}
		},
		async createGroup() {
			let group = await groupApi.create();
			if (group.success) {
				await this.fetchGroups();
			} else {
				this.toastStore.error(group.message);
			}
		}
	}
};
</script>

<style></style>
