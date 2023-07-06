"use client";

import useDarkMode from "@/hooks/useDarkMode";
import useWidth from "@/hooks/useWidth";
import Link from "next/link";
import React from "react";

const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints }: any = useWidth();

  return (
    <div>
      <Link href="/analytics">
        <React.Fragment>
          {width >= breakpoints.xl ? (
            <img
              src={
                isDark
                  ? "/assets/images/logo/logo-white.svg"
                  : "/assets/images/logo/logo.svg"
              }
              alt=""
            />
          ) : (
            <img
              width={30}
              src={
                isDark
                  ? "/assets/images/logo/logo-ma.png"
                  : "/assets/images/logo/logo-ma.png"
              }
              alt=""
            />
          )}
        </React.Fragment>
      </Link>
    </div>
  );
};

export default Logo;
