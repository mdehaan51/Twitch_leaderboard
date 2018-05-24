var gameID = [];
var gameTitle = [];
var userID = [];
var url = '';
var userName;
var buttonLink = [];

//Main function to get all info about top 10 streams.

$(function twitchTop10() {
$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/helix/streams?first=10',
 headers: {
   'Client-ID': 'u612bmukqyps3s93p24rxckn74ay9t'
 },
  success: function(result){
    console.log(result);
    for(var i = 0; i <= 9; i++){
      gameID[i] = result.data[i].game_id; //save gameIDs for later API 
      userID[i] = result.data[i].user_id; //save userIDs for later API
   viewerCount = result.data[i].viewer_count;
      document.getElementById("viewers" + i).innerHTML = viewerCount + " Active Viewers";     
      document.getElementById("thumbnail"+i).src = result.data[0].thumbnail_url;//print Viewer count to page
     //console.log(userID);
    }
    userNames(); //run function to find user names    
    gameTitles(); //run function to find game titles
}
})
        
//pings Twitch API with user_ids to find appropriate usernames.        
function userNames(){
  var userName = userID.join('&id=');
  console.log(userName);
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/helix/users?id='+ userName,
      async: false,
      headers: {'Client-ID': 'u612bmukqyps3s93p24rxckn74ay9t'
 },
      success: function(result){
      console.log(result);
        for(var j = 0; j <10; j++){
          buttonLink[j] = "https://www.twitch.tv/"+ result.data[j].display_name; //build URLs to make stream links
      document.getElementById("streamer"+ j).innerHTML = j+1 + ") "+ result.data[j].display_name; //print display name to screen
          
      document.getElementById("button"+j).href = buttonLink[j]; //add URLs to href for Watch Now buttons
      document.getElementById("thumbnail"+j).style.backgroundImage = "url{"+result.data[j].profile_image_url+")";

      document.getElementById("thumbnail"+j).src = result.data[j].profile_image_url; //add User Profile Images to page*/
        }
      
      }
    })
  }
})
//pings Twitch API to get game titles from game_id
function gameTitles(){
  var titles = gameID.join('&id='); //builds URL to search for all game_ids at once
   $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/helix/games?id='+ titles,
      async: false,
      headers: {'Client-ID': 'u612bmukqyps3s93p24rxckn74ay9t'
 },
      success: function(result){
        console.log(result);
       for(var k = 0; k < 10; k++){   
         for(var m = 0; m < result.data.length ; m++) 
         if(gameID[k] == result.data[m].id){                  var imgURL = result.data[m].box_art_url;
           imgURL = imgURL.replace("-{width}x{height}","");  
           document.getElementById("game" + k).innerHTML = result.data[m].name;
           document.getElementById("stream" + k).style.backgroundImage = "url("+imgURL+")";
         } 
         //api does not return repeats, so had to search for appopriate match in result.
//To find correct title, each object in the gameID array array is compared 
//to each gameID in this result. When match is found,
//game title is printed to screen.
       }         
        }                        
        })   

    }