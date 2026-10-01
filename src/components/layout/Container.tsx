import { ReactNode } from "react";

interface IContainerProps {
  children: ReactNode;
}

export default function Container({ children }: IContainerProps) {
  return <div className="mx-auto w-full max-w-480 px-15">{children}</div>;
}
