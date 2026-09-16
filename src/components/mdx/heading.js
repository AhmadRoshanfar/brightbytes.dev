import React from "react";

const Heading = ({ title }) => {
  return (
    <h1 className="inline-block bg-teal-800 text-white px-4 py-2  m-0 absolute left-0">
      {title}
    </h1>
  );
};

export default Heading;
