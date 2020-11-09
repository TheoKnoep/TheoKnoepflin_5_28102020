let myCart = new Cart(); 
myCart.displayCartInConsole(); 

//on génère l'objet contact à partir des données du formulaire : 
let contact = {
	firstName: string,
	lastName: string,
	address: string,
	city: string,
	email: string
}

//générer un numéro de commande : 
const d = new Date; 
const orderID = `${d.getFullYear()}-${d.getMonth() + 1}-${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`; 

// post body data 
const order = {
	contact: contactInfo, 
	products: myCart.content, 
	orderID: orderID
};

/*
// request options
const options = {
	method: 'POST',
	body: JSON.stringify(order)
}
// on envoie la requête POST : 
fetch("http://localhost:3000/api/teddies/order", options)
	.then(res => res.json())
	.then(res => console.log(res));
*/

//on génère la réponse HTML : 
const orderFeedback = document.getElementById("order-feedback");
orderFeedback.textContent = `Votre commande n° ${orderID} est validée ! Nous allons la traiter au plus vite`; 

//on réinitialise le contenu du panier : 
myCart.toEmptyCart(); 