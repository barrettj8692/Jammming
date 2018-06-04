import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props){
    super(props);

      this.state={
        isRemoval:true
      }

      this.handleNameChange = this.handleNameChange.bind(this);


    }

    handleNameChange(event){
      this.props.onNameChange(event.target.value);
    }



  render() {
    return (

      <div className="Playlist">
      <input defaultValue={this.props.playlistName} onChange={this.handleNameChange} />
      {
        <TrackList tracks = {this.props.playlistTracks} isRemoval ={this.state.isRemoval}  onRemove={this.props.onRemove}/>
      }
      <a class="Playlist-save">SAVE TO SPOTIFY</a>
      </div>

    );
  }
}

export default Playlist;
