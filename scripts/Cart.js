class Cart {
	constructor() {
		this.content = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []; 
	}

	displayCartInConsole() {
		console.log(this.content); 
	}

	addProductInCart(id, name, image, price, custom) {
		this.content.push(
			{
				_id: id, 
				name: name,
				image: image,
				price: price, 
				custom: custom
			}
		)
		localStorage.setItem("cart", JSON.stringify(this.content));
	}
}