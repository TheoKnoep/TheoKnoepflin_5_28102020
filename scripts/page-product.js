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
			//productPrice.textContent = response.price; 
			productPrice.innerHTML = `<span class="price-integer" id="price-integer">${Utils.integerPartOfPrice(response.price)}</span>
								<span class="price-currency">€</span>
								<span class="price-decimal" id="price-decimal">${Utils.decimalPartOfPrice(response.price)}</span>`

			//on remplit les champs du formulaire de choix de personnalisation : 
			for (let i in response.colors) {
				let newOptionForm = document.createElement("option"); 
				newOptionForm.setAttribute("value", response.colors[i]); 
				newOptionForm.textContent = response.colors[i]; 
				productCustom.appendChild(newOptionForm); 
			}

			//on supprime le curseur d'attente pour signifier que la page a fini de charger : 
			wholePage.classList.remove("waiting-cursor"); 
			addCartButton.classList.remove("waiting-cursor"); 
			addCartButton.classList.replace("btn--inactive", "btn--active"); 
		})
	 .catch(error => alert("Vous devez être connecté au serveur pour afficher le produit"));

// On récupère l'ID du choix de personnalisation du produit récupéré dans la liste déroulante : 
let customProductChosen = document.getElementById("custom-choice"); 
let customProductChosenValue = 'none'; 

customProductChosen.addEventListener('change', function() {
	customProductChosenValue = document.getElementById("custom-choice").value; 
	console.log(customProductChosenValue); 
}); 

//On ajoute un événement au bouton 'Ajouter au panier' qui envoie le produit vers le localStorage :
addCartButton.addEventListener('click', function(e) {
	e.preventDefault(); 

	//on récupère une valeur numérique pour le prix : 
	let priceInteger = document.getElementById("price-integer"); 
	let priceDecimal = document.getElementById("price-decimal"); 
	let price = parseFloat(priceInteger.textContent + priceDecimal.textContent); 

	//on ajoute le produit dans le panier : 
	myCart.addProductInCart(productId, productName.textContent, price, productImage.src, customProductChosenValue); 
}); 