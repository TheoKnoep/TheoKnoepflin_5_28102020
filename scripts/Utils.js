class Utils {
	static integerPartOfPrice(number) {
		return Math.floor(number / 100); 
	}
	static decimalPartOfPrice(number) {
		let decimalPart = number % 100; 
		if (decimalPart.toString().length == 1) {
			decimalPart = '0' + decimalPart; 
		} 
		return decimalPart; 
	}

	static testEmailIsValid(email) {
		let regex = /\S+@\S+\.\S+/; 
		return regex.test(email); 
	}
}