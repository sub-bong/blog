import { type ReactNode } from "react";

type ChildrenProps = {
  children: ReactNode;
};

export default function Container({ children }: ChildrenProps) {
  return (
    <main className="wrapper-contents">
      <div className="container-contents">{children}</div>
    </main>
  );
}
