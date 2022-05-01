//let cart = [];
if(sessionStorage.Cart === undefined){
  sessionStorage.setItem('Cart',JSON.stringify([]))
}else{

}

function AddToCart(ID){
  cart = JSON.parse(sessionStorage.Cart ) || [];

  var ProductInfoCart = firebase.database().ref('Products/' + ID);
  ProductInfoCart.once('value', (snapshot) => {
    const data = snapshot.val();
    var item = {
      "name": data.Name,
      "description": data.ID,
      "Image" :data.Image,
      "unit_amount": {
        "currency_code": "AUD",
        "value": data.Price
      },
      "quantity": "1"
    }

    cart.push(item);
    console.log(cart)
    sessionStorage.setItem('Cart',JSON.stringify(cart))

  });


}