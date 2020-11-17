let myCart = new Cart();
myCart.displayNumberOfArticles("link-to-cart"); 

let orderId = JSON.parse(localStorage.getItem('order_id')); 

let sumOfCart = myCart.calculateSumOfCart(); 

//on génère la réponse HTML : 
let orderFeedback = document.getElementById("order-feedback");
if (orderId != null) {
	orderFeedback.innerHTML = `<p>Votre commande n° <strong class="confirmation-style">${orderId}</strong> d'un montant total de <strong>${Utils.integerPartOfPrice(sumOfCart)},${Utils.decimalPartOfPrice(sumOfCart)}&nbsp;€</strong> est validée !<br/>Nous allons la traiter au plus vite</p>`; 
}

myCart.toEmptyCart(); 
myCart.updateNumberOfArticles("link-to-cart"); 