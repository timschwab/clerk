const dollarFormatter = new Intl.NumberFormat(undefined, {
	style: "currency",
	currency: "USD"
});

function format(num) {
	return dollarFormatter.format(num);
}

export default {
	numToDollar: format
};
