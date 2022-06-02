import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import "./App.css";
import Login from "./Components/Login";
import PostsList from "./Components/PostsList";
import Header from "./Components/Header";
import { PostsForm } from "./Components/PostForm";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(true);

  useEffect(() => {
    Cookies.get("token") && setIsConnected(true);
  }, []);

  return (
    <div className="App">
      <Header
        {...{ isConnected, displayLogin, setDisplayLogin, setIsConnected }}
      />
      {!isConnected && (
        <>
          {displayLogin ? <Login {...{ setIsConnected }} /> : <p>register</p>}
        </>
      )}
      {isConnected && <PostsForm {...{ setIsConnected }} />}
      <PostsList />
    </div>
  );
}

export default App;
