import React, { useEffect, useState } from "react";

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    const container = document.getElementById("scrollable-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = document.getElementById("scrollable-container");
    if (!container) return;

    const handleScroll = () => {
      setIsVisible(container.scrollTop > 400); 
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-12">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-zinc-400/20 text-white rounded-full px-4 py-3 shadow-lg hover:bg-[#6556cd] transition-all"
        >
          <i className="ri-arrow-up-line text-xl"></i>
        </button>
      )}
    </div>
  );
};

export default ScrollUpButton;
