import React, { Component} from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {newComment} from '../actions/commentActions';
import form from "../modules/form/form.module.css";
import Stars from "./Stars";

class Comments extends Component{
    constructor (){
        super();
        this.state={
            score:0
        }
    }

    postComment = async (e) => {
        e.preventDefault()
        this.props.newComment(e, this.props.siteID)
    }

    scoreChange = async (e) => {
        e.preventDefault()
        await this.setState({score:e.target.value});
    }

    render(){
        if (this.props.user.username !== 'guest'){
        return(
            <form className={form.newComment} onSubmit = {(e) =>{this.postComment(e)}}>
                <div className={form.scoreInput}>
                    <input className={form.scale} onChange={(e) =>{this.scoreChange(e)}} type="range" name="commentScore" min="0" max="10" required/>
                    <div className={form.starsWrapper}>
                    <Stars average_score={this.state.score}/>
                    </div>
                </div>
                <input className={form.text} type='text' name ='commentTitle' placeholder='Comment Title' required/>
                <textarea className={form.textArea} type='text' name ='commentDesc' placeholder='Comment Description' required/>
                <button className={form.btnPrimary}>Add</button>
            </form>
        )
        }
        return(
        <Link className={form.btnPrimary} to="/login">Login To Add A Comment</Link>
        )
}
}

Comments.propTypes = {
  newComment : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
  })

export default connect(mapStateToProps, {newComment})(Comments);