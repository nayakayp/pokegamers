import Header from "@/components/pages/home/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black/90 py-10 px-4 md:px-0">
      <Header />
      <div className="min-h-[90vh] max-w-xl mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
