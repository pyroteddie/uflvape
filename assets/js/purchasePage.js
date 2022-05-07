//let cart = [];
if(sessionStorage.Cart === undefined){
  sessionStorage.setItem('Cart',JSON.stringify([]))
}else{

}

function AddToCart(ID){
  cart = JSON.parse(sessionStorage.Cart);
  var ProductInfoCart = firebase.database().ref('Products/' + ID);
  ProductInfoCart.once('value', (snapshot) => {
    const data = snapshot.val();
    var item = [];
    if(cart.length === 0){
      item = {
        "name": data.Name,
        "description": data.ID,
        "Image" :data.Image,
        "Price": data.Price,
        "unit_amount": {
          "currency_code": "AUD",
          "value": data.Price
        },
        "quantity": "1"
        }
      cart.push(item);
      sessionStorage.setItem('Cart',JSON.stringify(cart));
      ananie.logEvent(firebase.analytics.EventName.ADD_TO_CART,  cart)
    }else{
      if (cart.some(Cart => Cart.name === data.Name)) {
          cart.forEach(Item =>{
            if(Item.name === data.Name){
              console.log(Item.name);
              var itemQuantity = Number(Item.quantity) + 1;
              var itemPrice = Number(data.Price) * itemQuantity;
              Item.quantity = itemQuantity;
              Item.Price = itemPrice;
              sessionStorage.setItem('Cart',JSON.stringify(cart))
              ananie.logEvent(firebase.analytics.EventName.ADD_TO_CART,  cart)
              }
            });
      }else{
        item = {
          "name": data.Name,
          "description": data.ID,
          "Image" :data.Image,
          "Price": data.Price,
          "unit_amount": {
            "currency_code": "AUD",
            "value": data.Price
          },
          "quantity": "1"
        }
        cart.push(item);
        //console.log(cart)
        sessionStorage.setItem('Cart',JSON.stringify(cart))
        ananie.logEvent(firebase.analytics.EventName.ADD_TO_CART,  cart)
      }
   }
  });
}

var Menuquery = firebase.database().ref("Products").orderByKey();
Menuquery.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      var itemCat = childData.Fav

      if (itemCat === 'on' ){
        document.getElementById("FavGallery").innerHTML += "<li onclick='ProductPage("+ key +")' class='Favcontainer'><img src= " + childData.Image + " alt=" + childData.Name +" Class='Favimage'><div Class='Favoverlay'><p>" + childData.Name +"</p><p>$" + childData.Price +"</p></div></li >";
      
      } 
  });
});