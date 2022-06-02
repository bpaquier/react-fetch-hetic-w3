import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";

import "./styles.css";

export interface HeaderProps {
  isConnected?: boolean;
  displayLogin?: boolean;
  setDisplayLogin?(arg: boolean): void;
  setIsConnected?(arg: boolean): void;
}

export default function Header({
  isConnected,
  setDisplayLogin,
  displayLogin,
  setIsConnected,
}: HeaderProps) {
  const userInfo = Cookies?.get("token") && jwt_decode(Cookies?.get("token"));
  //@ts-ignore
  const name = userInfo?.name ?? "You";
  const handleClick = () => {
    if (isConnected) {
      Cookies.remove("token");
      setIsConnected(false);
    }
    if (!isConnected) setDisplayLogin(!displayLogin);
  };

  return (
    <header className="header">
      <p>{isConnected ? `Welcome ${name} !` : "React fetch TP"}</p>
      <Button color="inherit" variant="outlined" onClick={handleClick}>
        {isConnected ? "logout" : displayLogin ? "register" : "login"}
      </Button>
    </header>
  );
}
