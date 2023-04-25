import React, { useState, useEffect } from 'react';
import {Text} from "react-native";

// On crée un compossant qui pourra etre utilisé dans notre application. (racecard)
function Timer(props) {
  // On crée un état pour stocker le temps restant avant la date donnée en prop
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // On crée une intervalle qui sera appelée toutes les secondes
    const intervalId = setInterval(() => {
      // On récupère la date de fin depuis les props
      const countdownDate = new Date(props.date).getTime();
      // On récupère la date actuelle
      const now = new Date().getTime();
      // On calcule la différence entre les deux en millisecondes
      const difference = countdownDate - now;

      // Si la différence est positive, on met à jour l'état avec le temps restant
      if (difference > 0) {
        setTimeLeft(difference);
      } else {
        // Sinon, on arrête l'intervalle et on remet le temps restant à zéro
        clearInterval(intervalId);
        setTimeLeft(0);
      }
    }, 1000);

    // On retourne une fonction qui sera appelée quand le composant sera démonté
    // Elle arrête l'intervalle pour éviter des problèmes de mémoire
    return () => clearInterval(intervalId);
  }, [props.date]);

  // On calcule le nombre de jours, heures, minutes et secondes à partir du temps restant
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
  const days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);

  // On affiche le compte à rebours dans un composant Text
  return (
    <Text>{`${days} jours ${hours} heures ${minutes} minutes ${seconds} secondes`}</Text>
  );
}

export default Timer;