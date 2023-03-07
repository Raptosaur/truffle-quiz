import { useState } from "react";
import { AnswerButton } from "./AnswerButton";
import { Countdown } from "./Countdown";
import styles from "./QuizBar.module.css";

export type Question = {
  text: string;
  answers: [string, string, string, string];
};

export const QuizBar = ({ text, answers }: Question) => {
  const [canAnswer, setCanAnswer] = useState(true);

  return (
    <div className={styles.QuizBar}>
      <Countdown startingValue={30} onComplete={() => setCanAnswer(false)} />
      <div className={styles.QuestionText}>{text}</div>
      <div className={styles.Answers}>
        <div className={styles.AnswersPair}>
          <AnswerButton canAnswer={canAnswer} text={answers[0]} idx={0} />
          <AnswerButton canAnswer={canAnswer} text={answers[1]} idx={1} />
        </div>
        <div className={styles.AnswersPair}>
          <AnswerButton canAnswer={canAnswer} text={answers[2]} idx={2} />
          <AnswerButton canAnswer={canAnswer} text={answers[3]} idx={3} />
        </div>
      </div>
    </div>
  );
};
