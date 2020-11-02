let productsList = document.getElementById("products-list"); 

let url = "http://localhost:3000/api/teddies"; 

fetch(url)
	.then(response => response.json())
    		.then(response => {
			for (let i in response) {
				let newCard = document.createElement("a"); 
				newCard.setAttribute("href", "produit.html?id=" + response[i]._id); 
				newCard.innerHTML = `<article class="product-card">
										<h2 class="product-card__name heading">${response[i].name}</h2>
										<div class="product-card__image">
											<img src="${response[i].imageUrl}" />
										</div>
									</article>`
				productsList.appendChild(newCard); 
			}
		})
 	.catch(error => {
		 productsList.innerHTML = `<p class="no-product-warning">Il y a actuellement 0 produit dans cette catégorie</p>`
	 });