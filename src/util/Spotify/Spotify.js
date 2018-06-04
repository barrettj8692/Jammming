let accessToken = undefined;
let expiresIn = undefined;
const clientId = 'fe36e2f3c7904d9bb817580e57d4fdc2';
const redirect_uri = 'http://localhost:3000/';
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;



const Spotify={

  getAccessToken (){
    if (accessToken){
      return accessToken;
    } else {
      const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
      const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
      if (urlAccessToken && urlExpiresIn){
        accessToken = urlAccessToken[1];
        expiresIn = urlExpiresIn[1];
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      } else {
        window.location = spotifyUrl;
      }
    }
  },

  search(term){
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`
    return fetch(searchUrl, {
      headers: {
        'Authorization' : `Bearer ${accessToken}`
      }
    })
    .then(response => {
      return response.json();
    })
    .then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      } else {
        console.log(jsonResponse);
        return jsonResponse.tracks.items.map(track => {
          return{
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            images: track.album.images[2]
          }
        })
      }
    })
  }

}







export default Spotify;
