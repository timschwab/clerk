const dollarFormatter = new Intl.NumberFormat(undefined, {
	style: "currency",
	currency: "USD"
});

function format(num) {
	return dollarFormatter.format(num);
}

function validNumber(val) {
	if (Number.isNaN(val) || !val || val == Infinity || val == -Infinity) {
		return false;
	} else {
		return true;
	}
}

export default {
	numToDollar: format,
	validNumber
};
