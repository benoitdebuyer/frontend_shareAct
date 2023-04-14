import React from "react";
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updatenewracelat, updatenewracelon, addNewAddress } from '../reducers/race';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const BACKEND_ADDRESS = 'https://shareact-backend.vercel.app';
//const BACKEND_ADDRESS = 'http://10.6.240.95:3000';

export default function MapScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [currentPosition, setCurrentPosition] = useState(null);
  const [tempCoordinates, setTempCoordinates] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlace, setNewPlace] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (tempCoordinates) {
      const getCityFromCoordinates = async () => {
        const apiUrl = `https://api-adresse.data.gouv.fr/reverse/?lon=${tempCoordinates.longitude}&lat=${tempCoordinates.latitude}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        const address = data.features[0]?.properties?.label;

        setAddress(address);
      };

      getCityFromCoordinates();
    }
  }, [tempCoordinates]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            console.log(location)
            setCurrentPosition(location.coords);
          });
      }
    })();

    // fetch(`${BACKEND_ADDRESS}/races/${user.nickname}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     data.result && dispatch(importPlaces(data.places));
    //   });
  }, []);

  const handleMyLocationPress = () => {
    if (currentPosition) {
      mapRef.animateToRegion({
        ...currentPosition,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };


  const handleBackPage = () => {
    navigation.navigate("TabNavigator", { screen: "Map" });
  }


 const handleLongPress = (e) => {
    setTempCoordinates(e.nativeEvent.coordinate);
    setModalVisible(true);
  };


  const handleConfirm = () => {
    setModalVisible(false);
    // console.log(tempCoordinates.latitude)
    dispatch(updatenewracelat(tempCoordinates.latitude));
    dispatch(updatenewracelon(tempCoordinates.longitude));
    dispatch(addNewAddress(address));
    navigation.navigate('CreateRace', { coord: tempCoordinates });
  }


  const handleClose = () => {
    setModalVisible(false);
    setNewPlace('');
  };


  // const getCityFromCoordinates = () => {
  //   const apiUrl = `https://api-adresse.data.gouv.fr/reverse/?lon=${tempCoordinates.longitude}&lat=${tempCoordinates.latitude}`;

  //   return fetch(apiUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Récupère le nom de la ville à partir des données renvoyées par l'API
  //       const cityName = data.features[0]?.properties?.label;

  //       return cityName;
  //     })
  // };



  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.textAddress}>Latitude: {tempCoordinates ? tempCoordinates.latitude.toFixed(6) : ''}</Text> */}
            {/* <Text style={styles.textAddress}>Longitude: {tempCoordinates ? tempCoordinates.longitude.toFixed(6) : ''}</Text> */}
            <Text style={styles.textAddress}>Lieu de départ : {address}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleConfirm()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Confirmer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleClose()} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Annuler</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      <View style={styles.information}>
        <Text style={styles.textInformation}>Appuie longuement sur la carte {"\n"} pour sélectionner ton lieu de départ </Text>
      </View>


      {/* Bouton retour arrière */}
      <TouchableOpacity
        style={styles.backPage}
        onPress={handleBackPage}>
        <FontAwesome5 name="angle-left" size={50} color="#474CCC" />
      </TouchableOpacity>




      {currentPosition ? (
        <MapView onLongPress={(e) => handleLongPress(e)}
          ref={map => (mapRef = map)}
          mapType="standard"
          showsUserLocation={true}
          showsMyLocationButton={false}
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.021,
          }}
          style={styles.map}>
          {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#474CCC" />}
          {/* {markers} */}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
      <TouchableOpacity
        style={styles.myLocationButton}
        onPress={handleMyLocationPress}>
        <Image
          source={require('../assets/localisation.jpg')}
          style={styles.localisation_icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
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
  textAddress: {
    width: 150,
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '40%',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 5,
    paddingTop: 8,
    backgroundColor: '#474CCC',
    borderRadius: 50,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
    paddingHorizontal: 15,
  },
  information: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 70,
    zIndex: 1,
    bottom: '10%',
  },
  textInformation: {
    color: '#ffffff',
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
  },
  localisation_icon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    // borderWidth : 4,
  },
  myLocationButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#474CCC',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 50,
    height: 50,
    position: 'absolute',
    top: '12%',
    right: '4%',
    zIndex: 1,
  },
  backPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#474CCC',
    borderRadius: 10,
    width: 50,
    height: 50,
    position: 'absolute',
    top: '12%',
    left: '4%',
    zIndex: 1,
  },
});
