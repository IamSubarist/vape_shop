import React from "react";
import logo from "../assets/logo.svg";

export const Header = () => {
  return (
    <div className="flex items-center justify-center gap-2 h-full px-6">
      <img className="size-[80px]" src={logo} alt="logo" />
      <div className="flex flex-col justify-between">
        <p
          className="text-[36px] font-bold leading-[36px] text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(to right, #7C3AED, #EC4899, #F97316, #06B6D4)",
          }}
        >
          SmokeLabRND
        </p>
        <p
          className="text-[18px] leading-[18px] text-transparent bg-clip-text"
          style={{
            backgroundImage:
              "linear-gradient(to right, #7C3AED, #EC4899, #F97316, #06B6D4)",
          }}
        >
          здесь еще какой-то текст...
        </p>
      </div>
    </div>
  );
};
