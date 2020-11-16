let myCart = new Cart();
myCart.displayNumberOfArticles("link-to-cart"); 

//on récupère l'id du produit contenu dans l'adresse URL : 
let url = new URL(window.location.href);
let productId = url.searchParams.get("id");

//variables locales : 
let productImage = document.getElementById("product-image");
let productName = document.getElementById("product-name");
let productDescription = document.getElementById("product-description");
let productCustom = document.getElementById("custom-choice");
let productPrice = document.getElementById("price-container");

let customProductChosen = document.getElementById("custom-choice");
let customProductChosenValue = 'none';

let addCartButton = document.getElementById("add-cart");
let wholePage = document.querySelector("body");


//Appel au serveur pour récupérer les infos produit
fetch("http://localhost:3000/api/teddies/" + productId)
	.then(response => response.json())
	.then(response => {
		typeof(response); 
		displayProduct(response);
		addEventsListeners(response);
		setProductPageTitle(response); 
		activatePage();
	})
	.catch(error => alert("Vous devez être connecté au serveur pour afficher le produit"));


/* =====================
------- FONCTIONS  -------
===================== */

function displayProduct(product) {
	//on remplit les champs HTML dédiés : 
	productImage.setAttribute("src", product.imageUrl);
	productName.textContent = product.name;
	productDescription.textContent = product.description;
	productPrice.innerHTML = `<span class="price-integer" id="price-integer">${Utils.integerPartOfPrice(product.price)}</span>
					<span class="price-currency">€</span>
					<span class="price-decimal" id="price-decimal">${Utils.decimalPartOfPrice(product.price)}</span>`

	//on remplit les champs du formulaire de choix de personnalisation : 
	for (let i in product.colors) {
		let newOptionForm = document.createElement("option");
		newOptionForm.setAttribute("value", product.colors[i]);
		newOptionForm.textContent = product.colors[i];
		productCustom.appendChild(newOptionForm);
	}
}

function activatePage() { //on supprime les éléments d'UI indiquant le chargement de la page : 
	wholePage.classList.remove("waiting-cursor");
	addCartButton.classList.remove("waiting-cursor");
	addCartButton.classList.replace("btn--inactive", "btn--active");
}

function addEventsListeners(product) { //on gère les événements de la page : 
	//évenement d'ajout au panier : 
	addCartButton.addEventListener('click', function (e) {
		e.preventDefault();
		myCart.addProductInCart(product._id, product.name, product.price, product.imageUrl, customProductChosenValue);
		myCart.updateNumberOfArticles("link-to-cart"); 
	})

	//choix de personnalisation du produit récupéré dans la liste déroulante : 
	customProductChosen.addEventListener('change', function () {
		customProductChosenValue = document.getElementById("custom-choice").value;
		console.log(customProductChosenValue);
	});
}

function setProductPageTitle(product) {
	document.title = `${product.name} – Ours en peluche fabriqués à la main ❤`; 
}