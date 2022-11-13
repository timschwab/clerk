import network from "./network";

async function validate() {
	return await network.get("/tokens/validate");
}

export default {
	validate
};
