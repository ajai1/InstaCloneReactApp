import React, { useState, useEffect } from "react";
//firebase
import { db } from "./config/firebase";
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
        <h1>Hello</h1>

        <ImageUploadComponent></ImageUploadComponent>

        {posts.map(({ id, post }) => (
          <Post
            key={id}
            userName={post.userName}
            imageUrl={post.imageUrl}
            caption={post.caption}
          />
        ))}
      </div>
    </Provider>
  );
}

export default App;
