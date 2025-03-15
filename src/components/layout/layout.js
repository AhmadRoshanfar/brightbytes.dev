import React from "react";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mx-10 pb-16">{children}</main>
      <Footer className="fixed bottom-0 left-0 w-full bg-white shadow-md py-4" />
    </div>
  </>
  
  );
};

export default Layout;
