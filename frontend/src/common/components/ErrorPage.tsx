import React from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

const title: { [key: string]: string } = {
  "400": "400 Bad Request 👎",
  "401": "401 Unauthorized 🔒",
  "404": "404 Not Found 🤷‍♂️",
  "500": "500 Internal Server Error 💩",
  "10000": "An error has occurred 😞",
};

const body: { [key: string]: string } = {
  400: "You've sent a bad request.",
  401: "You shall not pass!",
  404: "This page could not be found.",
  500: "Oops, something went wrong on our side.",
  10000: "Something went wrong.",
};

interface Props {
  code?: string;
  message?: string;
}

export default function ErrorPage(props: Props) {
  const { code = "404", message } = props;

  const mountPoint = document.getElementById("portal");
  if (mountPoint) {
    return createPortal(
      <div className="h-screen w-screen z-50 fixed top-0 left-0 flex flex-col justify-center items-center gap-2 bg-white">
        <p className="font-bold text-3xl">{title[code] ?? title["10000"]}</p>
        <p className="text-lg">{message ?? body[code] ?? body["10000"]}</p>
        <Link to="/" replace className="hover:underline text-accent hover:text-accent-strong">
          Back to the home page
        </Link>
      </div>,
      mountPoint
    );
  } else {
    return null;
  }
}
