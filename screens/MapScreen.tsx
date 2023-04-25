import React, { useEffect, useState } from "react";
import {
  Modal,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { addRaceByUser, delRaceByUser,} from "../reducers/race";
import { logout, updateImage } from '../reducers/user'
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import GestureRecognizer from 'react-native-swipe-gestures';



const BACKEND_ADDRESS = "https://shareact-backend.vercel.app";

const photosDataall: string[] = [
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/woman2_botq5a.jpg',
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/man2_pcigrd.png',
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/woman1_vl6o6d.png',
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/man1_yt6hju.png',
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681915374/user_ap8cxl.png",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar8_mmnwko.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar4_szelyb.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar12_iwwzmk.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar2_hposjh.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898002/avatar14_l82t8z.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898002/avatar13_ilydse.jpg",
];

const photosDataman: string[] = [
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/man2_pcigrd.png',
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/man1_yt6hju.png',
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681915374/user_ap8cxl.png",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar8_mmnwko.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar2_hposjh.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898002/avatar13_ilydse.jpg",
];

const photosDatawoman: string[] = [
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/woman2_botq5a.jpg',
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/woman1_vl6o6d.png',
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar4_szelyb.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar12_iwwzmk.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898002/avatar14_l82t8z.jpg",
];


export default function MapScreen() {
  const navigation = useNavigation();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [modalProfileVisible, setModalProfileVisible] = useState(false);
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState(null);
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false);
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


// fetch de a liste de toutes les courses dans un useeffect, lancement au chargement de la page,
// a la mie a jour de l'argument situé dasn le tableau de l'useeffect ( pas dans ce cas) ou a la destruction du composant
// quand il y a un return ( pas dans ce cas)
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
        });
      }
    })();
    fetch(`${BACKEND_ADDRESS}/races/all/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        data.result && setRaces(data.races);
        console.log('route all races au mount, nb de races : ', data.races.length)
      })


  }, []);


  useEffect(() => {
    if (currentPosition) {
      console.log('filtre au update : ', filter)
      // slider used and distance used
      if ((filter.valeur[0] !== 5 || filter.valeur[1] !== 60) && filter.distance !== 10000) {
        let dist = filter.distance * 1000
        let maDate = new Date();
        let maDate2 = new Date()
        let start_date = maDate.setHours(maDate.getHours() + filter.valeur[0]);
        let end_date = maDate2.setHours(maDate2.getHours() + filter.valeur[1]);
        const data = {
          start_date: start_date,
          end_date: end_date,
          lat: currentPosition.latitude,
          lon: currentPosition.longitude,
          distance: dist,
        };
        fetch(`${BACKEND_ADDRESS}/races/filter`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            console.log('fetch n°1, nb de races : ', data.data.length)
            setRaces([...data.data]);
          })
          .catch(error => {
            console.error(error);
          });
      }

      //slider not used and distance used
      if ((filter.valeur[0] === 5 && filter.valeur[1] === 60) && filter.distance !== 10000) {
        let dist = filter.distance * 1000
        let start_date = new Date();
        let maDate2 = new Date()
        let end_date = maDate2.setHours(maDate2.getHours() + 30000);
        const data = {
          start_date: start_date,
          end_date: end_date,
          lat: currentPosition.latitude,
          lon: currentPosition.longitude,
          distance: dist,
        };
        fetch(`${BACKEND_ADDRESS}/races/filter`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            console.log('fetch n°2, nb de races : ', data.data.length)
            setRaces([...data.data]);
          })
          .catch(error => {
            console.error(error);
          });
      }
      // slider used et distance not used
      if ((filter.valeur[0] !== 5 || filter.valeur[1] !== 60) && filter.distance === 10000) {
        let dist = filter.distance * 1000
        let maDate = new Date();
        let maDate2 = new Date()
        let start_date = maDate.setHours(maDate.getHours() + filter.valeur[0]);
        let end_date = maDate2.setHours(maDate2.getHours() + filter.valeur[1]);
        const data = {
          start_date: start_date,
          end_date: end_date,
          lat: currentPosition.latitude,
          lon: currentPosition.longitude,
          distance: dist,
        };
        fetch(`${BACKEND_ADDRESS}/races/filter`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            console.log('fetch n°3, nb de races : ', data.data.length)
            setRaces([...data.data]);
          })
          .catch(error => {
            console.error(error);
          });
      }

      // slider not used et distance not used
      if ((filter.valeur[0] === 5 || filter.valeur[1] === 60) && filter.distance === 10000) {
        fetch(`${BACKEND_ADDRESS}/races/all/${user.token}`)
          .then((response) => response.json())
          .then((data) => {
            data.result && setRaces([...data.races]);
            console.log('all races au update, nb de races : ', data.races.length)
          })
      }
    }
  }, [isFocused]);




// changement de parge et ferme la modal de profil
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

  //// map sur le tableau race qui viendra de la BDD pour afficher les marqueurs sur la MAP
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

  if (!hasPermission || !isFocused) {
    return <View />;
  }
  let testimage = user.image

  ///generation aleatoir des photos de profils
  const randomizePhoto = () => {

    let genderdataphoto = []

    switch (user.gender) {

      case 'Femme': genderdataphoto = photosDatawoman
        break;

      case 'Homme': genderdataphoto = photosDataman
        break;

      case 'Autre': genderdataphoto = photosDataall
        break;

      default:
        console.log('error gender')
    }
    // switch case pour selectionné dans quelle tableau le map random doit choisir la photo en rapport au genre de l utilisateur
    
    const newPhotoIndex = Math.floor(Math.random() * genderdataphoto.length); 
    setCurrentPhotoIndex(newPhotoIndex);
    const selectedPhoto = genderdataphoto[newPhotoIndex];
//genere un index aleatoire pour prendre dans le tableau d url des avatars une nouvelle image

//////// mise en forme de data avant d'envoyé la nouvelle url aleatoir en BDD
    const datas = {
      image: selectedPhoto,
      token: user.token,
    };
    //console.log(selectedPhoto)
    // console.log(user.token)
    fetch(`${BACKEND_ADDRESS}/users/changesimageprofil`, { // envois de l'url en BDD
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datas),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          // console.log(data.error)

        } else {
          dispatch(updateImage(selectedPhoto));
          navigation.navigate("TabNavigator", { screen: "Map" });
        }
      })
  };

  /// aller prendre la photo 
  const takePhoto = () => {
    navigation.navigate("SnapScreen");
  };
  return (

    <View style={styles.container}>
      <Pressable
        style={styles.filter}
        onPress={changePage}
      >
        <Image source={require("../assets/filter.png")} style={styles.icon} />
      </Pressable>

      <Pressable
        style={styles.buttonProfileModale}
        onPress={() => setModalProfileVisible(true)}
      >
        <Image source={{ uri: testimage }} style={styles.profil} />
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
                <Text style={styles.modalbtnReturn}>Fermer</Text>
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

            <View style={styles.containertop}>

              <TouchableOpacity style={styles.buttonrefreshetphoto} onPress={() => randomizePhoto()}>
                <FontAwesome5 name="undo" size={35} color="#474CCC" />
              </TouchableOpacity>

              <Image
                source={{ uri: testimage }}
                style={styles.imgProfileModal}
              />

              <TouchableOpacity onPress={() => takePhoto()} style={styles.buttonrefreshetphoto} activeOpacity={0.8}>
                <FontAwesome5 name="camera" size={35} color="#474CCC" />
              </TouchableOpacity>
            </View>




            <View style={styles.infosProfile}>
              <Text style={styles.textInfos}>{user.firstname}</Text>

              <Text style={styles.textInfos}>@{user.username}</Text>


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
    marginHorizontal: 45,
    // shadowOpacity: 0.9,
    // shadowRadius: 4,

  },
  buttonrefreshetphoto: {
    alignItems: 'flex-start',

  },

  containertop: {
    // flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
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
    // shadowRadius: 5,
    // elevation: 10,
  },
});
