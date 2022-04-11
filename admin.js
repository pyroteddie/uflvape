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
      //console.log(childData.ID)
      document.getElementById("productsGallery").innerHTML += "<li onclick='ItemSelected("+ key +")'><img src= " + childData.Image + " alt=" + childData.Name +" style='width:100%;height: 150px'><div Class='container'><p style='font-size:20px;'>" + childData.Name +"</p><p class='Cardtitle'>"+ childData.About +"</p><p>" + childData.Rating +"</p></div></li>";
  });
});
//productsGallery
/*<li>
  <img src="img1.jpg" alt="Jane" style="width:100%;height: 150px">
  <div class="container">
    <p style='font-size:20px;'>Jane Doe</p>
    <p class="Cardtitle">CEO &amp; Founder</p>
    <p>Some text that describes me lorem ipsum ipsum lorem.</p>
    <p>example@example.com</p>
  </div>
</li>*/