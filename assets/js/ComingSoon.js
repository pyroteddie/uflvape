var Experquery = firebase.database().ref("Experimental").orderByKey();
Experquery.on("value", (snapshot) => {
  document.getElementById("VoteProdContainer").innerHTML = ""
    
  snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();

      document.getElementById("VoteProdContainer").innerHTML += "<div id='VoteProduct'><image class='VoteImg' src="+childData.Image+" /><div id='InfoContainer'><p class='VoteTitle'>"+childData.Name+"</p><p class='VoteABout'>Description:<br>"+childData.About+"</p><p Class='VoteIng'>Ingredients:<br>"+childData.Ingredients+"</p><div id='TotalVotes'><a id='UpVotes'>Up Votes: "+childData.Votes.Up+"</a> <a id='DownVotes'>Down Votes: "+childData.Votes.Down+"</a></div><div id="+key+"> <button onclick='SendVoteU("+ key +")'>Yes</button><button onclick='SendVoteD("+ key +")'>No</button></div></div></div>";
      
      
  });
});

function SendVoteU(ID){
  sessionStorage.setItem('VotedFor', JSON.stringify([{'ProductID':ID,'Voted':'Yes'}]))
  var VotesUpText = firebase.database().ref('Experimental/'+ID+'/Votes');
  VotesUpText.once('value', (snapshot) => {
  const data = snapshot.val();
  VotesUpText.update({ Up: data.Up + 1});
 
});
}
function SendVoteD(ID){
  sessionStorage.setItem('VotedFor', JSON.stringify([{'ProductID':ID,'Voted':'Yes'}]))
  var VotesDownText = firebase.database().ref('Experimental/'+ID+'/Votes');
  VotesDownText.once('value', (snapshot) => {
    const data = snapshot.val();
    VotesDownText.update({ Down: data.Down + 1});
    
  });

}
window.addEventListener('storage', () => {
      var VotesSess = JSON.parse(sessionStorage.VotedFor)
     VotesSess.forEach(HideVote);
      function HideVote(item){
        if(item.Voted === "Yes"){
          document.getElementById(item.ProductID).style.display = 'none'
        }
      }
});
