import React, { useEffect, useState } from "react";

const Clock = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const countingDown = new Date("Dec 14, 2024 15:37:25").getTime();

  let interval;
  const countDown = () => {
    interval = setInterval(() => {
      const now = new Date().getTime();
      const deference = countingDown - now;
      const days = Math.floor(deference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (deference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((deference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((deference % (1000 * 60)) / 1000);

      if (countingDown < 0) {
        clearInterval(interval);
      } else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    });
  };
  useEffect(() => {
    countDown();
  });
  return (
    <>
      <div className="clock__wrapper d-flex align-items-center gap-3">
        <div className="clock__data d-flex align-items-center gap-3">
          <div className="text-center">
            <h1 className="text-white fs-3">{days}</h1>
            <h5 className="text-white fs-6">Days</h5>
          </div>
        </div>
        <span className="text-white fs-3">:</span>
        <div className="clock__data d-flex align-items-center gap-3">
          <div className="text-center">
            <h1 className="text-white fs-3">{hours}</h1>
            <h5 className="text-white fs-6">Hours</h5>
          </div>
        </div>
        <span className="text-white fs-3">:</span>
        <div className="clock__data d-flex align-items-center gap-3">
          <div className="text-center">
            <h1 className="text-white fs-3">{minutes}</h1>
            <h5 className="text-white fs-6">Minutes</h5>
          </div>
        </div>
        <span className="text-white fs-3">:</span>
        <div className="clock__data d-flex align-items-center gap-3">
          <div className="text-center">
            <h1 className="text-white fs-3">{seconds}</h1>
            <h5 className="text-white fs-6">Seconds</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clock;
