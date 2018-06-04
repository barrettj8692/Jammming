import React from 'react';
import './SearchResults.css';

import TrackList from '../TrackList/TrackList';


class SearchResults extends React.Component {
  constructor(props){
    super(props);

    this.state={
      isRemoval:false
    }

  }



  render(){
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} isRemoval={this.state.isRemoval}
        onAdd={this.props.onAdd}/>
      </div>
    )
  };

}



export default SearchResults;
