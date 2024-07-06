import { FC, ReactNode } from "react";
import { Navbar } from "./Navbar";
import { SocialNetworks } from "./components/SocialNetworks";

export const DefaultLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="relative">
      <Navbar />
      <main className="min-h-[calc(100vh-379px-200px)]">{children}</main>
      <SocialNetworks />
    </div>
  );
};
