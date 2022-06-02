import { useState } from "react";

import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import Cookies from "js-cookie";

export interface PostFormProps {
  setIsConnected?(arg: boolean): void;
  setSuccess?(arg: string): void;
  setError?(arg: string): void;
  refreshList?(): void;
}

export function PostsForm({
  setIsConnected,
  setSuccess,
  setError,
  refreshList,
}: PostFormProps) {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

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
          if (resp?.status === 200) {
            setSuccess("Posted :)");
            refreshList();
          } else if (resp?.status === 401) {
            setIsConnected(false);
          }
        })
        .catch(() => setIsConnected(false));
    } else {
      setIsConnected(false);
      setSuccess("please relogin");
    }

    setTitle(null);
    setContent(null);
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
            setTitle(e?.target?.value);
          }}
          value={title}
        />
        <TextareaAutosize
          aria-label="content textarea"
          placeholder="Content"
          style={{ width: "100%", height: 100 }}
          onChange={(e) => {
            setContent(e?.target?.value);
          }}
          value={content}
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
    </div>
  );
}
