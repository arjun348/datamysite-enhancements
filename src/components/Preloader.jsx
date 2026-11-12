import { useState, useEffect } from "react";

export default function Preloader() {
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 4;
      if (current >= 100) {
        current = 100;
        setPercent(100);
        clearInterval(interval);
        setTimeout(() => setDone(true), 250);
        setTimeout(() => setRemoved(true), 1300);
      } else {
        setPercent(current);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (removed) return null;

  return (
    <div className={`dms-preloader ${done ? "is-done" : ""}`} aria-hidden="true">
      <div className="pre-inner">
        <div className="pre-logo">DMS</div>
        <div className="pre-count">{percent}%</div>
        <div className="pre-bar">
          <i style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}

