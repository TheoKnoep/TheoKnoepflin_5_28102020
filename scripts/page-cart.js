let myCart = new Cart(); 
myCart.displayCartInConsole();

let cartContainer = document.getElementById("cart-container"); 
let confirmButton = document.getElementById("confirm-order"); 

if (myCart.cartIsEmpty()) {
	console.log("Le panier est vide"); 
	cartContainer.innerHTML = `<p class="no-products-message">Il n'y a aucun produit dans votre panier actuellement</p>
						<p class="no-products-message"><a href="index.html">Retourner à la liste des produits</a></p>`
} else {
	console.log("Afficher le panier"); 
	myCart.displayCartInConsole(); 
	//Pour chaque ID présent dans le panier, on génère une ligne du tableau : 
	let innerTableCart = ''; 
	let totalAmountofOrder = 0; 
	for (let i in myCart.content) {
		let customInfo = ''; 
		if (myCart.content[i].custom != "none") {
			customInfo = `(${myCart.content[i].custom})`; 
		}
		innerTableCart = innerTableCart + `<tr class="">
									<td class="product-cell"><a href="produit.html?id=${myCart.content[i]._id}"><img src="${myCart.content[i].imageUrl}" width="150px" heith="150px"/></a></td>
									<td class="name-product product-cell"><a href="produit.html?id=${myCart.content[i]._id}">${myCart.content[i].name} <em>${customInfo}</em></a></td>
									<td class="product-cell">${Utils.integerPartOfPrice(myCart.content[i].price)},${Utils.decimalPartOfPrice(myCart.content[i].price)} €</td>
									<td class="delate-icon"><i id="delate-item-${i}" class="fas fa-trash-alt delate-items" title="Retirer ce produit du panier"></i></td>
								</tr>`
		totalAmountofOrder += myCart.content[i].price; 
	}; 

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
	
	//on rend accessible le bouton de confirmation de commande en bas du formulaire : 
	confirmButton.classList.replace("btn--inactive", "btn--active"); 

}

let cartTableBody = document.getElementById("cart-table-body"); 

let delateItems = document.querySelectorAll(".delate-items"); 
for (let i = 0; i < myCart.content.length; i++) {
	delateItems[i].addEventListener('click', function() {
		console.log(`click ${i}`); 
		/* actions à effectuer au clic sur l'icone delate : 
			1. supprimer la ligne du tableau [i]
			2. supprimer l'objet index [i] dans le panier
			3. mettre à jour le localStorage 'cart' */
		cartTableBody.removeChild(cartTableBody.children[i]); 
		myCart.content.splice(i, 1); 
		localStorage.setItem("cart", JSON.stringify(myCart.content)); 
		location.reload(); 
	}); 
}
