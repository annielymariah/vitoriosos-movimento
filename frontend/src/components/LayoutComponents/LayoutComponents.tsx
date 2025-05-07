import { JSX, ReactNode } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import "../../global.css";

interface LayoutComponentsProps {
  children: ReactNode;
}

export const LayoutComponents = ({
  children,
}: LayoutComponentsProps): JSX.Element => {
  return (
    <div className="w-full mx-auto my-0">
      < Navbar/>
      <div className="w-full min-h-screen flex flex-wrap items-center justify-center bg-gray-950">
          {children}
      </div>
      < Footer/>
    </div>
  );
};
