let myCart = new Cart();
myCart.displayNumberOfArticles("link-to-cart"); 

//variable locale :
let productsList = document.getElementById("products-list");

//Appel au serveur pour récupérer les infos produits
fetch("http://localhost:3000/api/teddies")
	.then(response => response.json())
	.then(response => displayList(response))
	.catch(error => {
		productsList.innerHTML = `<p class="single-paragraphe-page">Veuillez vous connecter au serveur pour afficher la liste des produits</p>`
	});

/* =====================
------- FONCTIONS -------
===================== */
function displayList(products) {
	for (let i in products) {
		let teddy = new Teddy(products[i]);
		productsList.appendChild(teddy.createCardProduct(teddy));
	}
}