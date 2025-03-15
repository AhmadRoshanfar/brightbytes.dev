import React from "react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="grid grid-cols-3 gap-4 bg-logo-bg-color text-cyan-100 mt-10">
        <div className="grid grid-cols-2 sml-10 my-4">
          <div className="flex flex-row space-x-2 ml-10">

            <a className="icon-link hover:text-linkedin-bg" href="https://www.linkedin.com/in/ahmadroshanfar/">
            <FaLinkedin size={"2rem"} />
            </a>
            <a className="icon-link hover:text-gray-500" href="https://github.com/AhmadRoshanfar">
            <FaGithub size={"2rem"} />
            </a>
            <a className="icon-link hover:text-youtube-bg" href="https://www.youtube.com/@ahmadroshanfar">
            <FaYoutube size={"2rem"} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
