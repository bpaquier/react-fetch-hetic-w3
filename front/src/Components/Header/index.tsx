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
  const handleClick = () => {
    console.log({ isConnected });
    if (isConnected) {
      Cookies.remove("token");
      setIsConnected(false);
    }
    if (!isConnected) setDisplayLogin(!displayLogin);
  };

  return (
    <header className="header">
      <p>{isConnected ? "Welcome" : "React fetch TP"}</p>
      <Button color="inherit" variant="outlined" onClick={handleClick}>
        {isConnected ? "logout" : displayLogin ? "register" : "login"}
      </Button>
    </header>
  );
}
