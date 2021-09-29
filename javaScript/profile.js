import createAsyncSpotTrybe from "./spotify.js";

// dentro da funcao async
async function getProfileDice(){

  const spotTrybe = await createAsyncSpotTrybe();

  const user = JSON.parse(localStorage.getItem('currentUser'));

  let {display_name, images, followers} = await spotTrybe.getUserProfileInfo(user.spotifyId);  

  changeProfile(display_name, images[0], followers.total);

}

async function userPlaylist() {
  const spotTrybe = await createAsyncSpotTrybe();

  const user = JSON.parse(localStorage.getItem('currentUser'));
  
  const playlists = await spotTrybe.getUserPlaylists(user.spotifyId, 9);

  console.log(playlists);

}


function changeProfile(name, url, followers) {

  document.querySelector('.followers').innerText = followers
  document.querySelector('.image-profile').src = url.url;
  document.querySelector('.name-profile').innerText = name;
}

window.onload = () =>{
  getProfileDice();
  userPlaylist();
};