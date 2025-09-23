import React from "react";
import { motion as Motion } from "framer-motion";

export default function Loader({ className = "bg-white" }) {
  const dots = [0, 1, 2, 3];

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div
        role="status"
        aria-label="Loading"
        className="flex items-center space-x-3"
      >
        {dots.map((i) => (
          <Motion.span
            key={i}
            initial={{ y: 0 }}
            animate={{ y: [0, -12, 0] }}
            transition={{
              delay: i * 0.12,
              duration: 0.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
            className={`w-4 h-4 rounded-full ${className}`}
          />
        ))}

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
