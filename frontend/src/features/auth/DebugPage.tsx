import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { useLazyHelloNoAuthQuery, useLazyHelloQuery, useLogOutMutation } from "../../app/enhancedApi";

const code = "px-4 py-2 rounded-md bg-slate-700 text-white text-sm w-fit";
const button = "bg-blue-600 hover:bg-blue-800 text-white px-4 py-1.5 rounded-md w-fit";

export const DebugPage: React.FC = () => {
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [logOut, {}] = useLogOutMutation();

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
      <h1 className="text-3xl text-primary font-bold">Authentication Stats</h1>

      <div className="flex flex-row justify-start gap-2">
        <button className={button} onClick={() => navigate("/login")}>
          Login page
        </button>
        <button className={button} onClick={() => navigate("/")}>
          Home page
        </button>
      </div>
      <p>Authenticated user:</p>
      <pre className={code}>{JSON.stringify(user.email ? user : "user data", null, 2)}</pre>

      <p>Access token:</p>
      <div className="overflow-auto">
        <pre className={code}>{JSON.stringify(accessToken !== undefined ? accessToken : "access token", null, 2)}</pre>
      </div>

      {user.email !== undefined && (
        <button
          onClick={() => {
            logOut();
          }}
          className={button}
        >
          Log Out
        </button>
      )}

      <p>Test protected route:</p>
      <div className="flex flex-row gap-1.5">
        <button className={button} onClick={() => getHello()}>
          Protected route request
        </button>
      </div>
      <pre className={code}>{JSON.stringify(hello.error ? hello.error : hello.data ?? "undefined", null, 2)}</pre>

      <p>Test unprotected route:</p>
      <div className="flex flex-row gap-1.5">
        <button className={button} onClick={() => getNoAuthHello()}>
          Unprotected route request
        </button>
      </div>
      <pre className={code}>
        {JSON.stringify(helloNoAuth.error ? helloNoAuth.error : helloNoAuth.data ?? "undefined", null, 2)}
      </pre>
    </div>
  );
};
