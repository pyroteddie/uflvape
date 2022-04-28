function Menu1Show() {
  var x = document.getElementById("slider1");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function Menu2Show() {
  var x = document.getElementById("slider2");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function Menu3Show() {
  var x = document.getElementById("slider3");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function ProductPage(ProductID){
  var ItemId = ProductID;
  sessionStorage.setItem('ID',ItemId)
  window.location.replace("./pages/productPage.html");

}

function Product1Show() {
  var x = document.getElementById("DetailsMenu1");
  var xx = document.getElementById("DetailsMenu2");
  var xxx = document.getElementById("DetailsMenu3");

  if (x.style.display === "none") {
    x.style.display = "block";
    xx.style.display = "none";
    xxx.style.display = "none";
  }
}
function Product2Show() {
  var x = document.getElementById("DetailsMenu2");
  var xx = document.getElementById("DetailsMenu3");
  var xxx = document.getElementById("DetailsMenu1");
 
  if (x.style.display === "none") {
    x.style.display = "block";
    xx.style.display = "none";
    xxx.style.display = "none";
   }
}
function Product3Show() {
  var x = document.getElementById("DetailsMenu3");
  var xx = document.getElementById("DetailsMenu2");
  var xxx = document.getElementById("DetailsMenu1");

  if (x.style.display === "none") {
    x.style.display = "block";
    xx.style.display = "none";
    xxx.style.display = "none";

}
}

function Drinkshover(element) {
  element.setAttribute('src', 'https://raw.githubusercontent.com/pyroteddie/uflvape/master/assets/3.png');
}

function Drinksunhover(element) {
  element.setAttribute('src', 'https://raw.githubusercontent.com/pyroteddie/uflvape/master/assets/2.png');
}
function Dessertshover(element) {
  element.setAttribute('src', 'https://raw.githubusercontent.com/pyroteddie/uflvape/master/assets/5.png');
}

function Dessertsunhover(element) {
  element.setAttribute('src', 'https://raw.githubusercontent.com/pyroteddie/uflvape/master/assets/4.png');
}
function Fruitshover(element) {
  element.setAttribute('src', 'https://raw.githubusercontent.com/pyroteddie/uflvape/master/assets/7.png');
}

function Fruitsunhover(element) {
  element.setAttribute('src', 'https://raw.githubusercontent.com/pyroteddie/uflvape/master/assets/6.png');
}

window.addEventListener('storage', () => {
  
  var cart = JSON.parse(sessionStorage.Cart);
  document.getElementById('CartLength').innerHTML = cart.length
});