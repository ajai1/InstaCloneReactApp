import React, { useState, useEffect } from "react";
//firebase
import { db } from "./config/firebase";
//own components

import Post from "./Components/Post/Post";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent";

//css
import "./App.css";
//redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPost(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <Provider store={store}>
      <div className="app">
        <HeaderComponent></HeaderComponent>
        <h1>Hello</h1>
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
