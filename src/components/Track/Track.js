import React from 'react';
import "./Track.css";



class Track extends React.Component {
  constructor(props){
    super(props);

    this.renderAction = this.renderAction.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.addTrack = this.addTrack.bind(this);


  }


  renderAction (){
    if (this.props.isRemoval){
      return <a className="Track-action" onClick={this.removeTrack}>-</a>
    } else {
      return <a className="Track-action"  onClick={this.addTrack}>+</a>
    }
  }

  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }





  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <div className="Track-image">
            <img src={this.props.track.images.url} alt="Album-Art"/>
          </div>
          <div className="Track-title">
            <h3>{this.props.track.album}</h3>
            <p>{`${this.props.track.artist} | ${this.props.track.name}`}</p>
          </div>
        </div>
        <div  className="Track-action">
        {
        this.renderAction()
        }
        </div>
      </div>
    )
  }
}


export default Track;
