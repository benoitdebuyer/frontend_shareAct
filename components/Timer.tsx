import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    <Text>{`${days} jours ${hours} heures ${minutes} minutes ${seconds} secondes`}</Text>
  );
}

export default Timer;
