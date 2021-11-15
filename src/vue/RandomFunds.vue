<template>
	<div>
		<div class="row">
			<h1>Balance: ${{ balance }}</h1>
			<h1>Unspent: ${{ unspent }}</h1>
		</div>
		<div class="row">
			<div class="col-lg-6">
				<input id="deposit-name" v-model="current.deposit.name" type="text" class="form-control" placeholder="Name">
				<input id="deposit-amount" v-model.number="current.deposit.amount" type="number" class="form-control" placeholder="Amount">
				<button type="submit" @click="addDeposit" class="btn btn-primary">Add</button>

				<table class="table">
					<caption>Deposits - ${{ depositsTotal }}</caption>
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Amount</th>
							<th scope="col">Delete</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="deposit in deposits" :key="deposit.name">
							<td>{{ deposit.name }}</td>
							<td>{{ deposit.amount }}</td>
							<td>No deleting</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="col-lg-6">
				<input id="withdrawal-name" v-model="current.withdrawal.name" type="text" class="form-control" placeholder="Name">
				<input id="withdrawal-amount" v-model.number="current.withdrawal.amount" type="number" class="form-control" placeholder="Amount">
				<button type="submit" @click="addWithdrawal" class="btn btn-primary">Add</button>

				<table class="table">
					<caption>Withdrawals - ${{ withdrawalsTotal }}</caption>
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Amount</th>
							<th scope="col">Spent?</th>
							<th scope="col">Delete</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="withdrawal in withdrawals" :key="withdrawal.name">
							<td>{{ withdrawal.name }}</td>
							<td>{{ withdrawal.amount }}</td>
							<td>{{ withdrawal.spent }}</td>
							<td>No deleting</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			current: {
				deposit: {
					name: undefined,
					amount: undefined
				},
				withdrawal: {
					name: undefined,
					amount: undefined
				}
			},
			deposits: [],
			withdrawals: []
		};
	},
	computed: {
		depositsTotal() {
			return this.deposits.reduce((prev, cur) => prev + cur.amount, 0);
		},
		withdrawalsTotal() {
			return this.withdrawals.reduce((prev, cur) => prev + cur.amount, 0);
		},
		spentWithdrawals() {
			return this.withdrawals.reduce((prev, cur) => prev + (cur.spent && cur.amount), 0);
		},
		balance() {
			return this.depositsTotal - this.withdrawalsTotal;
		},
		unspent() {
			return this.withdrawalsTotal - this.spentWithdrawals;
		}
	},
	methods: {
		addDeposit() {
			this.deposits.push({
				name: this.current.deposit.name,
				amount: this.current.deposit.amount
			});

			this.current.deposit.name = undefined;
			this.current.deposit.amount = undefined;
		},
		addWithdrawal() {
			this.withdrawals.push({
				name: this.current.withdrawal.name,
				amount: this.current.withdrawal.amount,
				spent: false
			});

			this.current.withdrawal.name = undefined;
			this.current.withdrawal.amount = undefined;
		}
	}
}
</script>

<style>
</style>
