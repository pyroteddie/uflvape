var Menuquery = firebase.database().ref("Products").orderByKey();
Menuquery.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      
      var itemCat = childData.Category

      if (itemCat === 'Drink'){
        document.getElementById("slider1").innerHTML += "<dt onclick='ProductPage("+ key +")'>"+ childData.Name +"</dt>";
      
      } else if (itemCat === 'Fruit'){
        document.getElementById("slider3").innerHTML += "<dt onclick='ProductPage("+ key +")'>"+ childData.Name +"</dt>";
      
      } else if (itemCat === 'Dessert'){
        document.getElementById("slider2").innerHTML += "<dt onclick='ProductPage("+ key +")'>"+ childData.Name +"</dt>";
      }
  });
});

var Menuquery = firebase.database().ref("Products").orderByKey();
Menuquery.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
        document.getElementById("ProGallery").innerHTML += "<div onclick='ProductPage("+ key +")' class='Procontainer'><img src= " + childData.Image + " alt=" + childData.Name +" Class='ProImage'><div Class='Prooverlay'><p>" + childData.Name +"</p><p>$" + childData.Price +"</p></div></div>";
  });
});

var Menuquery = firebase.database().ref("Products").orderByKey();
Menuquery.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      
      var itemCat = childData.Fav
      if (itemCat === 'true' ){
        document.getElementById("FavGallery").innerHTML += "<li onclick='ProductPage("+ key +")' class='Favcontainer'><img src= " + childData.Image + " alt=" + childData.Name +" Class='Favimage'><div Class='Favoverlay'><p>" + childData.Name +"</p><p>$" + childData.Price +"</p></div></li >";
      
      } 
  });
});


var HomePageText = firebase.database().ref('HomePage/HomeNews/');
HomePageText.on('value', (snapshot) => {
  const data = snapshot.val();
  document.getElementById("HomePageText").innerHTML = data;
});