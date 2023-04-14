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
import { updateFirstname,updateToken,updateUsername,updateEmail,updateImage,updateAge,updateGender,updateDatebirth } from '../reducers/user';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from '@react-native-community/datetimepicker';




export default function Racecardtest() {
  const photosData= "https://static.lacapsule.academy/faceup/picture1.jpg";
  
  return (
    <View style={styles.containerall}>


        <Text style={styles.topUsername}>pseudo</Text>
        <View style={styles.containertop}>
          <View style={styles.containertopleft}>
          <Image style={styles.photo} source={require('../assets/shareact3.png')} />
          <Text style={styles.topUsername}>pseudo</Text>
          </View>
          <View style={styles.containertopright}>
              <Text style={styles.txtdescription}>paragraphe blabla</Text>
          </View>
        </View>

        <Text style={styles.topUsername}>pseudo</Text>
        <Text style={styles.topUsername}>pseudo</Text>


    </View>
    
  )
}

const styles = StyleSheet.create({
  containerall: {
    flex: 1,  
  },
  topUsername: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
    color: '#474CCC',
    textAlign: 'center',
    borderColor: '#474CCC',
    borderWidth: 1,
  },
  photo: {
    margin: 10,
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  profil: {
    position: 'absolute',
    width: 90,
    height: 90,
    top:'9%',
    right:'2%',
    borderRadius: 50,
    backgroundColor: '#ffffff',
    zIndex: 1,
    borderWidth:2,
    borderColor: '#474CCC',
    borderWidth : 4,
    borderRadius: 50,
    marginRight:30,
  },
  containertop:{

    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 1,
  },
  containertopleft:{
    borderColor: 'green',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containertopright:{

  },
  txtdescription:{

  },
  input: {
    width: 150,
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    fontSize: 16,
  },

});
