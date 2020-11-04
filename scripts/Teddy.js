class Teddy {
	constructor(item) { //on passe un objet
		this.name = item.name, 
		this._id = item._id, 
		this.colors = item.colors, 
		this.description = item.description, 
		this.imageUrl = item.imageUrl, 
		this.price = item.price
	}

	createCardProduct(product) {
		let newCard = document.createElement("a"); 
		newCard.setAttribute("href", "produit.html?id=" + product._id); 
		newCard.innerHTML = `<article class="product-card">
								<h2 class="product-card__name heading">${product.name}</h2>
								<div class="product-card__image">
									<img src="${product.imageUrl}" />
								</div>
							</article>`
		return newCard; 
	}
}