let myCart = new Cart(); 
myCart.displayCartInConsole();
console.log(myCart.content); 

let cartContainer = document.getElementById("cart-container"); 

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
		innerTableCart = innerTableCart + `<tr class="">
									<td class="product-cell"><a href="produit.html?id=${myCart.content[i]._id}"><img src="${myCart.content[i].imageUrl}" width="150px" heith="150px"/></a></td>
									<td class="name-product product-cell"><a href="produit.html?id=${myCart.content[i]._id}">${myCart.content[i].name}</a></td>
									<td class="product-cell">${Utils.integerPartOfPrice(myCart.content[i].price)},${Utils.decimalPartOfPrice(myCart.content[i].price)} €</td>
									<td class="delate-icon"><i class="fas fa-trash-alt" title="Retirer ce produit du panier"></i></td>
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
							<tbody>
								${innerTableCart}
								<tr class="total-amount-line">
									<td colspan="2">TOTAL</td>
									<td>${Utils.integerPartOfPrice(totalAmountofOrder)},${Utils.decimalPartOfPrice(totalAmountofOrder)} €</td>
								</tr>
							</tbody>
						</table>`

}