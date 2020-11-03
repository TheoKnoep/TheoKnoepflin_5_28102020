let url = new URL(window.location.href); 
let productId = url.searchParams.get("id"); 

let productImage = document.getElementById("product-image"); 
let productName = document.getElementById("product-name"); 
let productDescription = document.getElementById("product-description"); 
let productCustom = document.getElementById("custom-choice"); 
let productPriceInteger = document.getElementById("price-integer"); 
let productPriceDecimal = document.getElementById("price-decimal"); 

let addCartButton = document.getElementById("add-cart"); 
let wholePage = document.querySelector("body"); 

fetch("http://localhost:3000/api/teddies")
	.then(response => response.json())
    		.then(response => {
			//on identifie l'index du produit voulu à partir de son index passé en paramètre d'URL : 
			let listOfIds = []; 
			for (let i in response) {
				listOfIds.push(response[i]._id); 
			}
			let indexWanted = listOfIds.indexOf(productId); 

			//on remplit les champs HTML dédiés : 
			productImage.setAttribute("src", response[indexWanted].imageUrl); 
			productName.textContent = response[indexWanted].name; 
			productDescription.textContent = response[indexWanted].description; 

			//on remplit les champs du formulaire de choix de personnalisation : 
			for (let i in response[indexWanted].colors) {
				let newOptionForm = document.createElement("option"); 
				newOptionForm.setAttribute("value", i); 
				newOptionForm.textContent = response[indexWanted].colors[i]; 
				productCustom.appendChild(newOptionForm); 
			}

			//traitement du prix :
			let wholePrice = response[indexWanted].price; 
			productPriceInteger.textContent = Math.floor(wholePrice / 100); 
			let decimalValue = wholePrice % 100; 
			if (decimalValue.toString().length == 1) {
				productPriceDecimal.textContent = '0' + decimalValue; 
			} else {
				productPriceDecimal.textContent = decimalValue; 
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
	console.log(typeof(myCart)); 
	console.log(`AJOUTER AU PANIER : 
		Nom : ${productName.textContent}, 
		Url : ${window.location.href}, 
		Image : ${productImage.src}, 
		Prix : ${productPriceInteger.textContent},${productPriceDecimal.textContent}, 
		Custom_ID : ${customProductChosenId}, 
		Custom_name : ?`); 
	myCart.push(
		{
			name: productName.textContent, 
			url: window.location.href, 
			image: productImage.src, 
			price_integer: productPriceInteger.textContent,
			price_decimal: productPriceDecimal.textContent, 
			Custom_ID: customProductChosenId
		}
	)
	console.log(myCart); 
	localStorage.setItem("cart", JSON.stringify(myCart));
}); 