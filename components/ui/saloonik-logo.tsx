"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export const SaloonikLogo = () => {
  const { theme } = useTheme();
  const [logoUrl, setLogoUrl] = useState("/logo.svg");

  useEffect(() => {
    if (theme === "light") setLogoUrl("/logo.svg");
    else setLogoUrl("/logo-dark.svg");
  }, [theme]);

  return <Image src={logoUrl} width={150} height={150} alt="Saloonik logo" />;
};
