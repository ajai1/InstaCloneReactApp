import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post(props) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="user" src=""></Avatar>
        <h3>{props.userName}</h3>
      </div>
      <img src={props.imageUrl} alt={props.userName} className="post__image" />
      <h4 className="post__text">
        <strong>{props.userName}</strong>: {props.caption}
      </h4>
    </div>
  );
}

export default Post;
