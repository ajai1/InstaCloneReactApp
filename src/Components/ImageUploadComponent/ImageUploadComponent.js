import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { db, storage } from "../../config/firebase";
import firebase from "firebase";
import { connect } from "react-redux";

import "./ImageUploadComponent.css";

function ImageUploadComponent({ authUser }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              userName: authUser.displayName,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div>
      {authUser?.displayName ? (
        <div>
          <h1>Upload</h1>
          <progress value={progress} max="100" />
          <input
            type="text"
            placeholder="Enter a caption..."
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
          ></input>
          <input type="file" onChange={handleChange} />
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  authUser: state.login_reducer.authUser,
});

export default connect(mapStateToProps)(ImageUploadComponent);
