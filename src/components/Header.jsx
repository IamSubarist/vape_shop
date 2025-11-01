import React from "react";
import logo from "../assets/logo.svg";

export const Header = () => {
  return (
    <div className="flex items-center justify-start gap-2 h-full px-6">
      <img className="size-[80px]" src={logo} alt="logo" />
      <div className="flex flex-col justify-between">
        <p className="text-[36px] font-bold leading-[36px] text-gray-100 relative logo-text">
          <span
            className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
            style={{
              backgroundSize: "200% auto",
            }}
          >
            SmokeLabRND
          </span>
        </p>
        <p className="text-[18px] leading-[18px] text-gray-400 font-medium">
          здесь еще какой-то текст...
        </p>
      </div>
    </div>
  );
};
