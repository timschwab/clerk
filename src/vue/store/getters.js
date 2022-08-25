export default {
	authenticated(state) {
		if (state.token) {
			return true;
		} else {
			return false;
		}
	}
}
