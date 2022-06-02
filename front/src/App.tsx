import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import "./App.css";
import Login from "./Components/Login";
import PostsList from "./Components/PostsList";
import Header from "./Components/Header";
import { PostsForm } from "./Components/PostForm";
import { Alert } from "@mui/material";
import Register from "./Components/Register";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [forceRefreshList, setForceRefreshList] = useState(false);

  useEffect(() => {
    Cookies.get("token") && setIsConnected(true);
    setError(null);
    setSuccess(null);
  }, []);

  useEffect(() => {
    setError(null);
    setSuccess(null);
  }, [isConnected]);

  useEffect(() => {
    if (!displayLogin) {
      setError(null);
      setSuccess(null);
    }
  }, [displayLogin]);

  const refreshList = () => {
    setForceRefreshList((prev) => !prev);
  };
  return (
    <div className="App">
      <Header
        {...{ isConnected, displayLogin, setDisplayLogin, setIsConnected }}
      />
      <div className="alertCenter">
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </div>
      {!isConnected && (
        <>
          {displayLogin ? (
            <Login {...{ setIsConnected, setSuccess, setError }} />
          ) : (
            <Register
              {...{ setIsConnected, setSuccess, setError, setDisplayLogin }}
            />
          )}
        </>
      )}
      {isConnected && (
        <PostsForm {...{ setIsConnected, setError, setSuccess, refreshList }} />
      )}
      <PostsList {...{ forceRefreshList }} />
    </div>
  );
}

export default App;
