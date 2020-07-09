import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteComment , updateComment} from "../actions/commentActions";
import PropTypes from "prop-types";
import comment from "../modules/comment/comment.module.css"
import Stars from "../components/Stars"

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      commentTitle: "",
      commentScore: 0,
      commentDesc: "",
    };
  }
  componentDidMount() {
    this.setState({ commentTitle: this.props.comment.comment_title });
    this.setState({ commentScore: this.props.comment.comment_score });
    this.setState({ commentDesc: this.props.comment.comment_description });
  }

  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  editControl = () => {
    this.setState({ edit: true });
  };

  editCancel = () => {
    this.setState({ title: this.props.comment.comment_title });
    this.setState({ score: this.props.comment.comment_score });
    this.setState({ description: this.props.comment.comment_description });
    this.setState({ edit: false });
  }

  formSubmit = (e) => {
    e.preventDefault()
    this.props.updateComment(this.props.siteID, this.props.comment.comment_id, e);
    this.setState({ edit: false });
  }

  render() {
    if (this.state.edit) {
      return (
        <div>
        <form onSubmit = {(e) => this.formSubmit(e)}>
          <input type="text" onChange={(e) => {this.inputChange(e);}} name="commentTitle" value={this.state.commentTitle}/>
          <input type="range" onChange={(e) => { this.inputChange(e); }} min="0" max="10" name="commentScore" value={this.state.commentScore}/>
          <input type="text" onChange={(e) => { this.inputChange(e); }} name="commentDesc" value={this.state.commentDesc}/>
          <button>Confirm Changes</button>
        </form>
        <button onClick={()=> this.editCancel()}>Cancel</button>
        </div>
      );
    } else {
      return (
        <div className={`container-sm ${comment.comment}`}>
          <div className={comment.header}>
            <p> by - {this.props.comment.owner_name}</p>
            <div className={comment.starsWrapper}>
              <Stars average_score={this.props.comment.comment_score}/>
            </div>
          </div>
          <div className={comment.body}>
            <h4>{this.props.comment.comment_title}</h4>
            <p>{this.props.comment.comment_description}</p>
          </div>
          {this.props.userID === this.props.comment.owner_id ? (
            <div className={comment.buttons}>
              <button onClick={() => this.editControl()}>Edit</button>
              <button onClick={() => this.props.deleteComment(this.props.siteID, this.props.comment.comment_id)}> delete </button>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }
  }
}

export default connect(null, { deleteComment, updateComment })(Comment);
