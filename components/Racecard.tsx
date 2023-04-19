import React from "react";
import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFirstname,
  updateToken,
  updateUsername,
  updateEmail,
  updateImage,
  updateAge,
  updateGender,
  updateDatebirth,
} from "../reducers/user";
import Timer from "./Timer";

const BACKEND_ADDRESS = 'https://shareact-backend.vercel.app';


export default function Racecardtest(props) {
  // const participants = props.participants.map((participant, index) => {
  //   return index === props.participants.length - 1 ? participant : participant + ", ";
  // })
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
        // data.result;
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
          <Text style={styles.nameunderpic}>@{props.author}</Text>
        </View>

        <View style={styles.containertopright}>
          <Text style={styles.txtdescription}>{props.description}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.buttonTimer}
        activeOpacity={0.8}
      >
        <Text style={styles.textButtontimer}>Commence dans </Text>
        <Timer date={props.dateTimer} />
      </TouchableOpacity>
     

      <View style={styles.viewTextInfos}>
        <View style={styles.viewTitleInfos}>
          <Text style={styles.textInfosLeft}>Date :</Text>
          <Text style={styles.textInfosLeftBigger}>Lieu :</Text>
          <Text style={styles.textInfosLeft}>Durée :</Text>
          <Text style={styles.textInfosLeft}>Distance :</Text>
          <Text style={styles.textInfosLeft}>Niveau :</Text>
          <Text style={styles.textInfosLeftBigger}>Participants :</Text>
        </View>

        <View style={styles.viewInfos}>
          <Text style={styles.textInfosRight}>{props.date}</Text>
          <Text style={styles.textInfosRightBigger}>{props.address}</Text>
          <Text style={styles.textInfosRight}>{props.duration} minutes</Text>
          <Text style={styles.textInfosRight}>{props.distance} km</Text>
          <Text style={styles.textInfosRight}>{props.level}</Text>
          <Text style={styles.textInfosRightParticipants}>{props.participants}</Text>
        </View>
      </View>

      <View style={styles.containerButtonLeave}>
        {/* <TouchableOpacity
          onPress={() => handleLeaveGroupe(props._idRace)}
          style={styles.buttonLeave}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Quitter le groupe</Text>
        </TouchableOpacity> */}
        {isAuthor ?
          <TouchableOpacity
            onPress={() => handleDeleteRace(props._idRace)}
            style={styles.buttonDelete}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton}>Supprimer la course</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() => handleLeaveGroupe(props._idRace)}
            style={styles.buttonLeave}
            activeOpacity={0.8}
          >
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
    borderColor: "#474CCC",
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: "#F0F7FF",
  },

  // Photo et description
  containertop: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    alignItems: "flex-start",
    marginBottom: 10,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  containertopleft: {
    // borderColor: 'green',
    // borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  containertopright: {
    // margin: 10,
    // borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#e2e2f3",
    borderColor: "#474CCC",
    width: 200,
    height: 130,
    marginLeft: 50,
  },
  txtdescription: {
    fontSize: 16,
    padding: 10,
  },

  containertopusername: {
    // borderColor: 'green',
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  nameunderpic: {
    width: "100%",
    fontSize: 16,
    paddingTop: 5,
    fontWeight: "600",
    color: "#474CCC",
    textAlign: "center",
  },

  photo: {
    // margin: 5,
    width: 120,
    height: 120,
    borderRadius: 100,
    borderColor: "#474CCC",
    borderWidth: 4,
  },

  // Informations
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
  },

  textInfosRight: {
    marginBottom: 7,
    paddingLeft: 10,
    height: 30,
    fontSize: 16,
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

  // Bouton timer

  buttonTimer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#474CCC",
    // backgroundColor: '#FF4800',
    alignItems: "center",
  },
  textButtontimer: {
    fontWeight: "500",
    fontSize: 16,
  },

  containerButtons: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  // Bouton chat de groupe
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
    color: "#ffffff",
    fontWeight: "600",
    height: 30,
    fontSize: 16,
  },

  // Bouton pour quitter le groupe de la course
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
    backgroundColor: "#FF4800",
    width: "60%",
    paddingTop: 8,
    borderRadius: 50,
  },

});

{
  /* <View style={styles.containertxtinfo} >
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
</View> */
}
