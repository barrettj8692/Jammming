let accessToken = undefined;
let expiresIn = undefined;
const clientId = 'fe36e2f3c7904d9bb817580e57d4fdc2';
const redirect_uri = 'http://localhost:3000/';
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-read-collaborative playlist-modify-private playlist-read-private playlist-modify-public&redirect_uri=${redirect_uri}`;
let userId = undefined;
let playlistList = [];
let playlistId = undefined;
let playlistListId = [];





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

  accessTokenCheck(){
    return accessToken;
  },

  search(term){
    this.getAccessToken()
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

  },

  getUserId(){
    this.getAccessToken()
    const getUserIdUrl = 'https://api.spotify.com/v1/me';
    return fetch(getUserIdUrl,{
      headers: {
        'Authorization' : `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse =>{
      console.log(jsonResponse.id);
      userId = jsonResponse.id
    })
  },

  savePlaylistName(playlistName){
    this.getUserId();
    const savePlaylistNameUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
    console.log(savePlaylistNameUrl);
    fetch(savePlaylistNameUrl, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${accessToken}`,
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        name: playlistName,
      })
    })
  },



  getPlaylistName(){
    const getUserIdUrl = 'https://api.spotify.com/v1/me';
    return fetch(getUserIdUrl,{
      headers: {
        'Authorization' : `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(jsonResponse => userId = jsonResponse.id)
    .then(() => {
    const getPlaylistListName = `https://api.spotify.com/v1/users/${userId}/playlists`;
    return fetch(getPlaylistListName, {
      headers: {
        'Authorization' : `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse);
      return jsonResponse.items.map(items => {
        return {
          name: items.name
        }


      });
    });
    })
  },



  savePlaylist(playlistName, playlistTracks) {
    const userUrl = 'https://api.spotify.com/v1/me';
    fetch(userUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(jsonResponse => userId = jsonResponse.id)
    .then(() => {
      const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
      fetch(createPlaylistUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            name: playlistName
          })
        })
        .then(response => response.json())
        .then(jsonResponse => playlistId = jsonResponse.id)
        .then(() => {
          const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
          const playlistTracksUri = [];
          playlistTracks.map(playlistTracks => {
          playlistTracksUri.push(playlistTracks.uri)
          });
          console.log(playlistTracksUri)
          fetch(addPlaylistTracksUrl, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              uris: playlistTracksUri
            })
          }).then(response => {
            console.log(response.json());
          });
        })
    })
  }
}



















  /*playlistId(){

  }

/*
    const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistsId}`
    fetch(addPlaylistTracksUrl, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${accessToken}`,
        'Content-Type' : 'application/json'
        },
        body: {
          track: playlistTracks,
        }
    });
     playlistsId = undefined;



  }*/










export default Spotify;
