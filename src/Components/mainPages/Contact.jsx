import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";

export const Contact = () => {
  const navigate = useNavigate();
  const [data,setData]= useState([]);
  const {register, handleSubmit,reset }= useForm();
  const handleSubmitData = (data) => {
    // Send data to server
    console.log(data);
    if(data.Name === '' && data.Email === '' && data.Message === ''){
      toast.error("Please fill in all fields",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        // closeOnClick: true, 
        pauseOnHover: true,
        draggable: true,
      //  backgroundColor: red  
      });
    }
    else{
      toast.success("Message Sent Successfully",{
        position: "top-right",
        autoClose: 3000,
        // hideProgressBar: false,
        // closeOnClick: true, 
        // pauseOnHover: true,
        // draggable: true
      }); 
      setData((prev)=>[...prev, data]);
      navigate(-1)  
      reset();
    }
  };
  return data ? (
    <div className="flex justify-start pt-8  items-center flex-col  w-full h-screen">
      <div className="w-[6%] absolute top-5 left-5 flex items-center justify-around">
        <i
          onClick={() => {
            navigate(-1);
          }}
          className="ri-arrow-left-line md:text-2xl lg:text-2xl sm:text-xl text-lg  font-semibold text-zinc-400 hover:bg-zinc-400/20 rounded-full  hover:text-[#6556cd]"
        ></i>
        <h1 className="md:text-2xl lg:text-2xl sm:text-xl text-lg  font-semibold text-zinc-400">Back </h1>
      </div>
      <div className="text-white flex flex-col md:gap-4 sm:gap-4 gap-4 items-center md:w-[60%] lg:w-[50%] sm:w-[70%] w-[70%]  ">
        <h1 className="md:text-3xl lg:text-4xl sm:text-2xl text-xl font-bold ">Contact</h1>
        <p className="md:text-lg lg:text-xl sm:text-md text-sm text-zinc-400 text-center ">
          Got a question, collaboration idea, or feedback to share? At CinePlay,
          every inquiry is a scene waiting to unfold. Let’s turn your thoughts
          into cinematic action!
        </p>
      </div>
      <div className="lg:w-[40%] md:w-[50%] sm:w-[65%] w-[70%] p-6 rounded-md ">
        <form onSubmit={handleSubmit(handleSubmitData)} className="flex flex-col gap-4 w-[100%]  ">
          <div className="w-[100%] ">
            {" "}
            <h1 className="text-white font-semibold pb-1">Name</h1>
            <input {...register("Name")}
              className="placeholder:text-zinc-400/40 w-full text-[#6556cd] border-1 px-3 py-3 outline-none focus:ring-[#6556cd]  focus:border-[#6556cd]   rounded-md border-zinc-400/40 "
              type="text"
              placeholder="Enter Your Name"
            />
          </div>
          <div>
            <h1 className="text-white font-semibold pb-1">Email</h1>
            <input {...register("Email")}
              className="placeholder:text-zinc-400/40 w-full border-1 text-[#6556cd] px-3 py-3  outline-none focus:ring-[#6556cd]  focus:border-[#6556cd] rounded-md border-zinc-400/40"
              type="email"
              placeholder="Enter Your Email Address"
            />
          </div>

          <div>
            <h1 className="text-white font-semibold pb-1">Message</h1>
            <textarea {...register("Message")}
              className="placeholder:text-zinc-400/40 w-full border-1 text-[#6556cd] px-3 py-3 outline-none focus:ring-[#6556cd]  focus:border-[#6556cd]  rounded-md border-zinc-400/40"
              rows={"4"}
              placeholder="Enter Message "
            />
          </div>
          <div className="flex justify-center">
            <button 
              className="py-2 px-3 hover:text-white font-semibold rounded-md bg-zinc-400 text-black  hover:bg-[#6556cd]"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* {data.map((item, index)=>{
        return <div key={index} >
          <h1>Name: {item.Name}</h1>
          <h1>Email: {item.Email}</h1>
          <h1>Message: {item.Message}</h1>
          <hr />
        </div>
      })} */}
    </div>
  ): <Loader />
};
