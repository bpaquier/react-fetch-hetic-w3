import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { setConstantValue } from "typescript";

export interface RegisterProps {
  setIsConnected?(arg: boolean): void;
  setSuccess?(arg: string): void;
  setError?(arg: string): void;
  setDisplayLogin?(arg: boolean): void;
}

export default function Register({
  setIsConnected,
  setSuccess,
  setError,
  setDisplayLogin,
}: RegisterProps) {
  const [nameValue, setNameValue] = useState(null);
  const [mailValue, setMailValue] = useState(null);
  const [passValue, setPassValue] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    mailValue && formData?.append("email", mailValue);
    passValue && formData?.append("password", passValue);
    nameValue && formData?.append("name", nameValue);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/register`,
      data: formData,
    })
      .then((resp) => {
        if (resp.status === 200) {
          setDisplayLogin(true);
          setSuccess("Success !! Please login :)");
        } else {
          setError("Error when register, please try again or contact support");
        }
      })
      .catch(() => {
        setError("Error when register, please try again or contact support");
      });
  };
  return (
    <div className="formWrapper">
      <h2>Register</h2>
      <form className="form">
        <TextField
          placeholder="Your Name"
          className="input"
          type="text"
          onChange={(e) => setNameValue(e?.target?.value)}
          value={nameValue}
        />
        <TextField
          placeholder="Your email"
          className="input"
          type="mail"
          onChange={(e) => setMailValue(e?.target?.value)}
          value={mailValue}
        />
        <TextField
          placeholder="Your password"
          className="input"
          type="password"
          onChange={(e) => setPassValue(e?.target?.value)}
          value={passValue}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={onSubmit}
          disabled={
            mailValue?.length === 0 ||
            passValue?.length === 0 ||
            nameValue?.length === 0
          }
        >
          Register
        </Button>
      </form>
    </div>
  );
}
