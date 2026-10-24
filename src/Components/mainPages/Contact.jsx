import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";

export const Contact = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const handleSubmitData = (formData) => {
    if (!formData.Name?.trim() || !formData.Email?.trim() || !formData.Message?.trim()) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.success("Message Sent Successfully", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
      });
      setData((prev) => [...prev, formData]);
      navigate(-1);
      reset();
    }
  };

  return data ? (
    <div className="flex justify-start pt-16 sm:pt-20 items-center flex-col w-full bg-[#1f1e24] min-h-screen px-4 pb-12 relative">
      {/* Back button */}
      <div className="absolute top-4 left-4 sm:left-6 flex items-center gap-2 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-zinc-400 hover:text-white hover:bg-zinc-800 p-2 rounded-full transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Go back"
        >
          <i className="ri-arrow-left-line text-2xl"></i>
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Back
        </h1>
      </div>

      <div className="text-white flex flex-col gap-3 items-center max-w-2xl text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6556cd] to-[#8070eb] flex items-center justify-center shadow-lg shadow-[#6556cd]/30 mb-2">
          <i className="ri-mail-send-fill text-2xl text-white"></i>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          Get In Touch
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed">
          Got a question, collaboration idea, or feedback to share? At CinePlay,
          every inquiry is a scene waiting to unfold. Let’s turn your thoughts
          into cinematic action!
        </p>
      </div>

      <div className="w-full sm:w-[85%] md:w-[65%] lg:w-[45%] max-w-lg bg-zinc-850/60 p-6 sm:p-8 rounded-2xl border border-zinc-700/50 shadow-2xl backdrop-blur-sm">
        <form onSubmit={handleSubmit(handleSubmitData)} className="flex flex-col gap-4 w-full">
          <div>
            <label className="text-zinc-300 text-sm font-semibold block mb-1.5">
              Name
            </label>
            <input
              {...register("Name")}
              className="w-full bg-zinc-800/80 border border-zinc-700 focus:border-[#6556cd] text-white px-3.5 py-2.5 rounded-xl outline-none text-sm transition-all focus:ring-2 focus:ring-[#6556cd]/20 placeholder-zinc-500"
              type="text"
              placeholder="Enter Your Name"
            />
          </div>

          <div>
            <label className="text-zinc-300 text-sm font-semibold block mb-1.5">
              Email
            </label>
            <input
              {...register("Email")}
              className="w-full bg-zinc-800/80 border border-zinc-700 focus:border-[#6556cd] text-white px-3.5 py-2.5 rounded-xl outline-none text-sm transition-all focus:ring-2 focus:ring-[#6556cd]/20 placeholder-zinc-500"
              type="email"
              placeholder="Enter Your Email Address"
            />
          </div>

          <div>
            <label className="text-zinc-300 text-sm font-semibold block mb-1.5">
              Message
            </label>
            <textarea
              {...register("Message")}
              className="w-full bg-zinc-800/80 border border-zinc-700 focus:border-[#6556cd] text-white px-3.5 py-2.5 rounded-xl outline-none text-sm transition-all focus:ring-2 focus:ring-[#6556cd]/20 placeholder-zinc-500 resize-none"
              rows={4}
              placeholder="Enter your message..."
            />
          </div>

          <div className="flex justify-center mt-2">
            <button
              className="w-full py-3 px-6 text-white font-semibold rounded-xl bg-[#6556cd] hover:bg-[#5344be] shadow-lg shadow-[#6556cd]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              type="submit"
            >
              <i className="ri-send-plane-fill"></i>
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Contact;
