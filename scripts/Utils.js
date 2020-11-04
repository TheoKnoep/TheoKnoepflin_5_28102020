class Utils {
	static priceDisplay(price) {
		//traitement du prix :
		let integerPart = Math.floor(price / 100); 
		let decimalPart = wholePrice % 100; 
		if (decimalPart.toString().length == 1) {
			decimalPart = '0' + decimalPart; 
		} 
		return `<span class="price-integer" id="price-integer">${integerPart}</span>
			<span class="price-currency">€</span>
			<span class="price-decimal" id="price-decimal">${decimalPart}</span>`
	}
}