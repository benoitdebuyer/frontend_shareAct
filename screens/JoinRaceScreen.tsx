import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { udptadeIdRace } from "../reducers/race";
import Participants from '../components/Participants';

export default function JoinRaceScreen() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.value);
  const race = useSelector((state) => state.race.value);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [level, setLevel] = useState(null);
  const [address, setAddress] = useState(null);
  const [author, setAuthor] = useState(null);
  const [participants, setParticipants] = useState(null);
  const [userInRace, setUserInRace] = useState(false);


  // const BACKEND_ADDRESS = 'http://192.168.0.18:3000';
  const BACKEND_ADDRESS = "https://shareact-backend.vercel.app";

  // console.log(user.token)
  // console.log(race.addracebyuser._id)
  // console.log(participants)


  useEffect(() => {
    if (!user.token) {
      return;
    }

    fetch(`${BACKEND_ADDRESS}/races/${race.addracebyuser._id}/${user.token}`)
      .then(response => response.json())
      .then(data => {
        setDescription(data.race.description);
        setDistance(data.race.distance);
        setDuration(data.race.duration);
        setLevel(data.race.level);
        setAddress(data.race.address);
        setDate(data.race.date);
        setAuthor(data.race.author.username);
        // setParticipants(data.race.participants[0].username);
        setParticipants(data.race.participants.map(participant => participant.username));
      });
  }, []);


if (user.username == race.participants || race.author){
setUserInRace(true)
}


  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(date).toLocaleString('fr-FR', options);
    return formattedDate;
  }


  // Appel de la fonction pour formater la date
  const formattedDate = formatDate(date);


  const handleSubmit = () => {
    fetch(`${BACKEND_ADDRESS}/races/participants`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, raceId: race.addracebyuser._id }),
    }).then(response => response.json())
      .then(data => {
        // data.result;
        navigation.navigate('TabNavigator', { screen: 'Courses' });
      });
  };



  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>



        <View style={styles.containertop}>
          <View style={styles.containertopleft}>
            <Image style={styles.photo} source={require('../assets/user1.png')} />
            <Text style={styles.nameunderpic}>{author}</Text>
          </View>

          <View style={styles.containertopright}>
            <Text style={styles.txtdescription}>{description}</Text>
          </View>
        </View>



        <View style={styles.viewTextInfos} >

          <View style={styles.viewTitleInfos}>
            <Text style={styles.textInfosLeft}>Date :</Text>
            <Text style={styles.textInfosLeft}>Lieu :</Text>
            <Text style={styles.textInfosLeft}>Durée :</Text>
            <Text style={styles.textInfosLeft}>Distance :</Text>
            <Text style={styles.textInfosLeft}>Niveau :</Text>

          </View>

          <View style={styles.viewInfos} >
            <Text style={styles.textInfosRight}>{formattedDate}</Text>
            <Text style={styles.textInfosRight}>{address}</Text>
            <Text style={styles.textInfosRight}>{duration} minutes</Text>
            <Text style={styles.textInfosRight}>{distance} km</Text>
            <Text style={styles.textInfosRight}>{level}</Text>
          </View>
        </View>

        <Text style={styles.titleParticipants}>Participants :</Text>
        <View style={styles.containerParticipants}>
          {participants && participants.map((participant, index) => (
            <View key={index} style={styles.participant}>
              <Image style={styles.photoParticipants} source={require('../assets/Shareact2.png')} />
              <Text style={styles.pseudo}>{participant}</Text>
            </View>
          ))}


      </View>

      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Rejoindre la course</Text>
      </TouchableOpacity>

    </View>
    </ScrollView >


  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    paddingHorizontal: 20,
  },

  // Photo et description 
  containertop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    alignItems: 'flex-start',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  containertopleft: {
    // borderColor: 'green',
    // borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containertopright: {
    // margin: 10,
    // borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#e2e2f3',
    borderBottomColor: '#474CCC',
    width: 200,
    height: 150,
    marginLeft: 20,
  },
  txtdescription: {
    fontSize: 14,
    padding: 10,
  },

  containertopusername: {
    borderColor: 'green',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  nameunderpic: {
    width: '80%',
    fontSize: 16,
    paddingTop: 5,
    fontWeight: '600',
    color: '#474CCC',
    textAlign: 'center',
  },

  photo: {
    // margin: 5,
    width: 140,
    height: 140,
    borderRadius: 100,
    borderColor: '#474CCC',
    borderWidth: 4,
  },

  // Informations 
  viewTextInfos: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,

  },

  viewTitleInfos: {
    flexDirection: 'column',
  },
  viewInfos: {
    flexDirection: 'column',
    width: '80%',
  },
  textInfosLeft: {
    color: '#474CCC',
    marginBottom: 7,
    height: 35,
  },

  textInfosRight: {
    color: 'gray',
    marginBottom: 7,
    paddingLeft: 7,
    height: 35,
  },

  // Participants

  titleParticipants: {
    marginTop: 10,
    color: '#474CCC',
  },
  containerParticipants: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  participant: {
    margin: 10,
  },
  photoParticipants: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: '#474CCC',
    borderWidth: 4,
    marginHorizontal: 10,
  },
  pseudo: {
    paddingVertical: 10,
    textAlign: 'center',
  },


  // Bouton rejoindre le groupe
  button: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    marginTop: 20,
    backgroundColor: '#474CCC',
    borderRadius: 50,
    // solution à changer !!! pour mettre le bouton au milieu (container)
    marginLeft: 60,
  },
  buttonUserInRace: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    marginTop: 20,
    backgroundColor: '#474CCC',
    borderRadius: 50,
    // solution à changer !!! pour mettre le bouton au milieu (container)
    marginLeft: 60,
  },
  textButton: {
    color: '#ffffff',
    fontWeight: '600',
    height: 30,
    fontSize: 16,
  },



});