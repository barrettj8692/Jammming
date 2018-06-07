import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);


    this.handleSearch = this.handleSearch.bind(this);
    this.search = this.search.bind(this);
  }

/* search bar */

  search(term){
    this.props.onSearch(term);
  }

  handleSearch(event) {
    this.search(event.target.value)
  }




  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleSearch}
          placeholder="Enter A Song Title" />
        <a>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
