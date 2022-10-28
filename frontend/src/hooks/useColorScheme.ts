import { useCallback, useEffect, useState } from "react";

const KEY = "theme";
type ColorScheme = "light" | "dark" | "system";

interface Theme {
  scheme: ColorScheme;
  setScheme: (value: ColorScheme) => void;
}

export default function useColorScheme(): Theme {
  const query = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : undefined;
  const [current, setCurrent] = useState<ColorScheme>(() => {
    const item = localStorage.getItem(KEY);
    return item ? (item === "dark" ? "dark" : "light") : query ? "system" : "light";
  });

  const setDarkMode = () => {
    document.querySelector("body")!.classList.add("dark");
    document.querySelector('meta[name="theme-color"]')!.setAttribute("content", "rgba(15, 23, 42, 0.9)");
  };
  const setLightMode = () => {
    document.querySelector("body")!.classList.remove("dark");
    document.querySelector('meta[name="theme-color"]')!.setAttribute("content", "#f8fafc");
  };

  // detect the color theme on mount
  useEffect(() => {
    const theme = localStorage.getItem(KEY);
    if (theme) {
      theme === "dark" ? setDarkMode() : setLightMode(); // check local storage first
    } else if (query) {
      query.matches ? setDarkMode() : setLightMode(); // check if prefers-color-scheme media query is supported and set
    } else {
      setLightMode(); // default to light mode
    }
  }, []);

  const listener = useCallback((e: MediaQueryListEvent) => {
    e.matches ? setDarkMode() : setLightMode();
  }, []);

  // on system appearance change
  useEffect(() => {
    // if system value is used, then add an onChange event listener
    if (query && current === "system") {
      query.addEventListener("change", listener);
    }
    // if system value is no longer used then remove the onChange listener
    if (query && current !== "system") {
      query.removeEventListener("change", listener);
    }
    // remove the onChange listener on unmount
    return () => {
      if (query) {
        query.removeEventListener("change", listener);
      }
    };
  }, [current]);

  return {
    scheme: current,
    setScheme: (value: ColorScheme) => {
      if (value === "system") {
        setCurrent("system");
        localStorage.removeItem(KEY);
        if (query) {
          query.matches ? setDarkMode() : setLightMode();
        } else {
          setLightMode();
        }
      } else {
        setCurrent(value);
        localStorage.setItem(KEY, value);
        value === "dark" ? setDarkMode() : setLightMode();
      }
    },
  };
}
