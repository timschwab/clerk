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

export default {
	fromGroup,
	info,
	saveRevenue
};
