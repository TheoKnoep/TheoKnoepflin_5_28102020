let myCart = new Cart(); 


fetch("http://localhost:3000/api/teddies/order")
	.then(response => response.json())
    		.then(response => {
			    console.log(response); 
		})
 	.catch(error => console.log(error));


//on génère la réponse HTML : 
//const orderFeedback = document.getElementById("order-feedback");
//orderFeedback.textContent = `Votre commande n° ${response.order_id} est validée ! Nous allons la traiter au plus vite`; 

