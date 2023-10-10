"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (theme === "light") {
    document.body.classList.add("grainy");
  } else {
    document.body.classList.remove("grainy");
  }

  return theme === "light" ? (
    <Button variant={"ghost"} onClick={() => setTheme("dark")}>
      <Moon />
    </Button>
  ) : (
    <Button variant={"ghost"} onClick={() => setTheme("light")}>
      <Sun />
    </Button>
  );
};

export default ThemeSwitcher;
