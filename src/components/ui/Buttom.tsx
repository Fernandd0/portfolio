import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
  to?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}

export const Buttom: React.FC<Props> = ({
  children,
  className = "",
  to = "#",
  type,
  onClick,
}) => {
  if (!type) {
    return (
      <Link
        to={to}
        className={twMerge(
          "relative inline-block px-4 py-2 bg-white text-black select-none font-retro",
          className
        )}
      >
        <div className="absolute top-0 left-0 w-1 h-1 bg-white z-[99]"></div>
        <div className="absolute top-0 right-0 w-1 h-1 bg-white z-[99]"></div>
        <div className="absolute bottom-0 left-0 w-1 h-1 bg-white z-[99]"></div>
        <div className="absolute bottom-0 right-0 w-1 h-1 bg-white z-[99]"></div>

        <div className="absolute top-0 left-1 right-1 border-t-4 border-black z-[99]"></div>
        <div className="absolute bottom-0 left-1 right-1 border-b-4 border-black z-[99]"></div>
        <div className="absolute left-0 top-1 bottom-1 border-l-4 border-black z-[99]"></div>
        <div className="absolute right-0 top-1 bottom-1 border-r-4 border-black z-[99]"></div>

        {children}
      </Link>
    );
  } else {
    return (
      <div className="relative">
        <div className="absolute top-0 left-0 w-1 h-1 bg-white z-[99]"></div>
        <div className="absolute top-0 right-0 w-1 h-1 bg-white z-[99]"></div>
        <div className="absolute bottom-0 left-0 w-1 h-1 bg-white z-[99]"></div>
        <div className="absolute bottom-0 right-0 w-1 h-1 bg-white z-[99]"></div>

        <div className="absolute top-0 left-1 right-1 border-t-4 border-black z-[99]"></div>
        <div className="absolute bottom-0 left-1 right-1 border-b-4 border-black z-[99]"></div>
        <div className="absolute left-0 top-1 bottom-1 border-l-4 border-black z-[99]"></div>
        <div className="absolute right-0 top-1 bottom-1 border-r-4 border-black z-[99]"></div>

        <button
          type={type}
          onClick={onClick}
          className={twMerge(
            "relative inline-block px-4 py-2 bg-white text-black select-none font-retro",
            className
          )}
        >
          {children}
        </button>
      </div>
    );
  }
};
