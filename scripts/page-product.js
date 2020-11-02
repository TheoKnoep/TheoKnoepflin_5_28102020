let url = new URL(window.location.href); 
let productId = url.searchParams.get("id"); 

let productImage = document.getElementById("product-image"); 
let productName = document.getElementById("product-name"); 
let productDescription = document.getElementById("product-description"); 
let productPriceInteger = document.getElementById("price-integer"); 
let productPriceDecimal = document.getElementById("price-decimal"); 

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

			//traitement du prix :
			let wholePrice = response[indexWanted].price; 
			productPriceInteger.textContent = Math.floor(wholePrice / 100); 
			let decimalValue = wholePrice % 100; 
			if (decimalValue.toString().length == 1) {
				productPriceDecimal.textContent = '0' + decimalValue; 
			} else if (decimalValue.toString().length == 2) {
				productPriceDecimal.textContent = decimalValue; 
			} else {
				productPriceDecimal.textContent = '??'; 
			}
		})
 	.catch(error => console.error('Erreur de chargement ' + error));