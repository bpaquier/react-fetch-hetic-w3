import { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { Alert } from "@mui/material";

export interface PostFormProps {
  setIsConnected?(arg: boolean): void;
}

export function PostsForm({ setIsConnected }: PostFormProps) {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setError(false);
    setSuccess(false);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ title, content });
    const formData = new FormData();
    title && formData?.append("title", title);
    content && formData?.append("content", content);

    const token = Cookies.get("token");

    if (token) {
      axios({
        method: "post",
        headers: { Authorization: token },
        url: `${process.env.REACT_APP_API_URL}/newPost`,
        data: formData,
      })
        .then((resp) => {
          console.log(resp?.status);
          if (resp?.status === 200) {
            setSuccess(true);
          } else if (resp?.status === 401) {
            setIsConnected(false);
          } else if (resp?.status === 503) {
            setError(true);
          }
        })
        .catch((resp) => console.log(resp));
    } else {
      setIsConnected(false);
    }
  };

  return (
    <div className="formWrapper">
      <h2>Add a post</h2>
      <form className="form">
        <TextField
          placeholder="Title"
          className="input"
          type="text"
          onChange={(e) => {
            console.log(e?.target?.value);
            setTitle(e?.target?.value);
          }}
        />
        <TextareaAutosize
          aria-label="content textarea"
          placeholder="Content"
          style={{ width: "100%", height: 100 }}
          onChange={(e) => {
            console.log(e?.target?.value);
            setContent(e?.target?.value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={onSubmit}
          disabled={!title || !content}
        >
          Submit
        </Button>
      </form>
      {error && <Alert severity="error">Missing title and/or content</Alert>}
      {success && <Alert severity="success">{"POSTED :)"}</Alert>}
    </div>
  );
}
