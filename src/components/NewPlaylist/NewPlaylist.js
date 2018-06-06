import React from 'react';
import './NewPlaylist.css';

class NewPlaylist extends React.Component {
  constructor(props){
    super(props);


    this.handlePlaylistClear = this.handlePlaylistClear.bind(this);


  }

  handlePlaylistClear() {
    this.props.playlistClear();
  }




  render() {
    return (
      <div className="NewPlaylist">
        <a className="NewPlaylist-SearchBar" onClick={this.handlePlaylistClear}>New Playlist</a>
      </div>
    )
  }




}


export default NewPlaylist;
