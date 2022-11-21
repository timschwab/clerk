import network from "./network";

async function fromGroup(group) {
	return await network.get("/budget/fromGroup/" + group);
}

async function info(budgetId) {
	return await network.get("/budget/" + budgetId);
}

async function saveRevenue(budgetId, revenue) {
	return await network.post("/budget/" + budgetId + "/revenue", revenue);
}

async function saveExpenses(budgetId, expenses) {
	return await network.post("/budget/" + budgetId + "/expenses", expenses);
}

async function saveSpendingMoney(budgetId, spendingMoney) {
	const endpoint = "/budget/" + budgetId + "/spendingMoney";
	let payload = {
		spendingMoney
	};
	return await network.post(endpoint, payload);
}

export default {
	fromGroup,
	info,
	saveRevenue,
	saveExpenses,
	saveSpendingMoney
};
