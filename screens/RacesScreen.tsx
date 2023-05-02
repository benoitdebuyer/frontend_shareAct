import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Racecardtest from '../components/Racecard'


const BACKEND_ADDRESS = 'https://shareact-backend.vercel.app';

export default function PlacesScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();
  const [racesUp, setRacesUp] = useState([]);
  const [author, setAuthor] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  function handleUpdate() {
    setShouldUpdate(prev => !prev);
  }

  // usefeect qui permet quand on revient sur la page 'isFocused' de fech  les course add par l utilisateur 
  const token = user.token
  useEffect(() => {
    // console.log('usertoken debut de l use effetc',token)
    if (isFocused) {
      fetch(`${BACKEND_ADDRESS}/users/add/${token}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log('data dans le fetch //////',data)
          setRacesUp(data.races);

        });
    }
  }, [isFocused, shouldUpdate]);

///// mise en forme de la date
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(date).toLocaleString('fr-FR', options);
    return formattedDate;
  }

///// map des course pour remplir les props qui viennent du composants racecard"test" ! 
  const allRacesUp = racesUp.map((race, i) => {

   // console.log("/////////", race.author.image)
    const date = formatDate(race.date)
    // console.log('date de race log',date)
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
      <Text style={styles.title}>Mes courses</Text>


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
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  title: {
    width: '80%',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 38,
    fontWeight: '600',
    color: '#474CCC',
  },
  scrollView: {
    alignItems: 'center',
    width: '85%',
  },
 
  viewcard: {
    width: '100%',
  },

});
