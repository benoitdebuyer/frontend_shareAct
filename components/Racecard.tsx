import React from "react";
import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {useSelector } from "react-redux";
import Timer from "./Timer";

const BACKEND_ADDRESS = 'https://backend-share-act.vercel.app/';


export default function Racecardtest(props) {
  const [isAuthor, setIsAuthor] = useState(false);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (props.author === user.username) {
      setIsAuthor(true);
    }
  }, [props.author, user.username]);

  const handleLeaveGroupe = (idRace) => {

    fetch(`${BACKEND_ADDRESS}/races/participants`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, raceId: idRace }),
    }).then(response => response.json())
      .then(data => {
        props.onUpdate();

      });
  };
 
  const handleDeleteRace = (idRace) => {
    fetch(`${BACKEND_ADDRESS}/races`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, raceId: idRace }),
    })
      .then(response => response.json())
      .then(data => {
          props.onUpdate();
      })
  };

  return (
    <View style={styles.container}>
      <View style={styles.containertop}>
        <View style={styles.containertopleft}>
          <Image style={styles.photo} source={{ uri : props.authorImage}} />
          <Text style={styles.nameunderpic}>{props.author}</Text>
        </View>
        <View style={styles.containertopright}>
          <Text style={styles.txtdescriptiontitre}>Message de l'organisateur :</Text>
          <Text style={styles.txtdescription}> "{props.description}"</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonTimer}
        activeOpacity={0.8}> 
        <Timer date={props.dateTimer} />
      </TouchableOpacity>
      <View style={styles.viewTextInfos}>
        <View style={styles.viewTitleInfos}>
          <Text style={styles.textInfosLeft}>Date </Text>
          <Text style={styles.textInfosLeft}>Lieu </Text>
          <Text style={styles.textInfosLeft}>Durée </Text>
          <Text style={styles.textInfosLeft}>Distance </Text>
          <Text style={styles.textInfosLeft}>Niveau </Text>
          <Text style={styles.textInfosLeft}>Participants </Text>
        </View>
        <View style={styles.viewInfos}>
          <Text style={styles.textInfosRight}>{props.date}</Text>
          <Text style={styles.textInfosRight}>{props.address}</Text>
          <Text style={styles.textInfosRight}>{props.duration} minutes</Text>
          <Text style={styles.textInfosRight}>{props.distance} km</Text>
          <Text style={styles.textInfosRight}>{props.level}</Text>
          <Text style={styles.textInfosRight}>{props.participants}</Text>
        </View>
      </View>
      <View style={styles.containerButtonLeave}>
          {isAuthor ?
          <TouchableOpacity
            onPress={() => handleDeleteRace(props._idRace)}
            style={styles.buttonDelete}
            activeOpacity={0.8}>
            <Text style={styles.textButton}>Supprimer la course</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() => handleLeaveGroupe(props._idRace)}
            style={styles.buttonLeave}
            activeOpacity={0.8}>
            <Text style={styles.textButton}>Quitter le groupe</Text>
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    paddingTop: 15,
    paddingHorizontal: 30,
    borderColor: "#E1ECF4",
    borderRadius: 70,
    borderWidth: 5,
    backgroundColor: "white",
  },

  containertop: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    alignItems: "flex-start",
    marginBottom: 10,
 
  },

  containertopleft: {
    justifyContent: "center",
    alignItems: "center",
  },

  containertopright: {
    borderColor: 'grey',
    borderRadius: 20,
    width: 200,
    height: 130,
    marginLeft: 50,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  },

  txtdescription: {
    fontSize: 16,
    paddingLeft:10,
    color:"black",
    fontStyle:"italic"
  },

  txtdescriptiontitre: {
    fontSize: 16,
    padding: 10,
    color:"black",
    fontStyle:"italic",
    fontWeight : "bold"
  },

  containertopusername: {
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  nameunderpic: {
    width: "100%",
    fontSize: 16,
    paddingTop: 5,
    fontWeight: "600",
    color: "black",
    textAlign: "center",
  },

  photo: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderColor: "#474CCC",
    borderWidth: 4,
  },

  viewTextInfos: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  viewTitleInfos: {
    flexDirection: "column",
  },

  viewInfos: {
    flexDirection: "column",
    width: "80%",
  },

  textInfosLeft: {
    color: "#474CCC",
    marginBottom: 7,
    height: 30,
    paddingLeft: 20,
    fontSize: 16,
    fontStyle:"italic",
    fontWeight:"bold"
  },

  textInfosRight: {
    marginBottom: 7,
    paddingLeft: 10,
    height: 30,
    fontSize: 16,
    fontWeight:"bold"
  },

  textInfosLeftBigger: {
    color: "#474CCC",
    marginBottom: 7,
    height: 45,
    paddingLeft: 20,
    fontSize: 16,
  },

  textInfosRightBigger: {
    color: "black",
    marginBottom: 7,
    paddingLeft: 10,
    height: 45,
    fontSize: 16,
  },

  textInfosRightParticipants: {
    color: "black",
    marginBottom: 7,
    paddingLeft: 10,
    height: 50,
    fontSize: 16,
  },

  buttonTimer: {
    padding: 10,
    alignItems: "center",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.5)",
  },

  textButtontimer: {
    fontWeight: "500",
    fontSize: 16,
    color:'grey',
  },

  containerButtons: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    marginTop: 20,
    backgroundColor: "#474CCC",
    borderRadius: 50,
  },

  textButton: {
    color: "white",
    fontWeight: "600",
    height: 30,
    fontSize: 16,
  },

  containerButtonLeave: {
    alignItems: "center",
  },

  buttonLeave: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#474CCC",
    width: "60%",
    paddingTop: 8,
    borderRadius: 50,
  },

  textButtonLeave: {
    color: "#fff",
    fontWeight: "600",
    height: 30,
    fontSize: 16,
  },
  
  buttonDelete: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#474CCC",
    width: "60%",
    paddingTop: 8,
    borderRadius: 50,
  },

});

