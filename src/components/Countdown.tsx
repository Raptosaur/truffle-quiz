import { CSSProperties, useCallback, useEffect, useState } from "react";

export type CountdownProps = {
  onComplete?: () => void;
  onDecrement?: (newValue?: number) => void;
  startingValue: number;
  style?: CSSProperties;
};

export const Countdown = ({
  startingValue,
  onComplete,
  onDecrement,
  style,
}: CountdownProps) => {
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(startingValue);

  const decrementCountdown = useCallback(() => {
    setTimeLeftInSeconds((timeLeftInSeconds) => {
      if (onDecrement) onDecrement(timeLeftInSeconds - 1);
      return timeLeftInSeconds - 1;
    });
  }, []);

  useEffect(() => {
    if (timeLeftInSeconds <= 0) {
      if (onComplete) onComplete();
      return;
    }
    const countdownInterval = setTimeout(decrementCountdown, 1000);
    return () => clearInterval(countdownInterval);
  }, [decrementCountdown, timeLeftInSeconds]);

  return (
    <div style={{ position: "absolute", ...style }}>
      {pad(Math.floor(timeLeftInSeconds / 60))}:{pad(timeLeftInSeconds % 60)}
    </div>
  );
};

function pad(num: number) {
  var s = "00" + num;
  return s.substring(s.length - 2);
}
