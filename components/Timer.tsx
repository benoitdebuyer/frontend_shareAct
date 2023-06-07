import React, { useState, useEffect } from 'react';
import {Text} from "react-native";

function Timer(props) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const countdownDate = new Date(props.date).getTime();
      const now = new Date().getTime();
      const difference = countdownDate - now;

      if (difference > 0) {
        setTimeLeft(difference);
      } else {
        clearInterval(intervalId);
        setTimeLeft(0);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [props.date]);

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
  const days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);

  return (
    <Text style={{ color: 'black', fontWeight:"bold", fontStyle:"italic" }}>{`Commence dans ${days} jours et ${hours} heures !`}</Text>

  );
}

export default Timer;