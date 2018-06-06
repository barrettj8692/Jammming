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

    addTrack(track) {
      let tracks = this.state.playlistTracks;
      if (!this.state.playlistTracks.includes(track)) {
        tracks.push(track);
        this.setState({playlistTracks: tracks});
      }
    }


    removeTrack(track){
      const removeTrack = this.state.playlistTracks.filter(playlistTrack => track.id !== playlistTrack.id);
      this.setState({playlistTracks : removeTrack});

    }

    playlistClear(){
      const clearPlaylist = [];
      const clearName = "My Playlist";
      this.setState ({playlistTracks: clearPlaylist});
      this.setState ({playlistName: clearName});
    }

    playlistDup(){
      const style = "block";
      this.setState ({style : style})

    }

    floatBoxYes() {
      const style = "none";
      this.setState ({style : style})
      console.log(this.state.style)

    }

    floatBoxNo() {
      const style = "none";
      this.setState ({style : style})
    }

    updatePlaylistName(name){
      this.setState ({playlistName: name})
    }

    search(term){
      Spotify.search(term).then(searchResults => this.setState ({searchResults : searchResults}));
    }

    savePlaylist(){
      let playlistName = this.state.playlistName;
      let playlistTracks = this.state.playlistTracks;
      if(!Spotify.accessTokenCheck()){
        Spotify.getAccessToken();
      }
      Spotify.getPlaylistName()
      .then(playlistNames => {
        this.setState({playlistNames: playlistNames})
        console.log(this.state.playlistNames)
      })
      .then(() => {
      let playlistName = this.state.playlistName;
      const playlistNames = [];
      this.state.playlistNames.map(playlist =>
        playlistNames.push(playlist.name));
      console.log(playlistName);
      console.log(playlistNames);
      console.log(playlistNames.includes(playlistName))
      if(!playlistNames.includes(playlistName)) {
        Spotify.savePlaylist(playlistName, playlistTracks);
      } else {
        this.playlistDup();
      }
      })
      }
      /*if (playlistTracks.length === 0) {
        return;
      } else {
      Spotify.getPlaylistList();
    }*/






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
            searchResults={this.state.searchResults}  onAdd={this.addTrack}/>
            <div className="NewPlaylist">
              <NewPlaylist
              playlistClear = {this.playlistClear}/>
              <Playlist
              playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName}
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
