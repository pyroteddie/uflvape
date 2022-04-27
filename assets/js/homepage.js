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