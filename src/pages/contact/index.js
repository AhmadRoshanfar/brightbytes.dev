import React from "react";
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Layout from "../../components/layout/layout";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Contact = () => {
  // const emailRef = useRef();
  // const nameRef = useRef();
  // const subjectRef = useRef();
  // const textRef = useRef();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const name = nameRef.current.value;
  //   const email = emailRef.current.value;
  //   const subject = subjectRef.current.value;
  //   const text = textRef.current.value;

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     toast.error("Invalid Email");
  //     return;
  //   }

  //   try {
  //     const res = await fetch("http://localhost:3000/contact", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: name,
  //         email: email,
  //         subject: subject,
  //         text: text,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       toast.success(data.message);
  //     } else {
  //       toast.error("Failed to sending the form");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  return (
    <Layout>
      <div className="flex flex-row place-items-center items-center justify-center mt-10">
        {/* <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-1/2 items-center justify-center"
        >
          <h1 className="font-bold text-xl mt-10">Contact with Me</h1>
          <input
            ref={nameRef}
            type="text"
            placeholder="Name"
            className="text-white bg-slate-900 p-4 lg:w-3/4 sm:w-full rounded-lg "
          />
          <input
            ref={emailRef}
            type="text"
            placeholder="Email"
            className="text-white bg-slate-900 p-4 lg:w-3/4 sm:w-full rounded-lg "
          />
          <input
            ref={subjectRef}
            type="text"
            placeholder="Subject"
            className="text-white bg-slate-900 p-4 lg:w-3/4 sm:w-full rounded-lg "
          />
          <textarea
            ref={textRef}
            type="text"
            rows="10"
            placeholder="Message"
            className="text-white bg-slate-900 p-4 lg:w-3/4 sm:w-full rounded-lg "
          />
          <button
            type="submit"
            className="bg-teal-700 hover:bg-teal-600 p-4 rounded-xl w-1/2 text-white"
          >
            Submit
          </button>
        </form> */}
        <div className="flex flex-col space-y-5">
          <div className="flex flex-row space-x-2">
            <BiLogoGmail size={"2rem"} />
            <p>ahmadroshanfar@gmail.com</p>
          </div>
          <div className="flex flex-row space-x-2">
            <FaGithub size={"2rem"} />
            <a href="https://github.com/AhmadRoshanfar">github.com/AhmadRoshanfar</a>
          </div>
          <div className="flex flex-row space-x-2">
            <FaLinkedin size={"2rem"} />
            <a href="https://www.linkedin.com/in/ahmadroshanfar/">linkedin.com/in/ahmadroshanfar/</a>
          </div>
        </div> 
      </div>
      {/* <ToastContainer
        position="bottom-right"
        autoClose={3000}
        transition={"slide"}
      /> */}
    </Layout>
  );
};

export default Contact;
