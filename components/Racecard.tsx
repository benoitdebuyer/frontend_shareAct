import React from "react";
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateFirstname, updateToken, updateUsername, updateEmail, updateImage, updateAge, updateGender, updateDatebirth } from '../reducers/user';



export default function Racecardtest(props) {

  return (
    <View style={styles.container}>

      <View style={styles.containertop}>
        <View style={styles.containertopleft}>
          <Image style={styles.photo} source={require('../assets/user1.png')} />
          <Text style={styles.nameunderpic}>author</Text>
        </View>

        <View style={styles.containertopright}>
          <Text style={styles.txtdescription}>description</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.buttonTimer} onPress={() => handleS()} activeOpacity={0.8}>
          <Text style={styles.textButtontimer}>Commence dans 10 min !</Text>
        </TouchableOpacity>


      <View style={styles.viewTextInfos} >

        <View style={styles.viewTitleInfos}>
          <Text style={styles.textInfosLeft}>Date :</Text>
          <Text style={styles.textInfosLeft}>Lieu :</Text>
          <Text style={styles.textInfosLeft}>Durée :</Text>
          <Text style={styles.textInfosLeft}>Distance :</Text>
          <Text style={styles.textInfosLeft}>Niveau :</Text>

        </View>

        <View style={styles.viewInfos} >
          <Text style={styles.textInfosRight}>formattedDate</Text>
          <Text style={styles.textInfosRight}>address</Text>
          <Text style={styles.textInfosRight}>duration minutes</Text>
          <Text style={styles.textInfosRight}>distance km</Text>
          <Text style={styles.textInfosRight}>level</Text>
        </View>
      </View>

      

        

        <View style={styles.containerButtons}>

        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Chat de groupe</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => handleSubmit()} style={styles.buttonLeave} activeOpacity={0.8}>
        <Text style={styles.textButtonLeave}>Quitter le groupe</Text>
        </TouchableOpacity>

    
      </View>

      {/* <View style={styles.containerbtnbot}>
      <Text style={styles.txtbot}>un imprevu ? besoin de quitter ce groupe !</Text>
        <TouchableOpacity onPress={() => handleLeaveGroupe()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Leave</Text>
        </TouchableOpacity>
      </View> */}


    </View>


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
    fontSize: 16,
    padding: 10,
  },

  containertopusername: {
    // borderColor: 'green',
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
    paddingLeft: 20,
    fontSize: 18,
  },

  textInfosRight: {
    color: 'black',
    marginBottom: 7,
    paddingLeft: 10,
    height: 35,
    fontSize: 18,
  },

  // Bouton timer


  buttonTimer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF4800',
    // backgroundColor: '#FF4800',
    alignItems: 'center',
    // shadowOpacity: 0.4,
    shadowRadius: 5,
    marginTop: 30,
    marginBottom: 10,
    // elevation: 10,
  },
  textButtontimer: {
    fontWeight: '500',
    fontSize: 16,
  },


  containerButtons : {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Bouton chat de groupe 
  button: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    marginTop: 20,
    backgroundColor: '#474CCC',
    borderRadius: 50,
    // solution à changer !!! pour mettre le bouton au milieu (container)
    // marginLeft: 60,
  },
  textButton: {
    color: '#ffffff',
    fontWeight: '600',
    height: 30,
    fontSize: 16,
  },

  // Bouton pour quitter le groupe de la course 
  buttonLeave: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#FF4800',
    width: "60%",
    paddingTop: 8,
    borderRadius: 50,
  },

  textButtonLeave:  {
    color: '#fff',
    fontWeight: '600',
    height: 30,
    fontSize: 16,
  },


});


{/* <View style={styles.containertxtinfo} >
<View style={styles.viewinfo}>
  <Text style={styles.txtinfoleft}>Date :</Text>
  <Text style={styles.txtinforight}>{props.date}date</Text>
</View>
<View style={styles.viewinfo}>
  <Text style={styles.txtinfoleft}>Lieu :</Text>
  <Text style={styles.txtinforight}>{props.lieu}lieu</Text>
</View>
<View style={styles.viewinfo}>
  <Text style={styles.txtinfoleft}>Durée :</Text>
  <Text style={styles.txtinforight}>{props.durée}durée</Text>
</View>
<View style={styles.viewinfo}>
  <Text style={styles.txtinfoleft}>Distance :</Text>
  <Text style={styles.txtinforight}>{props.distance}distance</Text>
</View>
<View style={styles.viewinfo}>
  <Text style={styles.txtinfoleft}>Niveau :</Text>
  <Text style={styles.txtinforight}>{props.niveau}niveau</Text>
</View>
<View style={styles.viewinfo}>
  <Text style={styles.txtinfoleft}>Participants :</Text>
  <Text style={styles.txtinforight}>{props.participants}participants</Text>
</View>
</View> */}

