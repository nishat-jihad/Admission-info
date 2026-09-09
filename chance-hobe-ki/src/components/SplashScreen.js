"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function SplashScreen({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && <Loader />}
      {children}
    </>
  );
}
