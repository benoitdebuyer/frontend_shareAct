import React from "react";
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  UserState,
  Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateFirstname, updateToken, updateUsername, updateEmail, updateImage, updateAge, updateGender, updateDatebirth } from '../reducers/user';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from '@react-native-community/datetimepicker';

export default function JoinRaceScreen(props) {

  return (
    <View style={styles.container}>



      <View style={styles.containertop}>
        <View style={styles.containertopleft}>
          <Image style={styles.photo} source={require('../assets/user.png')} />
          <Text style={styles.nameunderpic}>{props.username}username</Text>
        </View>

        <View style={styles.containertopright}>
          <Text style={styles.txtdescription}>{props.description}Entraînement pour le prochain marathon</Text>
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
          <Text style={styles.textInfosRight}>{props.date}date</Text>
          <Text style={styles.textInfosRight}>{props.lieu}lieu</Text>
          <Text style={styles.textInfosRight}>{props.durée}durée</Text>
          <Text style={styles.textInfosRight}>{props.distance}distance</Text>
          <Text style={styles.textInfosRight}>{props.niveau}niveau</Text>
        </View>
      </View>

      <Text style={styles.titleParticipants}>Participants :</Text>
      <View style={styles.containerParticipants}>
        <View style={styles.participant}>
          <Image style={styles.photoParticipants} source={require('../assets/Shareact2.png')} />
          <Text style={styles.pseudo}>@pseudo{props.username}</Text>
        </View>

        <View style={styles.participant}>
          <Image style={styles.photoParticipants} source={require('../assets/Shareact2.png')} />
          <Text style={styles.pseudo}>@pseudo{props.username}</Text>
        </View>

        <View style={styles.participant}>
          <Image style={styles.photoParticipants} source={require('../assets/Shareact2.png')} />
          <Text style={styles.pseudo}>@pseudo{props.username}</Text>
        </View>
        <View style={styles.participant}>
          <Image style={styles.photoParticipants} source={require('../assets/Shareact2.png')} />
          <Text style={styles.pseudo}>@pseudo{props.username}</Text>
        </View>
        <View style={styles.participant}>
          <Image style={styles.photoParticipants} source={require('../assets/Shareact2.png')} />
          <Text style={styles.pseudo}>@pseudo{props.username}</Text>
        </View>
        <View style={styles.participant}>
          <Image style={styles.photoParticipants} source={require('../assets/Shareact2.png')} />
          <Text style={styles.pseudo}>@pseudo{props.username}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Rejoindre le groupe</Text>
      </TouchableOpacity>

    </View>


  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },

  // Photo et description 
  containertop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
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
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: '#474CCC',
    borderWidth: 4,
  },

  // Informations 
  viewTextInfos: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,

  },

  viewTitleInfos: {
    flexDirection: 'column',
  },
  viewInfors: {
    flexDirection: 'column',
  },
  textInfosLeft: {
    color: '#474CCC',
    marginBottom: 5,
  },

  textInfosRight: {
    color: 'gray',
    paddingLeft: 10,
    marginBottom: 5,
  },

  // Participants

  titleParticipants: {
    paddingLeft: 30,
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
    width: 70,
    height: 70,
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
  textButton: {
    color: '#ffffff',
    fontWeight: '600',
    height: 30,
    fontSize: 16,
 },



});