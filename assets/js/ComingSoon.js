var Experquery = firebase.database().ref("Experimental").orderByKey();
Experquery.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      console.log(childData);

      var itemCat = childData.Name;
     
  
        document.getElementById("VoteProdContainer").innerHTML += "<div id='VoteProduct'>        <image src='' /><p>"+childData.Name+"</p><p>About</p><p>Ingredients</p><div id='TotalVotes'><a id='UpVotes'>Up Votes: 15</a> <a id='DownVotes'>Down Votes: 5</a></div><button onclick='SendVote("Up")'>Yes</button><button onclick='SendVote("Down")'>No</button></div>";
      
      
  });
});