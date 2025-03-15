import React from "react";

const Heading = ({ title }) => {
  return (
<div className="place-items-center bg-teal-800 no-h1-margin border rounded-3xl">
<h1 className="py-4 px-8 w-fit  text-white mx-0 !important">
        {title}
      </h1>
    </div>
  );
};

export default Heading;
