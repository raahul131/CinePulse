import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children }) => {
  return (
    <button className="bg-white text-black px-6 py-2 rounded-md font-bold absolute -bottom-14 flex gap-x-3 items-center hover:bg-white/60 transition duration-200">
      {children}
    </button>
  );
};

export default Button;
