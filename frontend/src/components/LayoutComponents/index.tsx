import { JSX, ReactNode } from "react";
import "./styles.css";

interface LayoutComponentsProps {
  children: ReactNode;
}

export const LayoutComponents = ({
  children,
}: LayoutComponentsProps): JSX.Element => {
  return (
    <div className="container">
      <div className="container-structure">
        <div className="wrap">{children}</div>
      </div>
    </div>
  );
};
