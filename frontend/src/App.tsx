import React from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Button, Typography } from "@mui/material";
import { logOutUser } from "./features/user/userSlice";
import { refreshToken } from "./features/token/tokenSlice";
import { Link } from "react-router-dom";
import { useAuthentication } from "./features/user/useAuthentication";
import { getHelloWorld } from "./features/dummy/dummySlice";

function App() {
  const { username, email } = useAppSelector((state) => state.user);
  const { message, error } = useAppSelector((state) => state.dummy);
  const dispatch = useAppDispatch();
  useAuthentication();
  return email ? (
    <div>
      {`Welcome back, ${username}`} <Button onClick={() => dispatch(logOutUser())}>Log Out</Button>
      <Button onClick={() => dispatch(refreshToken())}>Refresh token</Button>
      <Button onClick={() => dispatch(getHelloWorld())}>GET DUMMY</Button>
      {message && <Typography variant={"body1"}>{message}</Typography>}
      {error && (
        <Typography variant={"body1"} color={"red"}>
          {error}
        </Typography>
      )}
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
