class Cart {
	constructor() {
		this.content = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []; 
	}

	displayCartInConsole() {
		console.log(this.content); 
	}

	//récupérer un tableau des ID du panier : 
	getIdOfProductsInCart() {
		let tableOfIdOfTheCart = []; 
		for (let i in this.content) {
			tableOfIdOfTheCart.push(this.content[i]._id); 
		}
		return tableOfIdOfTheCart; 
	}

	//vérifier si un produit est déjà dans le panier à partir de son ID : 
	checkProductInCart(id) {
		if (this.getIdOfProductsInCart().indexOf(id) == -1) {
			return false; //cas où l'id est absent du panier
		} else {
			return true; //cas où l'id est présent dans le panier
		}
	}

	//ajouter un produit au panier : 
	addProductInCart(id, name, price, imageUrl, custom) {
		if (this.checkProductInCart(id)) {
			console.log(`${id} est déjà présent dans votre panier`); 
		} else {
			this.content.push(
				{
					_id: id,
					name: name, 
					price: price,
					imageUrl: imageUrl, 
					custom: custom
				}
			)
			localStorage.setItem("cart", JSON.stringify(this.content));
			console.log(`${id} a bien été ajouté à votre panier avec l'option : ${custom}`); 
		}
	}

	//vérifier si le panier est vide : 
	cartIsEmpty() {
		if (this.content.length == 0) {
			return true; 
		} else {
			return false; 
		}
	}

	//vider le contenu du panier : 
	toEmptyCart() {
		this.content = []; 
		localStorage.setItem("cart", JSON.stringify(this.content));
	}
}