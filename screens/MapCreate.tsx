import React from "react";
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPlace, importPlaces } from '../reducers/user';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BACKEND_ADDRESS = 'http://10.6.240.95:3000';

export default function MapScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [currentPosition, setCurrentPosition] = useState(null);
  const [tempCoordinates, setTempCoordinates] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlace, setNewPlace] = useState('');

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

    fetch(`${BACKEND_ADDRESS}/places/${user.nickname}`)
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(importPlaces(data.places));
      });
  }, []);

  const handleLongPress = (e) => {
    setTempCoordinates(e.nativeEvent.coordinate);
    setModalVisible(true);
  };

  const handleNewPlace = () => {
    // Send new place to backend to register it in database
    fetch(`${BACKEND_ADDRESS}/places`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname: user.nickname, name: newPlace, latitude: tempCoordinates.latitude, longitude: tempCoordinates.longitude }),
    }).then((response) => response.json())
      .then((data) => {
        // Dispatch in Redux store if the new place have been registered in database
        if (data.result) {
          dispatch(addPlace({ name: newPlace, latitude: tempCoordinates.latitude, longitude: tempCoordinates.longitude }));
          setModalVisible(false);
          setNewPlace('');
        }
      });
  };

  const handleClose = () => {
    setModalVisible(false);
    setNewPlace('');
  };

  const markers = user.places.map((data, i) => {
    return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.name} />;
  });

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput placeholder="New place" onChangeText={(value) => {console.log(value);setNewPlace(value)}} value={newPlace} style={styles.input} />
            <TouchableOpacity onPress={() => handleNewPlace()} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton}>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClose()} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {currentPosition ? (
      <MapView onLongPress={(e) => handleLongPress(e)}
       mapType="standard"
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.021,
          }}
        style={styles.map}>
        {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#474CCC" />}
        {markers}
      </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
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
  input: {
    width: 150,
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    width: 150,
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 8,
    backgroundColor: '#474CCC',
    borderRadius: 10,
  },
  textButton: {
    color: '#ffffff',
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },
});
