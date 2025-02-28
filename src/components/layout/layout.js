import React from "react";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col h-screen">
        <main className="flex-grow mx-10">{children}</main>
        <Footer className="" />
      </div>
    </>
  );
};

export default Layout;
