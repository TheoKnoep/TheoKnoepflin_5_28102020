let myCart = new Cart(); 
console.log(myCart); 
myCart.displayCartInConsole(); 

let productsList = document.getElementById("products-list"); 

fetch("http://localhost:3000/api/teddies")
	.then(response => response.json())
    		.then(response => {
			    console.log(response); 
			for (let i in response) {
				let teddy = new Teddy(response[i]); 
				productsList.appendChild(teddy.createCardProduct(teddy)); 
			}
		})
 	.catch(error => {
		 productsList.innerHTML = `<p class="no-product-warning">Veuillez vous connecter au serveur pour afficher la liste des produits</p>`
	 });