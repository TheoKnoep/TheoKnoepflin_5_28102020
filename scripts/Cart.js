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
		/*
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
		} */
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


	//générer le tableau récap du panier en HTML : 
	//Pour chaque ID présent dans le panier, on génère une ligne du tableau : 
	toDisplayCartTable() {
		let innerTableCart = ''; 
		let totalAmountofOrder = 0; 
		for (let i in this.content) {
			let customInfo = '';  //gestion de la personnalisation du produit ou non
			if (this.content[i].custom != "none") {
				customInfo = `(${this.content[i].custom})`; 
			}
			innerTableCart = innerTableCart + `<tr class="">
										<td class="product-cell"><a href="produit.html?id=${this.content[i]._id}"><img src="${this.content[i].imageUrl}" width="150px" heith="150px"/></a></td>
										<td class="name-product product-cell"><h2 class=""><a href="produit.html?id=${this.content[i]._id}">${this.content[i].name} <em>${customInfo}</em></a></h2></td>
										<td class="product-cell">${Utils.integerPartOfPrice(this.content[i].price)},${Utils.decimalPartOfPrice(this.content[i].price)}&nbsp;€</td>
										<td class="delate-icon"><i id="delate-item-${i}" class="fas fa-trash-alt delate-items" title="Retirer ce produit du panier"></i></td>
									</tr>`
			totalAmountofOrder += this.content[i].price; 
		}; 

		//on génère le tableau principal dans lequel on intègre le contenu déjà généré : 
		cartContainer.innerHTML = `<table>
								<thead>
									<tr>
										<th colspan="2">Produit</th>
										<th>Prix</th>
									</tr>
								</thead>
								<tbody id="cart-table-body">
									${innerTableCart}
									<tr class="total-amount-line">
										<td colspan="2">TOTAL</td>
										<td>${Utils.integerPartOfPrice(totalAmountofOrder)},${Utils.decimalPartOfPrice(totalAmountofOrder)} €</td>
									</tr>
								</tbody>
							</table>`
	}

	//fonction afficher le nombre d'articles du panier dans le header :  
	createCounterHeader(element) {
		let newFirstElement = document.createElement("span"); 
		newFirstElement.classList.add("counter-part"); 
		newFirstElement.textContent = myCart.content.length; 
		element.insertAdjacentElement('afterbegin', newFirstElement); 
	}

	displayNumberOfArticles(idElement) {
		let linkToCart = document.getElementById(idElement); 
		if (this.content.length > 0) {
			this.createCounterHeader(linkToCart); 
		}
	}
	updateNumberOfArticles(idElement) {
		let linkToCart = document.getElementById(idElement); 
		if (this.content.length == 1) {
			this.createCounterHeader(linkToCart); 
		} else {
			console.log(linkToCart.children); 
			linkToCart.children[0].textContent = this.content.length; 
		}
	}
}