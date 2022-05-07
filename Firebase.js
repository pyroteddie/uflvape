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
const ananie = firebase.analytics();

var PostageFee = firebase.database().ref('Fees/Postage/');
PostageFee.on('value', (snapshot) => {
  const data = snapshot.val();
  sessionStorage.setItem('Postage', data.Value)
 
});

var pageAny = ananie.logEvent("page_view" ,  { page_location ?: window.location.href , page_path ?: window.location.pathname , page_title ?: document.getElementsByTagName("title")[0].innerHTML })