const firebaseConfig = {
  apiKey: "AIzaSyA6dKOg2UhZ9ZtGfR69fu0NQbXoMhI7xMI",
  authDomain: "uflvape.firebaseapp.com",
  databaseURL: "https://uflvape-default-rtdb.firebaseio.com",
  projectId: "uflvape",
  storageBucket: "uflvape.appspot.com",
  messagingSenderId: "106139754407",
  appId: "1:106139754407:web:83bc6f215d35d898b4a082",
  measurementId: "G-T1SKXL2QX2"
};

firebase.initializeApp(firebaseConfig);
let ProductSelected = -1;
let LabProductSelected = -1;
let ImgURLUploaded1 = null;
let ImgURLUploaded2 = null;
let ImgURLUploaded3 = null;
let ImgURLUploaded4 = null;


function SignIn(){
  var Email = document.getElementById("SignInEmail").value
  var Password = document.getElementById("SignInPassword").value

  firebase.auth().signInWithEmailAndPassword(Email, Password)
  .then((userCredential) => {
    var user = userCredential.user;
    
    sessionStorage.setItem("SignedIn", true);
    location.replace("./admin_User.html");
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Login failed");
    sessionStorage.setItem("SignedIn", false);
  });
}



var HomePageText = firebase.database().ref('HomePage/HomeNews/');
HomePageText.on('value', (snapshot) => {
  const data = snapshot.val();
  document.getElementById("HomePageNews").value = data;
});


const Productref = firebase.database().ref('Products');
// Attach an asynchronous callback to read the data at our posts reference
Productref.on('value', (snapshot) => {
  document.getElementById("productsGallery").innerHTML = ''
  var query = firebase.database().ref("Products").orderByKey();
  query.once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        document.getElementById("productsGallery").innerHTML += "<li onclick='ItemSelected("+ key +")'><img src= " + childData.Image + " alt=" + childData.Name +" style='width:100%;height: 150px'><div Class='container'><p style='font-size:20px;'>" + childData.Name +"</p><p class='Cardtitle'>"+ childData.About +"</p><p>Rating: " + childData.Rating +"</p><p>$"+childData.Price+"</p</div></li>";
    });
  });
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});



//remove Discount Code

function RemoveDiscount(Key){
  var GetDicCode = firebase.database().ref('Discounts/' + Key);
  GetDicCode.remove();
}


const ref = firebase.database().ref('Discounts');
// Attach an asynchronous callback to read the data at our posts reference
ref.on('value', (snapshot) => {
  document.getElementById("CodeContainer").innerHTML = ''
  var Codequery = firebase.database().ref("Discounts").orderByKey();
  Codequery.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      document.getElementById("CodeContainer").innerHTML += "<div class='DiscountCodContainer'>      <p>"+ childSnapshot.key +"</p><a>Start: "+childData.StartDate +" </a><br><a>Finish: "+childData.EndDate +"</a><br><a>Vaild: "+childData.Valid +"</a><br><button onclick="+"RemoveDiscount('"+childSnapshot.key+"')"+" class='ModControlBut'>Remove</button></div>";
  });
});
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});

// add Discount Code
function AddDiscountCode(){
  var CodeName = document.getElementById("DisCodeName").value
  var dicountAmount = Number(document.getElementById("DisCodeAmount").value) / 100;
  var GetEditProductInfo = firebase.database().ref('Discounts/'+ CodeName);
    GetEditProductInfo.set({
    Discount: dicountAmount,
    StartDate: document.getElementById("DisCodeStart").value,
    EndDate: document.getElementById("DisCodeFinish").value,
    Valid: document.getElementById("DisCodeValid").value,
    
    });
 
}

function ItemSelected(ID){
    ProductSelected = ID;
    var GetEditProductInfo = firebase.database().ref('Products/' + ProductSelected);
    GetEditProductInfo.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    document.getElementById("edProImg").src = data.Image;
    document.getElementById("edProName").value = data.Name;
    document.getElementById("edProDis").value = data.About;
    document.getElementById("edProIng").value = data.Ingredients;
    document.getElementById("edProID").value = data.ID;
    document.getElementById("edProRate").value = data.Rating;
    document.getElementById("edProCat").value = data.Category;
    document.getElementById("edProPrice").value = data.Price;
    document.getElementById('edProFav').Value = data.Fav;

  });

  return ProductSelected
}


var uploader1 = document.getElementById('Adduploader');
var fileButton = document.getElementById('AddProImgUpload');
fileButton.addEventListener('change', function(e){
  var file = e.target.files[0];
  var storageRef = firebase.storage().ref('img/'+file.name);
  var task = storageRef.put(file);
  task.on('state_changed', function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    uploader1.value = percentage;

  }, function error(err) {


  },function complete() {
  task.snapshot.ref.getDownloadURL().then((downloadURL) => {
    ImgURLUploaded1= downloadURL;
    document.getElementById('AddProImg').src = ImgURLUploaded1;
  });
  });
}); 


var uploader2 = document.getElementById('uploader2');
var fileButton = document.getElementById('edProImgUpload');
fileButton.addEventListener('change', function(e){
  var file = e.target.files[0];
  var storageRef = firebase.storage().ref('img/'+file.name);
  var task = storageRef.put(file);
  task.on('state_changed', function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    uploader2.value = percentage;

  }, function error(err) {


  },function complete() {
  task.snapshot.ref.getDownloadURL().then((downloadURL) => {
    ImgURLUploaded2= downloadURL;
    document.getElementById('edProImg').src = ImgURLUploaded2;
  });
  });
}); 


function RemoveProduct(){
  var GetEditProductInfo = firebase.database().ref('Products/' + ProductSelected);
  GetEditProductInfo.remove();
}


function AddProduct(){
  var ProductLength = firebase.database().ref('Products');
  ProductLength.once('value', (snapshot) => {
  ProLength = snapshot.val();
  var GetEditProductInfo = firebase.database().ref('Products/'+ ProLength.length);
  GetEditProductInfo.set({
  Name: document.getElementById("AddProName").value,
  About: document.getElementById("AddProDis").value,
  Ingredients: document.getElementById("AddProIng").value,
  Price: document.getElementById("AddProPrice").value,
  Fav: document.getElementById('AddProFav').value,
  ID: document.getElementById("AddProID").value,
  Rating: document.getElementById("AddProRate").value,
  Category: document.getElementById("AddProCat").value,
  Image: ImgURLUploaded1,
  });
  });
}

function UpdateProduct(){
  var GetEditProductInfo = firebase.database().ref('Products/' + ProductSelected);
  GetEditProductInfo.set({
  Name: document.getElementById("edProName").value,
  About: document.getElementById("edProDis").value,
  Ingredients: document.getElementById("edProIng").value,
  Price: document.getElementById("edProPrice").value,
  Fav: document.getElementById('edProFav').value,
  ID: document.getElementById("edProID").value,
  Rating: document.getElementById("edProRate").value,
  Category: document.getElementById("edProCat").value,
  Image: ImgURLUploaded2 || document.getElementById("edProImg").src ,
});
document.getElementById("edProImg").src = "";
document.getElementById("edProName").value = "";
document.getElementById("edProDis").value = "";
document.getElementById("edProIng").value = "";
document.getElementById("edProID").value = "";
document.getElementById("edProRate").value = "";
document.getElementById("edProCat").value = "";
document.getElementById("edProPrice").value = "";
document.getElementById('edProFav').Value = "";


}

function HidePEditCard(){
    var Card = document.getElementById("PEditCard").style
  //Get Firebase Data
    var GetEditProductInfo = firebase.database().ref('Products/' + ProductSelected);
    GetEditProductInfo.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    document.getElementById("edProImg").src = data.Image;
    document.getElementById("edProName").value = data.Name;
    document.getElementById("edProDis").value = data.About;
    document.getElementById("edProIng").value = data.Ingredients;
    document.getElementById("edProID").value = data.ID;
    document.getElementById("edProRate").value = data.Rating;
    document.getElementById("edProCat").value = data.Category;
    //document.getElementById("edProImgUpload").value = data.Name;

});
// Display Card
  if(Card.display == 'block'){
    Card.display = 'none'
  }else{
    Card.display = 'block'
  }
}
function HidePAddCard(){
  var Card = document.getElementById("PAddCard").style;

  if(Card.display == 'block'){
    Card.display = 'none'
  }else{
    Card.display = 'block'
  }

}

function UpdateNews(){
  var GetEditProductInfo = firebase.database().ref('HomePage/');
  GetEditProductInfo.set({
  HomeNews: document.getElementById("HomePageNews").value,
  
});
}
function ShowAddCode(){

  var container = document.getElementById('AddCodeBox').style;
  console.log(container.display)
  if(container.display === 'none'){
    container.display = 'block';
  }else{
    container.display = 'none'
  }
}

// -------------------------------------The Lab Section-------------------------------------------

function ItemLabSelected(ID){
  LabProductSelected = ID;
  var GetEditProductInfo = firebase.database().ref('Experimental/' + LabProductSelected);
  GetEditProductInfo.on('value', (snapshot) => {
  const data = snapshot.val();
  document.getElementById("edLabProImg").src = data.Image;
  document.getElementById("edLabProName").value = data.Name;
  document.getElementById("edLabProDis").value = data.About;
  document.getElementById("edLabProIng").value = data.Ingredients;
  document.getElementById("edLabProID").value = data.ID;
  document.getElementById("edLabProCat").value = data.Category;
  

  });

  return LabProductSelected
  }

function HidePLabEditCard(){
  var Card = document.getElementById("PEditLabCard").style
  var GetEditProductInfo = firebase.database().ref('Experimental/' + LabProductSelected);
  GetEditProductInfo.on('value', (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  document.getElementById("edLabProImg").src = data.Image;
  document.getElementById("edLabProName").value = data.Name;
  document.getElementById("edLabProDis").value = data.About;
  document.getElementById("edLabProIng").value = data.Ingredients;
  document.getElementById("edLabProID").value = data.ID;
  document.getElementById("edLabProRate").value = data.Rating;
  document.getElementById("edLabProCat").value = data.Category;
  //document.getElementById("edProImgUpload").value = data.Name;

  });
  // Display Card
  if(Card.display == 'block'){
    Card.display = 'none'
  }else{
    Card.display = 'block'
  }
  }

function HidePLabAddCard(){
    var Card = document.getElementById("PAddLabCard").style;
    if(Card.display == 'block'){
      Card.display = 'none'
    }else{
      Card.display = 'block'
    }
  }

function RemoveLabProduct(){
  document.getElementById("edLabProName").value = ''
  document.getElementById("edLabProDis").value = ''
  document.getElementById("edLabProIng").value = ''
  document.getElementById("edLabProPrice").value = ''
  document.getElementById("edLabProID").value = ''
  document.getElementById("edLabProRate").value = ''
  document.getElementById("edLabProCat").value = ''
  document.getElementById("edLabProImg").src  = ''
  var GetEditProductInfo = firebase.database().ref('Experimental/' + LabProductSelected);
  GetEditProductInfo.remove();
  }


function AddLabProduct(){
  var ProductLength = firebase.database().ref('Experimental');
  ProductLength.once('value', (snapshot) => {
  ProLength = snapshot.val();
  var childern = snapshot.numChildren();

  var GetEditProductInfo = firebase.database().ref('Experimental/'+ childern);
  GetEditProductInfo.set({
  Name: document.getElementById("AddLabProName").value,
  About: document.getElementById("AddLabProDis").value,
  Ingredients: document.getElementById("AddLabProIng").value,
  ID: document.getElementById("AddLabProID").value,
  Category: document.getElementById("AddLabProCat").value,
  Image: ImgURLUploaded3,
  Votes:{Up:0,Down:0}
  });
  });
}

function UpdateLabProduct(){
  var ProductsLength = firebase.database().ref('Products');
  ProductsLength.once('value', (snapshot) => {
  var Proslength = snapshot.numChildren();
  var GetEditProductInfo = firebase.database().ref('Products/' + Proslength);
  GetEditProductInfo.set({
  Name: document.getElementById("edLabProName").value,
  About: document.getElementById("edLabProDis").value,
  Ingredients: document.getElementById("edLabProIng").value,
  Price: document.getElementById("edLabProPrice").value,
  ID: document.getElementById("edLabProID").value,
  Rating: document.getElementById("edLabProRate").value,
  Category: document.getElementById("edLabProCat").value,
  Image: ImgURLUploaded4 || document.getElementById("edLabProImg").src ,
});
});
}

const Experimentalref = firebase.database().ref('Experimental');
Experimentalref.on('value', (snapshot) => {
  document.getElementById("LabGallery").innerHTML = '';
      snapshot.forEach(function(childSnapshot) {

        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        document.getElementById("LabGallery").innerHTML += "<li onclick='ItemLabSelected("+ key +")'><img src= " + childData.Image + " style='width:150px;height:150px'><div Class='container'><p style='font-size:20px;'>" + childData.Name +"</p><p class='Cardtitle'>"+ childData.About +"</p><p style='color:green'>Up: " + childData.Votes.Up +"</p><p style='color:crimson'>Down: " + childData.Votes.Down +"</p></div></li>";
    });
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});

var uploader3 = document.getElementById('AddLabuploader');
var fileButton = document.getElementById('AddLabProImgUpload');
fileButton.addEventListener('change', function(e){
  var file = e.target.files[0];
  var storageRef = firebase.storage().ref('img/'+file.name);
  var task = storageRef.put(file);
  task.on('state_changed', function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    uploader3.value = percentage;

  }, function error(err) {
    alert(err)

  },function complete() {
  task.snapshot.ref.getDownloadURL().then((downloadURL) => {
    ImgURLUploaded3 = downloadURL;
    document.getElementById('AddLabProImg').src = ImgURLUploaded3;
  });
  });
}); 
var uploader4 = document.getElementById('Labuploader');
var fileButton = document.getElementById('edLabProImgUpload');
fileButton.addEventListener('change', function(e){
  var file = e.target.files[0];
  var storageRef = firebase.storage().ref('img/'+file.name);
  var task = storageRef.put(file);
  task.on('state_changed', function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    uploader4.value = percentage;

  }, function error(err) {
    alert(err)

  },function complete() {
  task.snapshot.ref.getDownloadURL().then((downloadURL) => {
    ImgURLUploaded4 = downloadURL;
    document.getElementById('edLabProImg').src = ImgURLUploaded4;
  });
  });
}); 


/* ---------------------------------------- Order Section ----------------------------------------*/

const Ordersref = firebase.database().ref('Orders');
Ordersref.on('value', (snapshot) => {
  //document.getElementById("OrderList").innerHTML = '';
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        var OrderDetails = ''; 
        var TotalCost = '';

        console.log(childData);
        var Items = childData.orderData.purchase_units[0].items;
        var shipping = childData.orderData.purchase_units[0].shipping.address;
        var ShippingCost = childData.orderData.purchase_units[0].amount.breakdown.shipping.value;
        var client = childData.orderData.payer
        var d = new Date(childData.orderData.create_time)
        var OrderDate = d.getDate() +"/"+ Number(d.getMonth() + 1) +"/"+ d.getFullYear() +" - " +d.getHours()+":"+d.getMinutes()

        Items.forEach(i => {
          OrderDetails += "<a>"+i.name+" 100ml x "+i.quantity + " = "+ Number(i.quantity) * Number(i.unit_amount.value) +" </a>" 
          TotalCost =  Number(TotalCost) + (Number(i.quantity) * Number(i.unit_amount.value))
        })
        console.log(TotalCost);


        document.getElementById("OrderList").innerHTML += "  <div ><p onclick="+"ShowOrderCard('"+key +"') "+" class='OrderHead'> -> "+client.name.given_name +" "+client.name.surname+ " - Status: Pending <a style='margin-left:15px'>Order Placed: "+OrderDate+"</a></p><div id="+key+" class='OrderCard' style='display:none'><div class='orderBox'><h2>Order</h2>"+OrderDetails+"<br><a>Total cost: $"+TotalCost+"</a><a>Shipping: $"+ShippingCost+"</a><a>Grand Total: $"+( Number(TotalCost) + Number(ShippingCost) )+ " </a></div><div class='orderBox'><h2>Shipping</h2><a>Name: "+client.name.given_name +" "+client.name.surname+ "</a><a>"+shipping.address_line_1 +"</a><a>"+shipping.admin_area_1+"</a><a>"+shipping.admin_area_2+"</a><a>"+shipping.country_code+"</a><a>"+shipping.postal_code+"</a></div><br><br><button >Complete</button></div></div>";
    });
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});


function ShowOrderCard(ID){
  var OrderDis = document.getElementById(ID).style;
  
  if(OrderDis.display === 'none'){
    OrderDis.display = 'inline-block';
  }else{
    OrderDis.display = 'none'
  }

}