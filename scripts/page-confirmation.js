let myCart = new Cart();
myCart.displayNumberOfArticles("link-to-cart"); 

let orderId = JSON.parse(localStorage.getItem('order_id')); 

//on génère la réponse HTML : 
let orderFeedback = document.getElementById("order-feedback");
orderFeedback.innerHTML = `<p>Votre commande <strong>${orderId}</strong> est validée ! Nous allons la traiter au plus vite</p>`; 