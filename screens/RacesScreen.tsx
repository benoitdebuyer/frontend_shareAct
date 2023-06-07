import React, { useEffect, useState} from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Racecardtest from '../components/Racecard'

const BACKEND_ADDRESS = 'https://backend-share-act.vercel.app/';

export default function PlacesScreen() {
  
  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();
  const [racesUp, setRacesUp] = useState([]);
  const [author, setAuthor] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  function handleUpdate() {
    setShouldUpdate(prev => !prev);
  }

  const token = user.token
  useEffect(() => {
    if (isFocused) {
      fetch(`${BACKEND_ADDRESS}/users/add/${token}`)
        .then((response) => response.json())
        .then((data) => {
          setRacesUp(data.races);

        });
    }
  }, [isFocused, shouldUpdate]);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(date).toLocaleString('fr-FR', options);
    return formattedDate;
  }

  const allRacesUp = racesUp.map((race, i) => {

    const date = formatDate(race.date)
    return (
      <Racecardtest
        onUpdate={handleUpdate}
        key={race._id}
        author={race.author.username}
        description={race.description}
        date={date}
        dateTimer={race.date}
        address={race.address}
        duration={race.duration}
        distance={race.distance}
        level={race.level}
        participants={race.participants}
        _idRace={race._id}
        authorImage={race.author.image}
      />
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Let's go !</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.viewcard}>
          {allRacesUp}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#474CCC',
    alignItems: 'center',
    marginTop: 35,
  },

  title: {
    width: '80%',
    margin: 20,
    textAlign: 'center',
    fontSize: 38,
    fontWeight: '600',
    color: '#E1ECF4',
    fontStyle:"italic",
  },

  scrollView: {
    alignItems: 'center',
    width: '85%',
  },
 
  viewcard: {
    width: '100%',  
  },
});
