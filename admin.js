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
      document.getElementById("productsGallery").innerHTML += "<li onclick='ItemSelected("+ key +")'><img src= " + childData.Image + " alt=" + childData.Name +" style='width:100%;height: 150px'><div Class='container'><p style='font-size:20px;'>" + childData.Name +"</p><p class='Cardtitle'>"+ childData.About +"</p><p>" + childData.Rating +"</p></div></li>";
  });
});

function ItemSelected(ID){
  ProductSelected = ID;
return ProductSelected
}
//PEditCard

//PAddCard

function HidePEditCard(){
  console.log(ProductSelected);
  var ProductID = ID;
  var Card = document.getElementById("PEditCard").style
  //Get Firebase Data
    var GetEditProductInfo = firebase.database().ref('Products/' & ProductSelected);
    GetEditProductInfo.on('value', (snapshot) => {
    const data = snapshot.val();
    document.getElementById("edProImg").src = data.Image;
    document.getElementById("edProName").value = data.Name;
    document.getElementById("edProDis").value = data.About;
    document.getElementById("edProIng").value = data.Ingredients;
    document.getElementById("edProID").value = data.ID;
    document.getElementById("edProRate").value = data.Rating;
    document.getElementById("edProCat").value = data.Category;
    /document.getElementById("edProImgUpload").value = data.Name;

});
  
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