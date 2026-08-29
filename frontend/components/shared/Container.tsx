import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10 xl:px-20 ${className}`}
    >
      {children}
    </div>
  );
}
