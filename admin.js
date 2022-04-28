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
let ImgURLUploaded = null;

function SignIn(){
  var Email = document.getElementById("SignInEmail").value
  var Password = document.getElementById("SignInPassword").value

  firebase.auth().signInWithEmailAndPassword(Email, Password)
  .then((userCredential) => {
    var user = userCredential.user;
    
    sessionStorage.setItem("SignedIn", "True");
    location.replace("./admin_User.html");
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Login failed");
    sessionStorage.setItem("SignedIn", "False");
  });
}

var HomePageText = firebase.database().ref('HomePage/HomeNews/');
HomePageText.on('value', (snapshot) => {
  const data = snapshot.val();
  document.getElementById("HomePageNews").value = data;
});


var query = firebase.database().ref("Products").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      document.getElementById("productsGallery").innerHTML += "<li onclick='ItemSelected("+ key +")'><img src= " + childData.Image + " alt=" + childData.Name +" style='width:100%;height: 150px'><div Class='container'><p style='font-size:20px;'>" + childData.Name +"</p><p class='Cardtitle'>"+ childData.About +"</p><p>Rating: " + childData.Rating +"</p><p>"+childData.Price+"</p</div></li>";
  });
});

var Codequery = firebase.database().ref("Discounts").orderByKey();
Codequery.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      document.getElementById("CodeContainer").innerHTML += "<div class='DiscountCodContainer'>      <p>"+ childSnapshot.key +"</p><a>Start: "+childData.StartDate +" </a><br><a>Finish: "+childData.EndDate +"</a><br><a>Vaild: "+childData.Valid +"</a><br><button onclick='RemoveDiscount("+childSnapshot.key+")' class='ModControlBut'>Remove</button></div>";
  });
});

//remove Discount Code

function RemoveDiscount(Key){
  var GetDicCode = firebase.database().ref('Discounts/' + Key);
  GetDicCode.remove();
}

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
    

  });

  return ProductSelected
}


var uploader = document.getElementById('Adduploader');
var fileButton = document.getElementById('AddProImgUpload');
fileButton.addEventListener('change', function(e){
  var file = e.target.files[0];
  var storageRef = firebase.storage().ref('img/'+file.name);
  var task = storageRef.put(file);
  task.on('state_changed', function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    uploader.value = percentage;

  }, function error(err) {


  },function complete() {
  task.snapshot.ref.getDownloadURL().then((downloadURL) => {
    ImgURLUploaded= downloadURL;
  });
  });
}); 


var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('edProImgUpload');
fileButton.addEventListener('change', function(e){
  var file = e.target.files[0];
  var storageRef = firebase.storage().ref('img/'+file.name);
  var task = storageRef.put(file);
  task.on('state_changed', function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    uploader.value = percentage;

  }, function error(err) {


  },function complete() {
  task.snapshot.ref.getDownloadURL().then((downloadURL) => {
    ImgURLUploaded= downloadURL;
  });
  });
}); 


function RemoveProduct(){
  var GetEditProductInfo = firebase.database().ref('Products/' + ProductSelected);
  GetEditProductInfo.remove();
}


function AddProduct(){
  var ProductLength = firebase.database().ref('Products');
  ProductLength.on('value', (snapshot) => {
  ProLength = snapshot.val();
  console.log(ProLength);
  

  console.log( ProLength.length);

  var GetEditProductInfo = firebase.database().ref('Products/'+ ProLength.length);
  GetEditProductInfo.set({
  Name: document.getElementById("AddProName").value,
  About: document.getElementById("AddProDis").value,
  Ingredients: document.getElementById("AddProIng").value,
  Price: document.getElementById("AddProPrice").value,
  ID: document.getElementById("AddProID").value,
  Rating: document.getElementById("AddProRate").value,
  Category: document.getElementById("AddProCat").value,
  Image: ImgURLUploaded,
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
  ID: document.getElementById("edProID").value,
  Rating: document.getElementById("edProRate").value,
  Category: document.getElementById("edProCat").value,
  Image: ImgURLUploaded || document.getElementById("edProImg").src ,
});
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