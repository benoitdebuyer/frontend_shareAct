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

        <View style={styles.containertxtinfo} >
      <View style={styles.viewinfo}>
        <Text style={styles.txtinfoleft}>pseudo</Text>
        <Text style={styles.txtinforight}>txt pseudo</Text>
      </View>
      <View style={styles.viewinfo}>
        <Text style={styles.txtinfoleft}>pseudo</Text>
        <Text style={styles.txtinforight}>txt pseudo</Text>
      </View>
      <View style={styles.viewinfo}>
        <Text style={styles.txtinfoleft}>pseudo</Text>
        <Text style={styles.txtinforight}>txt pseudo</Text>
      </View>
      <View style={styles.viewinfo}>
        <Text style={styles.txtinfoleft}>pseudo</Text>
        <Text style={styles.txtinforight}>txt pseudo</Text>
      </View>
      <View style={styles.viewinfo}>
        <Text style={styles.txtinfoleft}>pseudo</Text>
        <Text style={styles.txtinforight}>txt pseudo</Text>
      </View>
      <View style={styles.viewinfo}>
        <Text style={styles.txtinfoleft}>pseudo</Text>
        <Text style={styles.txtinforight}>txt pseudo</Text>
      </View>
    </View>


      <View style={styles.containerbtnbot}>
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Aller au chat de groupe</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Commence dans XXX min !</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerbtnbot}>
      <Text style={styles.txtbot}>un imprevu ? besoin de quitter ce groupe !</Text>
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Leave</Text>
        </TouchableOpacity>
      </View>


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
     alignItems: 'center',
  },
  containertopleft:{
    borderColor: 'green',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containertopright:{

  },
  txtdescription:{

  },

  containertxtinfo:{
    flexDirection: 'column',
    borderColor: 'yellow',
    borderWidth: 1,
  },
 viewinfo:{
  flexDirection: 'row',
  borderColor: 'grey',
  borderWidth: 1,
  alignItems:'center',
  justifyContent:"space-evenly",
  },
  txtinfoleft:{
    width:60,
    marginTop: 2,
    color: '#474CCC',
    
  },
  txtinforight:{
    marginLeft:20,
    marginTop: 2,
    color: 'grey',
  },



  input: {
    width: 150,
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  containerbtnbot: {
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 1,
    justifyContent: "space-around",
  },

  txtbot: {
    color: 'grey',
    height: 50,
    fontWeight: '600',
    fontSize: 12,
  },

  textButton: {
    color: 'grey',
    height: 50,
    fontWeight: '600',
    fontSize: 18,
  },
});
