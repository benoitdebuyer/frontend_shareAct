import React, { useEffect, useState, useRef } from "react";
import {
  TouchableWithoutFeedback,
  Modal,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { addRaceByUser, delRaceByUser, udptadeIdRace, } from "../reducers/race";
import { logout } from '../reducers/user'
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { PanGestureHandler } from 'react-native-gesture-handler';
import GestureRecognizer from 'react-native-swipe-gestures';
import { addFilter, addFilter2 } from "../reducers/filter";


const BACKEND_ADDRESS = "https://shareact-backend.vercel.app";

export default function MapScreen() {
  const navigation = useNavigation();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [tempCoordinates, setTempCoordinates] = useState(null);
  const [modalProfileVisible, setModalProfileVisible] = useState(false);
  const [newPlace, setNewPlace] = useState("");
  const [races, setRaces] = useState([]);
  const [races2, setRaces2] = useState([]);
  const [selectedRace, setSelectedRace] = useState(null);
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false);
  const [idRace, setIdRace] = useState(null);
  const [modalFilterVisible, setModalFilterVisible] = useState(false);


  const dispatch = useDispatch();
  const race = useSelector((state) => state.race.value);
  const user = useSelector((state: { user: UserState }) => state.user.value);
  const filter = useSelector((state) => state.filter.value);

  const handleMyLocationPress = () => {
    if (currentPosition) {
      mapRef.animateToRegion({
        ...currentPosition,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  useEffect(() => {

    dispatch(addFilter([5, 60])),
      dispatch(addFilter2(10000)),
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setHasPermission(status === 'granted');
        if (status === "granted") {
          Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
            setCurrentPosition(location.coords);
          });
        }
      })();
    console.log('mon filter: ', filter)

    fetch(`${BACKEND_ADDRESS}/races/all/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        data.result && setRaces(data.races);
        console.log('route all races', data.races)
      })


  }, []);


  useEffect(() => {
    if (currentPosition) {

      if ((filter.valeur[0] !== 5 || filter.valeur[1] !== 60) && filter.distance !== 10000) {



        console.log('ma coord: ', currentPosition)
        console.log(filter, filter.valeur[0])
        let dist = filter.distance * 1000
        //let dist = 10000;
        let maDate = new Date();
        // Ajouter 2 heures à l'heure actuelle
        let start_date = maDate.setHours(maDate.getHours() + filter.valeur[0]);
        let end_date = maDate.setHours(maDate.getHours() + filter.valeur[1]);

        const date = new Date(start_date);
        const date2 = new Date(end_date);


        console.log('mes dates', date, date2)

        const data = {
          start_date: date,
          end_date: date2,
          lat: currentPosition.latitude,
          lon: currentPosition.longitude,
          distance: dist,
        };


        fetch(`${BACKEND_ADDRESS}/races/filter`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            console.log('route filter', data.data)
            setRaces([...data.data]);
          })
          .catch(error => {
            console.error(error);
          });
      }

      if ((filter.valeur[0] === 5 && filter.valeur[1] === 60) && filter.distance !== 10000) {



        console.log('ma coord: ', currentPosition)
        console.log(filter, filter.valeur[0])
        let dist = filter.distance * 1000
        //let dist = 10000;
        let maDate = new Date();
        // Ajouter 2 heures à l'heure actuelle
        //let start_date = maDate.setHours(maDate.getHours());
        let end_date = maDate.setHours(maDate.getHours() + 30000);

        const date = new Date(maDate);
        const date2 = new Date(end_date);


        console.log('mes dates', date, date2)

        const data = {
          start_date: date,
          end_date: date2,
          lat: currentPosition.latitude,
          lon: currentPosition.longitude,
          distance: dist,
        };


        fetch(`${BACKEND_ADDRESS}/races/filter`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            console.log('route filter', data.data)
            setRaces([...data.data]);
          })
          .catch(error => {
            console.error(error);
          });
      }

      if ((filter.valeur[0] !== 5 || filter.valeur[1] !== 60) && filter.distance === 10000) {



        console.log('ma coord: ', currentPosition)
        console.log(filter, filter.valeur[0])
        let dist = filter.distance * 1000
        //let dist = 10000;
        let maDate = new Date();
        // Ajouter 2 heures à l'heure actuelle
        let start_date = maDate.setHours(maDate.getHours() + filter.valeur[0]);
        let end_date = maDate.setHours(maDate.getHours() + filter.valeur[1]);

        const date = new Date(start_date);
        const date2 = new Date(end_date);


        console.log('mes dates', date, date2)

        const data = {
          start_date: date,
          end_date: date2,
          lat: currentPosition.latitude,
          lon: currentPosition.longitude,
          distance: dist,
        };


        fetch(`${BACKEND_ADDRESS}/races/filter`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            console.log('route filter', data.data)
            setRaces([...data.data]);
          })
          .catch(error => {
            console.error(error);
          });
      }

      else {

        fetch(`${BACKEND_ADDRESS}/races/all/${user.token}`)
          .then((response) => response.json())
          .then((data) => {
            data.result && setRaces([...data.races]);
            console.log('route all races', data.result)
          })
      }

    }




  }, [isFocused]);





  const onChangeButtonPress = () => {
    navigation.navigate("MonCompte");
    setModalProfileVisible(!modalProfileVisible);
  };

  const buttonLogout = () => {
    dispatch(logout());
    navigation.navigate("Home");
  };



  const handleCreateRace = () => {
    navigation.navigate("MapCreate");
  };

  // desous  function pour la modal des marquer de race
  const handleCloseModalmarker = () => {
    setSelectedRace(null);
    dispatch(delRaceByUser());
  };

  const handleMarkerPress = (race) => {
    setSelectedRace(race);
    dispatch(addRaceByUser(race));
    // console.log(race);
    // console.log(race._id)
  };


  const handleCloseModalgotorace = (race) => {
    /* 
    navigation.navigate('Details', { courseId: data.id });
Vous pouvez ensuite accéder à l'ID dans la nouvelle page en utilisant route.params.courseId. */
    navigation.navigate("JoinRaceScreen");
    setSelectedRace(null);
  };


  ////////////////
  /// transforme la date iso en lisible
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    // const month = date.toLocaleString("default", { month: "long", locale: 'fr-FR' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    const formattedDate = `${day} ${months[monthIndex]} ${year} à ${hours}:${minutes}`;
    return `Le ${formattedDate}`;
  };



  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ajout de cette ligne

    return `à ${hours}:${minutes}`;
  };

  const changePage = () => {
    navigation.navigate("Filter");
  };
  const onSwipeDown = () => {
    setModalProfileVisible(!modalProfileVisible);
  };

  const onSwipeDownFilter = () => {
    setModalFilterVisible(!modalFilterVisible);
  };

  //// map sur le tableau race qui viendra de la BDD

  const allRaces = races.map((race, i) => {
    return (
      <Marker
        key={race._id}
        coordinate={{ latitude: race.latitude, longitude: race.longitude }}
        title={race.address}
        onPress={() => handleMarkerPress(race)}
        pinColor="#FF4800"
      />
    );
  });


  const onSwipe = ({ event }) => {
    if (event.nativeEvent != null && event.nativeEvent.translationX != null) {
      // Accessing the doubleValue() method on a non-null object reference
      const translationX = event.nativeEvent.translationX.doubleValue();
      // ...
    }
  }

  //   const onSwipe = ({nativeEvent}) => {
  //     console.log('nativeEvent', nativeEvent);
  //   console.log('translationY', nativeEvent?.translationY);
  //   console.log('modalProfileVisible', modalProfileVisible);
  //   if (nativeEvent && nativeEvent.translationY != null && nativeEvent.translationY < 100) {
  //     // fermeture de la modale si elle est visible
  //     if (modalProfileVisible != null) {
  //       setModalProfileVisible(!modalProfileVisible);
  //     }
  //   }
  // }
  // console.log(user.image)
  let testimage = user.image 
  return (

    <View style={styles.container}>
      <Pressable
        style={styles.filter}
        //onPress={() => setModalFilterVisible(true)}
        onPress={changePage}
      >
        <Image source={require("../assets/filter.png")} style={styles.icon} />
      </Pressable>

      <Pressable
        style={styles.buttonProfileModale}
        onPress={() => setModalProfileVisible(true)}
      >
        <Image source={{ uri : testimage}} style={styles.profil} />
      </Pressable>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCreateRace()}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Créer une course</Text>
      </TouchableOpacity>

      {currentPosition ? (
        <MapView
          ref={(map) => (mapRef = map)}
          mapType="standard"
          showsUserLocation={true}
          showsMyLocationButton={false}
          rotateEnabled={true}
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.021,
          }}
          style={styles.map}
        >
          {currentPosition && (
            <Marker
              coordinate={currentPosition}
              title="Ma position"
              pinColor="#474CCC"
            />
          )}
          {allRaces}
        </MapView>
      ) : (
        <View style={styles.load}>
          <Text style={styles.loadText}>Loading...</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.myLocationButton}
        onPress={handleMyLocationPress}
      >
        {/* <Text style={styles.myLocationButtonText}>My Location</Text> */}
        <Image
          source={require("../assets/localisation.jpg")}
          style={styles.localisation_icon}
        />
      </TouchableOpacity>

      <GestureRecognizer onSwipeDown={onSwipeDownFilter}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalFilterVisible}
          onRequestClose={() => {
            setModalFilterVisible(!modalFilterVisible);
          }}
        >
          <View style={styles.modalFilterView}>
            <Image
              source={require("../assets/user.png")}
              style={styles.imgProfileModal}
            />
          </View>
        </Modal>
      </GestureRecognizer>


      <Modal
        visible={selectedRace !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModalmarker}

      >

        <View onPress={handleCloseModalmarker}
          style={styles.centeredViewmarker}
        >
          <View
            style={styles.modalViewmarker}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", margin: 8, }}
            >
              {formatDate(selectedRace?.date)}
            </Text>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ marginBottom: 8 }}>
                Distance : {selectedRace?.distance} km
              </Text>
              <Text style={{ marginBottom: 16 }}>
                Temps : {selectedRace?.duration} min
              </Text>
            </View>

            <View style={styles.viewmodalbtn}>

              <TouchableOpacity onPress={() => handleCloseModalgotorace(race)}>
                <Text style={styles.modalbtngotorace}>Voir la course</Text>
              </TouchableOpacity>

              <Text style={styles.test}>        </Text>

              <TouchableOpacity onPress={() => handleCloseModalmarker()}>
                <Text style={styles.modalbtnReturn}>Close</Text>
              </TouchableOpacity>

            </View>


          </View>
        </View>



      </Modal>

      <GestureRecognizer onSwipeDown={onSwipeDown}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalProfileVisible}
          onRequestClose={() => {
            setModalProfileVisible(!modalProfileVisible);
          }}
        >
          <View style={styles.modalView}>
            <Image
              source={{ uri : testimage}}
              style={styles.imgProfileModal}
            />

            <View style={styles.infosProfile}>
              <Text style={styles.textInfos}>{user.username}</Text>

              <Text style={styles.textInfos}>{user.firstname}</Text>

              <Text style={styles.textInfos}>{user.email}</Text>

              <Text style={styles.textInfos}>{user.age} ans  </Text>
            </View>

            <TouchableOpacity
              style={styles.buttonProfileModif}
              onPress={onChangeButtonPress}
            >
              <Text style={styles.textStyle}>Changez votre profil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonLogout}
              onPress={buttonLogout}
            >
              <Text style={styles.textStyle}>Déconnexion</Text>
            </TouchableOpacity>


          </View>
        </Modal>
      </GestureRecognizer>
    </View>
  );
}

const styles = StyleSheet.create({

  test: {
    color: 'white',

  },
  filter: {
    position: "absolute",
    left: "4%",
    top: "12%",
    zIndex: 1,
    width: 50,
    height: 50,
    marginLeft: 30,

  },
  container: {
    flex: 1,
  },
  buttons: {
    flex: 1,
    zIndex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  images: {
    flex: 1,
    width: Dimensions.get("window").width,
    paddingTop: 70,
  },
  buttonClose: {
    paddingTop: 30,
    margin: 15,

    backgroundColor: "red",
    borderRadius: 100,
    alignContent: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height / 15,
  },
  button: {
    position: "absolute",
    width: Dimensions.get("window").width / 2,
    alignItems: "center",
    paddingTop: 10,
    justifyContent: "center",
    backgroundColor: "#474CCC",
    borderRadius: 50,
    zIndex: 1,
    left: "25%",
    bottom: "2%",
  },
  imgProfileModal: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 3,
    borderColor: "#474CCC",
    borderWidth: 5,
    borderRadius: 100,
    marginBottom: 30,

    shadowOpacity: 0.9,
    shadowRadius: 4,

  },
  infosProfile: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  textInfos: {
    width: "70%",

    textAlign: "center",
    borderBottomColor: "#474CCC",
    borderBottomWidth: 1,
    paddingBottom: 5,
    margin: 15,
    fontWeight: "600",
    fontSize: 15,
  },
  buttonProfileModif: {
    margin: 15,
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#474CCC',
    borderRadius: 20,
    alignContent: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },
  textStyle: {
    textAlign: 'center',
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 15,
  },
  textButton: {
    color: "#ffffff",
    height: 30,
    fontWeight: "600",
    fontSize: 15,
  },
  // Bouton "Déconnexion"
  buttonLogout: {
    margin: 15,
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "red",
    // backgroundColor: "#FF4800",
    borderRadius: 20,
    alignContent: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },
  buttonProfileModale: {
    zIndex: 1,
    position: "absolute",
    top: "9%",
    right: "2%",
  },
  icon: {
    width: 50,
    height: 50,
  },
  profil: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: "#474CCC",
    marginRight: 30,
  },

  load: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // la modal profil quand tu cliques sur l'image 
  modalView: {
    marginTop: 100,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalFilterView: {
    marginTop: 40,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 150,
    borderBottomColor: "#474CCC",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  localisation_icon: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  myLocationButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#474CCC",
    backgroundColor: "white",
    borderRadius: 10,
    width: 50,
    height: 50,
    position: "absolute",
    bottom: "12%",
    right: "4%",
    zIndex: 1,
  },
  centeredViewmarker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalViewmarker: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  viewmodalbtn: {
    flexDirection: "row",


  },
  modalbtngotorace: {
    padding: 10,
    color: 'white',
    borderRadius: 10,
    backgroundColor: '#474CCC',
    fontSize: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalbtnReturn: {
    padding: 10,
    color: '#474CCC',
    borderRadius: 10,
    borderWidth: 1,
    // backgroundColor: '#fff',
    borderColor: "#474CCC",
    alignItems: 'center',
    // shadowOpacity: 0.4,
    shadowRadius: 5,
    // elevation: 10,
  },
});
