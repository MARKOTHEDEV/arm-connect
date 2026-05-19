"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Where serious\nwealth finds its home.",
    description:
      "Access your portfolio, connect with your Relationship Manager, and act on exclusive opportunities — all in one place.",
  },
  {
    title: "Invest with\nconfidence.",
    description:
      "Our expert team provides personalized guidance to help you make informed investment decisions.",
  },
  {
    title: "Your wealth,\nyour way.",
    description:
      "Tailored investment strategies designed to meet your unique financial goals and aspirations.",
  },
];

export function AuthCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-[24px] h-[212px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col gap-[24px]"
        >
          <h1 className="font-bold text-[30px] text-white leading-[38px] whitespace-pre-line">
            {slides[currentSlide].title}
          </h1>
          <p className="font-medium text-[16px] text-text-body leading-[24px]">
            {slides[currentSlide].description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Pagination dots */}
      <div className="flex gap-[6px] items-center">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-[21px] h-[7px] bg-white"
                : "w-[7px] h-[7px] bg-text-body-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
