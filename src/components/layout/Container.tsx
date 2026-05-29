import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`
        w-full
        max-w-[1280px]
        mx-auto
        px-8
        md:px-16
        lg:px-24
        xl:px-28
        ${className}
      `}
    >
      {children}
    </div>
  );
}