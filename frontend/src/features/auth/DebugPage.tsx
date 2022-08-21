import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { useLazyHelloNoAuthQuery, useLazyHelloQuery, useLogOutMutation } from "../../app/enhancedApi";
import Button from "../../common/components/Button";

export const DebugPage: React.FC = () => {
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [logOut] = useLogOutMutation();

  const [getHello, resultHello] = useLazyHelloQuery();
  const [getNoAuthHello, resultHelloNoAuth] = useLazyHelloNoAuthQuery();

  const [hello, setHello] = useState<typeof resultHello>(resultHello);
  const [helloNoAuth, setHelloNoAuth] = useState<typeof resultHelloNoAuth>(resultHelloNoAuth);

  useEffect(() => {
    setHello(resultHello);
    setHelloNoAuth(resultHelloNoAuth);
  }, [resultHello, resultHelloNoAuth]);

  return (
    <div className="flex flex-col justify-start gap-1.5">
      <h1 className="text-3xl text-primary font-bold uppercase">Authentication Debug</h1>

      <div className="flex flex-row justify-start gap-2">
        <Button variant="outlined" onClick={() => navigate("/login")}>
          Login page
        </Button>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Home page
        </Button>
        {user.email !== undefined && (
          <Button
            onClick={() => {
              logOut();
            }}
            variant="outlined"
          >
            Log Out
          </Button>
        )}
      </div>
      <p>Authenticated user:</p>
      <pre className="px-4 py-2 rounded-md rounded-md shadow overflow-hidden bg-white text-sm w-fit">
        {JSON.stringify(user.email ? user : "user data", null, 2)}
      </pre>

      <p>Access token:</p>
      <div className="rounded-md shadow overflow-hidden break-all">
        <pre className="px-4 py-2 bg-white text-sm break-all">
          {JSON.stringify(accessToken !== undefined ? accessToken : "access token", null, 2)}
        </pre>
      </div>

      <p>Test protected route:</p>
      <div className="flex flex-row gap-1.5">
        <Button variant="outlined" onClick={() => getHello()}>
          Protected route request
        </Button>
      </div>
      <pre className="px-4 py-2 rounded-md rounded-md shadow overflow-hidden bg-white text-sm w-fit">
        {JSON.stringify(hello.error ? hello.error : hello.data ?? "undefined", null, 2)}
      </pre>

      <p>Test unprotected route:</p>
      <div className="flex flex-row gap-1.5">
        <Button variant="outlined" onClick={() => getNoAuthHello()}>
          Unprotected route request
        </Button>
      </div>
      <pre className="px-4 py-2 rounded-md rounded-md shadow overflow-hidden bg-white text-sm w-fit">
        {JSON.stringify(helloNoAuth.error ? helloNoAuth.error : helloNoAuth.data ?? "undefined", null, 2)}
      </pre>
    </div>
  );
};
