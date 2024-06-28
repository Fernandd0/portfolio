import { ReactNode } from "react";
import styles from "../styles/container.module.css";

interface Props {
  children: ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className={`${styles["e_container"]} mx-auto px-3`}>{children}</div>
  );
};
