import React, { useState, useEffect } from "react";
//firebase
import { db } from "./config/firebase";
import InstagramEmbed from "react-instagram-embed";
//own components

import Post from "./Components/Post/Post";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent";
import ImageUploadComponent from "./Components/ImageUploadComponent/ImageUploadComponent";
//css
import "./App.css";
//redux
import { Provider } from "react-redux";
import store from "./store";
import { auth } from "firebase";

function App() {
  const [posts, setPost] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPost(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const setAuthUser = (authUser) => {
    console.log("----", authUser);
    setUser(authUser);
  };

  return (
    <Provider store={store}>
      <div className="app">
        <HeaderComponent setAuthUser={setAuthUser}></HeaderComponent>
        <div className="app__posts">
          <div className="app__postsleft">
            {posts.map(({ id, post }) => (
              <Post
                key={id}
                postId={id}
                userName={post.userName}
                imageUrl={post.imageUrl}
                caption={post.caption}
              />
            ))}
          </div>
          <div className="app__postsright">
            <InstagramEmbed
              url="https://www.instagram.com/p/CDdctFVg4K_/?utm_source=ig_embed&amp;utm_campaign=loading"
              maxWidth={320}
              hideCaption={false}
              containerTagName="div"
              protocol=""
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />
          </div>
        </div>

        <ImageUploadComponent></ImageUploadComponent>
      </div>
    </Provider>
  );
}

export default App;
