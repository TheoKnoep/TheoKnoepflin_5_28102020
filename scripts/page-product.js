let myCart = new Cart(); 
myCart.displayCartInConsole();
console.log(myCart.content); 

let url = new URL(window.location.href); 
let productId = url.searchParams.get("id"); 

let productImage = document.getElementById("product-image"); 
let productName = document.getElementById("product-name"); 
let productDescription = document.getElementById("product-description"); 
let productCustom = document.getElementById("custom-choice"); 
let productPrice = document.getElementById("price-container"); 

let addCartButton = document.getElementById("add-cart"); 
let wholePage = document.querySelector("body"); 

fetch("http://localhost:3000/api/teddies/" + productId)
	.then(response => response.json())
    		.then(response => {
			//on remplit les champs HTML dédiés : 
			productImage.setAttribute("src", response.imageUrl); 
			productName.textContent = response.name; 
			productDescription.textContent = response.description; 
			productPrice.textContent = response.price; 

			//on remplit les champs du formulaire de choix de personnalisation : 
			for (let i in response.colors) {
				let newOptionForm = document.createElement("option"); 
				newOptionForm.setAttribute("value", i); 
				newOptionForm.textContent = response.colors[i]; 
				productCustom.appendChild(newOptionForm); 
			}

			//on supprime le curseur d'attente pour signifier que la page a fini de charger : 
			wholePage.classList.remove("waiting-cursor"); 
			addCartButton.classList.remove("waiting-cursor"); 
		})
	 .catch(error => console.error('Erreur de chargement ' + error));

// On récupère l'ID du choix de personnalisation du produit récupéré dans la liste déroulante : 
let customProductChosen = document.getElementById("custom-choice"); 
let customProductChosenId = 'none'; 

customProductChosen.addEventListener('change', function() {
	customProductChosenId = document.getElementById("custom-choice").value; 
	console.log(customProductChosenId); 
}); 

//On ajoute un événement au bouton 'Ajouter au panier' qui envoie le produit vers le localStorage :
addCartButton.addEventListener('click', function(e) {
	e.preventDefault(); 
	myCart.addProductInCart(productId, productName.textContent, productImage.src, productPrice.textContent, customProductChosenId); 
}); 