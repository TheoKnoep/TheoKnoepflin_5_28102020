class Cart {
	constructor() {
		this.content = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []; 
	}

	displayCartInConsole() {
		console.log(this.content); 
	}

	//vérifier si on produit et déjà dans le panier à partir de son ID : 
	checkProductInCart(id) {
		let tableOfIdOfTheCart = []; 
		for (let i in this.content) {
			tableOfIdOfTheCart.push(this.content[i]._id); 
		}
		if (tableOfIdOfTheCart.indexOf(id) == -1) {
			return false; //cas où l'id est absent du panier
		} else {
			return true; //cas où l'id est présent dans le panier
		}
	}

	//ajouter un produit au panier : 
	addProductInCart(id, name, image, price, custom) {
		if (this.checkProductInCart(id)) {
			console.log(`${name} est déjà présent dans votre panier`); 
		} else {
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
			console.log(`${name} a bien été ajouté à votre panier`); 
		}
	}
}