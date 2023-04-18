import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addPlace, removePlace } from '../reducers/user';
import { useIsFocused } from '@react-navigation/native';
import Racecardtest from '../components/Racecard'


const BACKEND_ADDRESS = 'https://shareact-backend.vercel.app';

export default function PlacesScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();
  const [racesUp, setRacesUp] = useState([]);

  const [shouldUpdate, setShouldUpdate] = useState(false);

function handleUpdate() {
  setShouldUpdate(prev => !prev);
}

const token = user.token
  useEffect(() => {
    console.log('usertoken debut de l use effetc',token)
    if (isFocused) {
      fetch(`${BACKEND_ADDRESS}/users/add/${token}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('data dans le fetch //////',data)
          setRacesUp(data.races);
        });
    }
  }, [isFocused,shouldUpdate ]);

  
  console.log('raceUp',racesUp)
 


  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = date.getDate();
  //   const monthIndex = date.getMonth();
  //   // const month = date.toLocaleString("default", { month: "long", locale: 'fr-FR' });
  //   const year = date.getFullYear();
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes().toString().padStart(2, '0');

  //   const months = [
  //     "Janvier",
  //     "Février",
  //     "Mars",
  //     "Avril",
  //     "Mai",
  //     "Juin",
  //     "Juillet",
  //     "Août",
  //     "Septembre",
  //     "Octobre",
  //     "Novembre",
  //     "Décembre",
  //   ];
    
  //   const formattedDate = `${day} ${months[monthIndex]} ${year} à ${hours}:${minutes}`;
  //   return `Le ${formattedDate}`;
  // };

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(date).toLocaleString('fr-FR', options);
    return formattedDate;
  }


  const allRacesUp = racesUp.map((race, i) => {

    
const date = formatDate(race.date)
    console.log('date de race log',date)
    return (
      <Racecardtest 
      onUpdate={handleUpdate}
      key={race._id}
      author={race.author.username}
      description={race.description}
      date={date}
      address={race.address}
      duration={race.duration}
      distance={race.distance}
      level={race.level}
      participants={race.participants}
      _idRace = {race._id}
      />

    );
  });

  // key={race._id}
  // author={race.author}
  // description={race.description}
  // date={formatDate(race.date)}
  // address={race.address}
  // duration={race.duration}
  // distance={race.distance}
  // level={race.level}
console.log(allRacesUp)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>En cours</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFinish} activeOpacity={0.8}>
          <Text style={styles.textButton}>Terminés</Text>
        </TouchableOpacity>
      </View>


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
  scrollView: {
    alignItems: 'center',
    width:'85%',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  viewcard: {
   width: '100%',
  },
  name: {
    fontSize: 18,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  button: {
    width: '40%',
    alignItems: 'center',
    paddingTop: 8,
    backgroundColor: '#E2E2F3',
    borderRadius: 10,
    borderWidth: 1,
    borderBottomColor: '#474CCC',
  },
  buttonFinish: {
    width: '40%',
    alignItems: 'center',
    paddingTop: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderBottomColor: '#474CCC',
  },
  textButton: {
    color: 'black',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
  textRace : {
    fontSize: 28,
    color: '#474CCC',
    padding: 20,
    borderBottomColor: '#474CCC',
    borderWidth: 1,
    backgroundColor: '#fff',
  }
});
