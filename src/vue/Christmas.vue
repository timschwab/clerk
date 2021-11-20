<template>
	<div>
		<h1>Christmas</h1>
		<div class="row">
			<div class="col-6">
				Total Alloted:
				<input v-model.number="alloted" type="number" class="form-control" placeholder="Amount">
			</div>
			<div class="col-6">
				Total Left: ${{ left }}
			</div>
		</div>

		<button type="submit" @click="newGift" class="btn btn-primary">New Gift</button>

		<table class="table">
			<thead>
				<tr>
					<th scope="col">Person(s)</th>
					<th scope="col">Gift</th>
					<th scope="col">Amount</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="gift in gifts" :key="gift.id">
					<td><input v-model="gift.person" type="text" class="form-control" placeholder="Person"></td>
					<td><input v-model="gift.gift" type="text" class="form-control" placeholder="Gift"></td>
					<td><input v-model.number="gift.amount" type="number" class="form-control" placeholder="Amount"></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { v4 as uuidv4 } from 'uuid';

	export default {
		data() {
			return {
				alloted: 0,
				gifts: []
			}
		},
		computed: {
			left() {
				let giftTotal = this.gifts.reduce((prev, cur) => prev + cur.amount, 0);
				return this.alloted - giftTotal;
			}
		},
		methods: {
			newGift() {
				this.gifts.push({
					id: uuidv4(),
					person: '',
					gift: '',
					amount: 0
				})
			}
		}
	}
</script>

<style>
</style>
