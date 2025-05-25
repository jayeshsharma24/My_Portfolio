import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="
          fixed bottom-6 Left-30 z-50
    w-15 h-15 p-3
    flex flex-col items-center justify-center
    rounded-full bg-white text-black text-[12px]
    shadow-lg hover:bg-blue-200 font-bold
    transition duration-300

        "
        aria-label="Scroll to top"
      >
        <img src="https://img.icons8.com/?size=70&id=4U3llbn1KMYa&format=png&color=000000" alt="" />Top
      </button>
    )
  );
};

export default ScrollToTopButton;
