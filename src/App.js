import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const DOOR_HEIGHT = 500;
  const [height, setHeight] = useState(DOOR_HEIGHT);
  const [isMoving, setIsMoving] = useState(false);
  const [isUp, setIsUp] = useState(true);

  const stopDoor = () => {
    setIsMoving(false);
  };

  const openDoor = () => {
    setIsUp(true);
    setIsMoving(true);
  };

  const closeDoor = () => {
    setIsUp(false);
    setIsMoving(true);
  };

  useEffect(() => {
    if (!isMoving) {
      return;
    }

    if ((isUp && height === 0) || (!isUp && height === DOOR_HEIGHT)) {
      setIsMoving(false);
      return;
    }

    const intervalId = setInterval(() => {
      setHeight((h) => (isUp ? h - 1 : h + 1));
    }, 10);

    return () => clearInterval(intervalId);
  }, [isMoving, isUp, height]);

  return (
    <div className="App">
      <div className="garage">
        <div className="garageDoor" style={{ height: height }}></div>
      </div>
      <button onClick={openDoor}>Open ▲</button>
      <button onClick={stopDoor}>Stop ■</button>
      <button onClick={closeDoor}>Close ▼</button>
    </div>
  );
}
