import React from "react";
import { Link, useLocation } from "react-router-dom";

export const NavBar = () => {
  const location = useLocation();

  return (
    <div className="flex justify-center w-full">
      <Link
        style={{
          backgroundImage:
            "linear-gradient(to right, #7C3AED, #EC4899, #F97316, #06B6D4)",
        }}
        to="/"
        className={`w-1/3 flex flex-col items-center justify-center text-transparent bg-clip-text`}
      >
        Жидкости
        {location.pathname === "/" ? (
          <div
            className="h-[1px] w-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, #7C3AED, #EC4899, #F97316, #06B6D4)",
            }}
          ></div>
        ) : (
          <div className="h-[1px] w-full"></div>
        )}
      </Link>
      <Link
        style={{
          backgroundImage:
            "linear-gradient(to right, #7C3AED, #EC4899, #F97316, #06B6D4)",
        }}
        to="/cartridges"
        className={`w-1/3 flex flex-col items-center justify-center text-transparent bg-clip-text`}
      >
        Картриджи
        {location.pathname === "/cartridges" ? (
          <div
            className="h-[1px] w-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, #7C3AED, #EC4899, #F97316, #06B6D4)",
            }}
          ></div>
        ) : (
          <div className="h-[1px] w-full"></div>
        )}
      </Link>
      <Link
        style={{
          backgroundImage:
            "linear-gradient(to right, #7C3AED, #EC4899, #F97316, #06B6D4)",
        }}
        to="/pods"
        className={`w-1/3 flex flex-col items-center justify-center text-transparent bg-clip-text`}
      >
        Устройства
        {location.pathname === "/pods" ? (
          <div
            className="h-[1px] w-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, #7C3AED, #EC4899, #F97316, #06B6D4)",
            }}
          ></div>
        ) : (
          <div className="h-[1px] w-full"></div>
        )}
      </Link>
    </div>
  );
};
