import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export interface LoginProps {
  setIsConnected?(arg: boolean): void;
  setSuccess?(arg: string): void;
  setError?(arg: string): void;
}

export default function Login({
  setIsConnected,
  setSuccess,
  setError,
}: LoginProps) {
  const [mailValue, setMailValue] = useState(null);
  const [passValue, setPassValue] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    mailValue && formData?.append("email", mailValue);
    passValue && formData?.append("password", passValue);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/login`,
      data: formData,
    })
      .then((resp) => {
        if (resp.status === 200) {
          setIsConnected(true);
          Cookies.set("token", resp?.data?.token);
        } else {
          setError("Wrong email or password");
        }
      })
      .catch(() => {
        setError("Wrong email or password");
      });
  };
  return (
    <div className="formWrapper">
      <h2>Login</h2>
      <form className="form">
        <TextField
          placeholder="Your email"
          className="input"
          type="mail"
          onChange={(e) => setMailValue(e?.target?.value)}
        />
        <TextField
          placeholder="Your password"
          className="input"
          type="password"
          onChange={(e) => setPassValue(e?.target?.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={onSubmit}
          disabled={mailValue?.length === 0 || passValue?.length === 0}
        >
          Login
        </Button>
      </form>
    </div>
  );
}
