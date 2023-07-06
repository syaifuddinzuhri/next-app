"use client";

import useDarkMode from "@/hooks/useDarkMode";
import useRtl from "@/hooks/useRtl";
import useSkin from "@/hooks/useSkin";

export default function AuthLayout({ children }: any) {
  const [isRtl] = useRtl();
  const [isDark] = useDarkMode();
  const [skin] = useSkin();
  return (
    <>
      <div
        dir={isRtl ? "rtl" : "ltr"}
        className={`app-warp ${isDark ? "dark" : "light"} ${
          skin === "bordered" ? "skin--bordered" : "skin--default"
        }`}
      >
        {children}
      </div>
    </>
  );
}
