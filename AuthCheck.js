if(sessionStorage.getItem("SignedIn") == null && window.location.href =='./index.html' ){
  location.href='./index.html'
} else {
  location.href='./admin_User.html'
}

console.log(window.location.href =='./index.html');