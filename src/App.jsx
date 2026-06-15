import { useEffect, useMemo, useState } from "react";
import HomePage from "./HomePage.jsx";
import DesignArchitecturePage from "./pages/DesignArchitecturePage.jsx";

const ROUTES = {
  home: "/",
  designArchitecture: "/designArchitecture",
};

function normalizePath(pathname) {
  if (!pathname || pathname === "/") {
    return ROUTES.home;
  }

  return pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
}

function resolveRoute(pathname) {
  const normalizedPath = normalizePath(pathname);
  return Object.values(ROUTES).includes(normalizedPath) ? normalizedPath : ROUTES.home;
}

export default function App() {
  const [pathname, setPathname] = useState(() => resolveRoute(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setPathname(resolveRoute(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const nextTitle =
      pathname === ROUTES.designArchitecture
        ? "OnlyDevOps | Design Architecture"
        : "OnlyDevOps - Learn DevOps The Real Way";

    document.title = nextTitle;
  }, [pathname]);

  const currentPage = useMemo(() => {
    if (pathname === ROUTES.designArchitecture) {
      return <DesignArchitecturePage />;
    }

    return <HomePage />;
  }, [pathname]);

  return currentPage;
}
