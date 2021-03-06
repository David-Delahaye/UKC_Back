import React, { Component } from "react";
import {connect} from 'react-redux';

class Messages extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentMessage:'',
        messageActive:false
      }
    }

    render(){
      //on message change
        if (this.props.message.content !== this.state.currentMessage){
          const message = document.querySelector('#message');
          message.classList.add('active');
          setTimeout(() => {
            message.classList.remove('active')
          }, 3000);
        }
      
      //display message
        return(
          <div className='messages'>
            <div className='messageWrapper'>
              <div id= 'message' className='message'>{this.props.message.content}</div>
            </div>
          </div>
        )
    }
}


const mapStateToProps = state => ({
    message: state.messages.item
  })

export default connect(mapStateToProps, null)(Messages);