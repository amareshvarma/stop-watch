import "./styles.css";
import { useState, useRef, useEffect } from "react";

export default function App() {
  let animationFrameRef = useRef(0);
  const lastTimer = useRef(Date.now());

  // local state (changing this value rerenders the UI)
  const [timerString, updateTime] = useState(["00", "00", "00"]);
  const [isTimerRunning, setisTimerRunning] = useState(false);

  const timerFn = () => {
    // Calculate the elapsed time in milliseconds, seconds, and minutes
    const milliSecondElapsed = Date.now() - lastTimer.current;
    const secondsElapsed = Math.floor(milliSecondElapsed / 1000);
    const minutesElapsed = Math.floor(secondsElapsed / 60);

    // Convert the elapsed time to strings
    const milliSeconds = (milliSecondElapsed % 1000)
      .toString()
      .padStart(3, "0");
    const seconds = (secondsElapsed % 60).toString().padStart(2, "0");
    const minutes = minutesElapsed.toString().padStart(2, "0");

    // updating time state
    updateTime([minutes, seconds, milliSeconds]);

    // running the same function (this equal to recursion, but it is improved since browser has control over this fn)
    animationFrameRef.current = requestAnimationFrame(timerFn);
  };

  const onStart = () => {
    setisTimerRunning(true);
    // useRef store it value in ref.value key
    animationFrameRef.current = requestAnimationFrame(timerFn);
  };

  const onStop = () => {
    setisTimerRunning(false);
    cancelAnimationFrame(animationFrameRef.current);
  };

  const onReset = () => {
    setisTimerRunning(false);
    updateTime(["00", "00", "00"]);
    cancelAnimationFrame(animationFrameRef.current);
    lastTimer.current = Date.now();
  };

  useEffect(() => {
    return cancelAnimationFrame(animationFrameRef.current);
  }, []);

  return (
    <div className="App">
      <div className="timer">
        <span className="minutes">{timerString[0]}</span>:
        <span className="seconds">{timerString[1]}</span>:
        <span className="milli-seconds">{timerString[2]}</span>
      </div>
      <div className="btn-container">
        <button onClick={onStart}>start</button>
        <button onClick={onStop} disabled={!isTimerRunning}>
          stop
        </button>
        <button onClick={onReset} disabled={!isTimerRunning}>
          reset
        </button>
      </div>
    </div>
  );
}
