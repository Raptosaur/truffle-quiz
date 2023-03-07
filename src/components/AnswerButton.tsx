import styles from "./AnswerButton.module.css";
import clsx from "clsx";
import { useSocket } from "../SocketContext";

export type AnswerButtonProps = {
  text: string;
  canAnswer: boolean;
  idx: 0 | 1 | 2 | 3;
};

export const AnswerButton = ({ text, canAnswer, idx }: AnswerButtonProps) => {
  const socket = useSocket();
  return (
    <div
      className={clsx(styles.AnswerButton, { [styles.disabled]: !canAnswer })}
      onClick={() => {
        if (!socket) return;
        socket.emit("answer", idx);
      }}
    >
      {text}
    </div>
  );
};
