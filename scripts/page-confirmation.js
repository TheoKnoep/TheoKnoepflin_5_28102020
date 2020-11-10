//let myCart = new Cart(); 

let orderId = JSON.parse(localStorage.getItem('order_id')); 
console.log(orderId); 


//on génère la réponse HTML : 
let orderFeedback = document.getElementById("order-feedback");
orderFeedback.innerHTML = `<p>Votre commande <strong>${orderId}</strong> est validée ! Nous allons la traiter au plus vite</p>`; 

