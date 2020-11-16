let myCart = new Cart();
myCart.displayNumberOfArticles("link-to-cart"); 

let cartContainer = document.getElementById("cart-container");
let confirmButton = document.getElementById("confirm-order");

//vérification du contenu du panier : 
if (myCart.cartIsEmpty()) {
	cartContainer.innerHTML = `<p class="no-products-message">Il n'y a aucun produit dans votre panier actuellement</p>
						<p class="no-products-message"><a href="index.html">Retourner à la liste des produits</a></p>`
} else {
	//appel fonction qui génère le tableau récap du panier :
	myCart.toDisplayCartTable();
}

//gestion suppression des produits du panier : 
let cartTableBody = document.getElementById("cart-table-body");
let delateItems = document.querySelectorAll(".delate-items");
for (let i = 0; i < myCart.content.length; i++) {
	delateItems[i].addEventListener('click', function () {
		/* actions à effectuer au clic sur l'icone delate : 
			1. supprimer la ligne du tableau [i]
			2. supprimer l'objet index [i] dans le panier
			3. mettre à jour le localStorage "cart" 
			4. recharger la page */
		/* 1 */ cartTableBody.removeChild(cartTableBody.children[i]);
		/* 2 */ myCart.content.splice(i, 1);
		/* 3 */	localStorage.setItem("cart", JSON.stringify(myCart.content));
		/* 4 */	location.reload();
	});
}


/* ----------- GESTION DU FORMULAIRE ---------- */
//vérification email du formulaire : 
let emailIsValid = false;
let email = document.getElementById("email");
let feedbackEmail = document.getElementById("feedback-email");
email.addEventListener('input', function () {
	if (Utils.testEmailIsValid(email.value)) {
		feedbackEmail.textContent = "";
		email.classList.remove("email-invalid-border");
		emailIsValid = true;
	} else {
		feedbackEmail.textContent = "Le format d'email n'est pas valide";
		email.classList.add("email-invalid-border");
	}
});

//on vérifie que le formulaire est intégralement rempli pour activer le bouton 'submit' : 
let formIsValid = false;
let formContent = document.querySelector("form");
let feedbackSubmit = document.getElementById("feedback-submit");

formContent.addEventListener('input', function () {
	if (myCart.content.length > 0 && formContent[0].value.length > 0 && formContent[1].value.length > 0 && formContent[2].value.length > 0 && formContent[3].value.length > 0 && emailIsValid) {
		formIsValid = true;
	}
	if (formIsValid) {
		confirmButton.classList.replace("btn--inactive", "btn--active");
		feedbackSubmit.style.opacity = 0;
	}
});


//Gestion de l'événement Validation du formulaire : 
formContent.addEventListener('submit', function (e) {
	e.preventDefault(); 
	//on génère l'objet contact à partir des données du formulaire : 
	let contact = {
		firstName: formContent[0].value,
		lastName: formContent[1].value,
		address: formContent[2].value,
		city: formContent[3].value,
		email: formContent[4].value
	};

	//on récupère les ID des produits dans un array de strings : 
	let products = [];
	for (let i in myCart.content) {
		products.push(myCart.content[i]._id);
	}

	//on gère la requête d'envoi d'order_id, contact, products : 
	// post body data 
	const order = {
		contact: contact,
		products: products,
	};
	console.log(order);
	//request options
	const options = {
		method: 'POST',
		body: JSON.stringify(order),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	}
	fetch("http://localhost:3000/api/teddies/order", options)
		.then(response => response.json())
			.then(response => {
				localStorage.setItem('order_id', JSON.stringify(response.orderId));
				window.location.pathname = "/confirmation.html"; 
			})
		.catch(error => console.log(error));

	//on réinitialise le contenu du panier : 
	myCart.toEmptyCart();
});