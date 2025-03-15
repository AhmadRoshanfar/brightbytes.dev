import { Link } from "gatsby";
import React from "react";

import logo from "../../images/logo.png"; // Adjust the path as needed


const Header = () => {
  return (
    <div className="w-full py-2 px-8 bg-logo-bg-color text-white flow-root">
      <nav className="flex items-center justify-between h-full">
        <div className=" flex float-left my-3 mx-10">
          <Link href="/" className="text-white text-2xl justify-start">
           <h1 className="logo-text text-logo-color">
           BrightBytes.dev
            </h1>   
          </Link>
        </div>
        <div className="flex justify-end h-full float-right">
          <ul className="flex ">
            {/* <li className="text-white ">
              <Link className="flex text-center" to="/about">
                About
              </Link>
            </li> */}
            <li className="text-white mx-10 ">
              <Link className="flex text-center " to="/">
                Home
              </Link>
            </li>
            {/* <li className="flex text-white items-center rounded mx-1 max-h-full bg-yellow-500 px-5 font-bold">
              <Link to="/">Donate</Link>
            </li> */}
            <li className="flex text-white items-center rounded mx-1 max-h-full bg-green-500 px-5 font-bold">
              <Link to="/contact" className=" ">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
