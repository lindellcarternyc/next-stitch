import { ReactNode } from "react";
import { Toolbar } from "../(components)/toolbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Toolbar />
      <div className="pt-12">{children}</div>
    </div>
  );
}
