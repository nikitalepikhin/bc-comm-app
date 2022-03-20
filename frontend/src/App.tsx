import React from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Button } from "@mui/material";
import { logOutUser } from "./features/user/userSlice";
import { refreshToken } from "./features/token/tokenSlice";
import { Link } from "react-router-dom";

function App() {
  const { username, email } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return email ? (
    <div>
      {`Welcome back, ${username}`} <Button onClick={() => dispatch(logOutUser())}>Log Out</Button>
      <Button onClick={() => dispatch(refreshToken())}>Refresh token</Button>
    </div>
  ) : (
    <div>
      <Button>
        <Link to={"/login"}>Log In</Link>
      </Button>
      <Button>
        <Link to={"/signup"}>Sign Up</Link>
      </Button>
    </div>
  );
}

export default App;
