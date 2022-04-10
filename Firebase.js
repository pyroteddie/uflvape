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

var starCountRef = firebase.database().ref('Products/asduhfsdf/');
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
  snapshot.child("asduhfsdf").child("last").val();
    console.log(data)
});

var HomePageText = firebase.database().ref('HomePage/HomeNews/');
HomePageText.on('value', (snapshot) => {
  const data = snapshot.val();
  document.getElementById("HomePageText").innerHTML = data;
});