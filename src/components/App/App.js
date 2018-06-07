import React, { Component } from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify/Spotify';
import NewPlaylist from '../NewPlaylist/NewPlaylist';
import FloatBox from '../FloatBox/FloatBox';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults:[],
      playlistName: "My Playlist",
      playlistTracks:[],
      playlistNames: [],
      style: "none"
      }

      this.removeTrack=this.removeTrack.bind(this);
      this.addTrack = this.addTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.search = this.search.bind(this);
      this.savePlaylist=this.savePlaylist.bind(this);
      this.playlistClear = this.playlistClear.bind(this);
      this.floatBoxYes= this.floatBoxYes.bind(this);
      this.floatBoxNo= this.floatBoxNo.bind(this);
      this.playlistDup= this.playlistDup.bind(this);

    }


/* Add Treack to Playlist */

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (!this.state.playlistTracks.includes(track)) {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

/* Remove Track From Playlist */

  removeTrack(track){
    const removeTrack = this.state.playlistTracks.filter(playlistTrack => track.id !== playlistTrack.id);
    this.setState({playlistTracks : removeTrack});
  }

/* Clear current playlist */

  playlistClear(){
    const clearPlaylist = [];
    const clearName = "My Playlist";
    this.setState ({playlistTracks: clearPlaylist});
    this.setState ({playlistName: clearName});
  }

/* Check for duplicate playlist on Spotify */

  playlistDup(){
    const style = "block";
    this.setState ({style : style})
  }

/* Error box for dup playlist */

  floatBoxYes() {
    let playlistName = this.state.playlistName;
    let playlistTracks = this.state.playlistTracks;
    const style = "none";
    this.setState ({style : style});
    Spotify.saveToExsistingPlaylist(playlistName, playlistTracks);
  }

  floatBoxNo() {
    const style = "none";
    this.setState ({style : style})
  }

  updatePlaylistName(name){
    this.setState ({playlistName: name})
  }

/* SearchBar function and Only display songs not currently present in the playlist in the search results */

  search(term){
    let playlistTracks = this.state.playlistTracks;
    let playlistId = [];
    playlistTracks.map(tracks => {
      playlistId.push(tracks.id);
    })
    Spotify.search(term).then(searchResults => {
      let playlistTracks = this.state.playlistTracks;
      let searchResultsFilter = [];
      searchResults.forEach(tracks => {
        if(playlistTracks.length === 0 ) {
          searchResultsFilter.push(tracks)
        } else if(!playlistId.includes(tracks.id)) {
          searchResultsFilter.push(tracks);
        }
      })
      this.setState ({searchResults : searchResultsFilter});
    });
  }

/* Saving playlist */

  savePlaylist(){
    let playlistTracks = this.state.playlistTracks;
    if(!Spotify.accessTokenCheck()){
      Spotify.getAccessToken();
    }
    Spotify.getPlaylistName()
    .then(playlistNames => {
      this.setState({playlistNames: playlistNames})
    })
    .then(() => {
      let playlistName = this.state.playlistName;
      const playlistNames = [];
      this.state.playlistNames.map(playlist =>
        playlistNames.push(playlist.name));
      if(!playlistNames.includes(playlistName)) {
        Spotify.savePlaylist(playlistName, playlistTracks);
      } else {
        this.playlistDup();
      }
    })
  }

  render() {
    return (
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <FloatBox
          clickNo = {this.floatBoxNo}
          clickYes = {this.floatBoxYes}
          style={this.state.style}/>
        <div className="App-playlist">
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}/>
          <div className="NewPlaylist">
            <NewPlaylist
              playlistClear = {this.playlistClear}/>
            <Playlist
              playlistTracks={this.state.playlistTracks}
              playlistName={this.state.playlistName}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              savePlaylist={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }

}


export default App;


/* search(term){
  let playlistTracks = this.state.playlistTracks;
  let playlistId = [];
  playlistTracks.map(tracks => {
    playlistId.push(tracks.id);
  })
  console.log(playlistId);
  let searchResultsId = [];
  let searchResultsFilter = [];

  Spotify.search(term).then(searchResults => {
    searchResults.forEach(tracks => {
      console.log(tracks)
      console.log(playlistId)
      if(playlistId.length === 0 ) {
        searchResultsFilter.push(tracks);
        console.log(searchResultsFilter)
      } else if(!tracks.id.includes(playlistId)) {
        searchResultsFilter.push(tracks);
      }
    })
    this.setState ({searchResults : searchResultsFilter});
  });
  this.setState ({searchResults : searchResultsFilter});
  console.log(searchResultsFilter)
} */
