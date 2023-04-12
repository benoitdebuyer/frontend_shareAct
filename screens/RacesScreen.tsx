import React from "react";
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { addPlace, removePlace } from '../reducers/user';

const BACKEND_ADDRESS = 'http://BACKEND_IP:3000';

export default function PlacesScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [city, setCity] = useState('');

const handleSubmit = () => {
  if (city.length === 0) {
    return;
  }

  // 1st request: get geographic data from API
  fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}`)
    .then((response) => response.json())
    .then((data) => {
      // Nothing is done if no city is found by API
      if (data.features.length === 0) {
        return;
      }

      const firstCity = data.features[0];
      const newPlace = {
        name: firstCity.properties.city,
        latitude: firstCity.geometry.coordinates[1],
        longitude: firstCity.geometry.coordinates[0],
      };

      // 2nd request : send new place to backend to register it in database
      fetch(`${BACKEND_ADDRESS}/places`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: user.nickname, name: newPlace.name, latitude: newPlace.latitude, longitude: newPlace.longitude }),
      }).then((response) => response.json())
        .then((data) => {
          // Dispatch in Redux store if the new place have been registered in database
          if (data.result) {
            dispatch(addPlace(newPlace));
            setCity('');
          }
        });
    });
};

  const handleDelete = (placeName) => {
    fetch(`${BACKEND_ADDRESS}/places`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname: user.nickname, name: placeName }),
    }).then(response => response.json())
      .then(data => {
        data.result && dispatch(removePlace(placeName));
      });
  };

  // const places = user.places.map((data, i) => {
  //   return (
  //     <View key={i} style={styles.card}>
  //       <View>
  //         <Text style={styles.name}>{data.name}</Text>
  //         <Text>LAT : {Number(data.latitude).toFixed(3)} LON : {Number(data.longitude).toFixed(3)}</Text>
  //       </View>
  //       <FontAwesome name='trash-o' onPress={() => handleDelete(data.name)} size={25} color='#ec6e5b' />
  //     </View>
  //   );
  // });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>En cours</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Terminés</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* {places} */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  button: {
    width: '40%',
    alignItems: 'center',
    paddingTop: 8,
    backgroundColor: '#474CCC',
    borderRadius: 10,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});
