import type { ReactNode } from "react";
import "./layout.css";

type ChildrenProps = {
  children: ReactNode;
};

export default function Wrapper({ children }: ChildrenProps) {
  return <div className="wrapper">{children}</div>;
}
