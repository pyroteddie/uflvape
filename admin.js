
function SignIn(){
  var Email = document.getElementById("SignInEmail").value
  var Password = document.getElementById("SignInPassword").value

  firebase.auth().signInWithEmailAndPassword(Email, Password)
  .then((userCredential) => {
    var user = userCredential.user;
    location.href='./admin_User.html'
    sessionStorage.setItem("SignedIn", True);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Login failed");
  });
}
