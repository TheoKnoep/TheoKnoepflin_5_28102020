let myCart = new Cart();
myCart.displayNumberOfArticles("link-to-cart"); 

let orderId = JSON.parse(localStorage.getItem('order_id')); 

//on génère la réponse HTML : 
let orderFeedback = document.getElementById("order-feedback");
if (orderId != null) {
	orderFeedback.innerHTML = `<p>Votre commande n° <strong class="confirmation-style">${orderId}</strong> est validée ! Nous allons la traiter au plus vite</p>`; 
}