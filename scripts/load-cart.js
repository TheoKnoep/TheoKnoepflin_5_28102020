//on récupère le contenu du panier du localStorage s'il existe, on initialise un panier vide sinon :
console.log(JSON.parse(localStorage.getItem("cart"))); 
let myCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []; 
console.log(myCart); 