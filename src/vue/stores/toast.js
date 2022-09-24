import { v4 as uuid } from "uuid";
import { defineStore } from "pinia";

const secondsToShow = 5;

const state = () => {
	return {
		start: 0,
		end: 0,
		data: {},
	};
};

const getters = {
	list(state) {
		let result = [];

		for (let i = state.start; i < state.end; i++) {
			result.push(state.data[i]);
		}

		return result;
	},
};

const actions = {
	add(toast) {
		let next = this.end;
		this.end++;
		this.data[next] = toast;

		setTimeout(() => {
			this.remove();
		}, secondsToShow * 1000);
	},
	remove() {
		let prev = this.start;
		this.start++;
		delete this.data[prev];

		// Reset to 0 when the opportunity arises
		if (this.start == this.end) {
			this.start = 0;
			this.end = 0;
		}
	},
	info(message) {
		this.add({
			id: uuid(),
			type: "info",
			message: message,
		});
	},
	warning(message) {
		this.add({
			id: uuid(),
			type: "warning",
			message: message,
		});
	},
	error(message) {
		this.add({
			id: uuid(),
			type: "error",
			message: message,
		});
	},
};

// Define store
const useStore = defineStore("toast", {
	state,
	getters,
	actions,
});

export default useStore;
