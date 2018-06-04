import React, { Component } from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults:[],
      playlistName: "My Playlist",
      playlistTracks:[]
      }

      this.removeTrack=this.removeTrack.bind(this);
      this.addTrack = this.addTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.search = this.search.bind(this);
    }

    addTrack(track) {

      if (this.state.playlistTracks.filter(playlistTrack => track.id !== playlistTrack.id)) {
        let tracks = this.state.playlistTracks;
        tracks.push(track);
        this.setState({playlistTracks: tracks});

      }
    }


    removeTrack(track){
      const removeTrack = this.state.playlistTracks.filter(playlistTrack => track.id !== playlistTrack.id);
      this.setState({playlistTracks : removeTrack});

    }

    updatePlaylistName(name){
      this.setState ({playlistName: name})
    }

    search(term){
      Spotify.getAccessToken();
      Spotify.search(term).then(searchResults => this.setState ({searchResults : searchResults}));
    }





  render() {
    return (

       <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults}  onAdd={this.addTrack}/>
        <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName}
        onNameChange={this.updatePlaylistName}
        onRemove={this.removeTrack}/>
        </div>
      </div>
    );
  }
}


export default App;
