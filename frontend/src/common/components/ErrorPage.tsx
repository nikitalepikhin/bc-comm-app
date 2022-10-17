import React from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import StyledLink from "../uilib/StyledLink";
import Box from "../uilib/Box";
import classNames from "classnames";

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
      <div
        className={classNames(
          "h-screen w-screen p-3",
          "fixed top-0 left-0 z-20",
          "flex flex-col justify-center items-center gap-4",
          "bg-slate-100 dark:bg-slate-900"
        )}
      >
        <Box className="px-32 py-16 flex flex-col justify-center items-center gap-1">
          <p className="font-bold text-2xl md:text-3xl text-center">{title[code] ?? title["10000"]}</p>
          <p className="text-secondary dark:text-slate-400 mb-4 text-center">
            {message ?? body[code] ?? body["10000"]}
          </p>
          <StyledLink to="/" replace>
            Back to the home page
          </StyledLink>
        </Box>
      </div>,
      mountPoint
    );
  } else {
    return null;
  }
}
