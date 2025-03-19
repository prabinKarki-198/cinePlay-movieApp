import React from "react";
const DropDowns = ({ title, options, category }) => {
  return (
    <div className="relative w-full h-fit  ">
      <select
        className="w-full font-medium  cursor-pointer sm:text-xs md:text-sm lg:text-sm text-xs  text-white p-3 pr-10   border-2 border-zinc-400/20  rounded-md shadow-sm focus:outline-none appearance-none focus:ring-2 focus:ring-[#6556cd] focus:border-[#6556cd]"
        defaultValue="0"
        onChange={category}
        name="format"
        id="format"
      >
        <option className="hidden " value="0" disabled>
          {title.toUpperCase().replace(/_/g, " ")}
        </option>
        {options.map((item, index) => (
          <option className="sm:text-xs md:text-lg text-xs lg:text-sm" key={index} value={item}>
            {item.toUpperCase().replace(/_/g, " ")}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0  right-3   flex  pointer-events-none">
        <i className="ri-arrow-down-s-fill self-center text-white text-xl"></i>
      </div>
    </div>
  );
};

export default DropDowns;
