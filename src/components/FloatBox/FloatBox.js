import React from 'react';
import './FloatBox.css';

class FloatBox extends React.Component {
  constructor(props){
    super(props);


  this.handleNo=this.handleNo.bind(this);
  this.handleYes=this.handleYes.bind(this);
  }

/* handle yes and no on error box for duplaicate playlist name */

  handleYes(){
    this.props.clickYes();
  }

  handleNo(){
    this.props.clickNo();
  }




  render(){
    return(
        <div class="FloatBox"
          style={{display : this.props.style}}>
          <div className="float-container" >
          <h3>Playlist Name is Used!</h3>
          <p>Would you like to save tracks</p>
          <p>to exsisting playlist?</p>
            <div className='button-box'>
              <a className='floatbox-close'
                onClick={this.handleYes}>YES</a>
              <a className='floatbox-close'
                onClick={this.handleNo}>NO</a>
            </div>
          </div>
        </div>
     )
  }


}


export default FloatBox;
