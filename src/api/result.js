function success(returnObject) {
	return {
		success: true,
		return: returnObject
	};
}

function failure(message) {
	return {
		success: false,
		message: message
	};
}

export default {
	success,
	failure
}
