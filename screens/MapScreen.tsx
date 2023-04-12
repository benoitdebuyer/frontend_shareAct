import React from "react";
import { useEffect, useState } from 'react';
import { Modal, Image,  StyleSheet, Dimensions,  Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPlace, importPlaces } from '../reducers/user';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';



const BACKEND_ADDRESS = 'http://10.6.240.95:3000';

export default function MapScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [currentPosition, setCurrentPosition] = useState(null);
  const [tempCoordinates, setTempCoordinates] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlace, setNewPlace] = useState('');

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
    // fetch(`${BACKEND_ADDRESS}/places/${user.nickname}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     data.result && dispatch(importPlaces(data.places));
    //   });
  }, []);

  const handleCreateRace = () => {
    navigation.navigate('MapCreate');
  }





  // const markers = user.places.map((data, i) => {
  //   return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.name} />;
  // });

  return (
    <View style={styles.container}>
      {/* <View style={styles.buttons}> */}
     
        {/* //<View style={styles.images}> */}
            <Image
              source={require('../assets/filter.png')}
              style={styles.icon}
            /> 
              <Image source ={require('../assets/user.png')}
                    style={styles.profil}
            />
            
          {/* </View>   */}
          <TouchableOpacity  style={styles.button} onPress={() => handleCreateRace()} activeOpacity={0.8}>
                  <Text style={styles.textButton} >Créer une course</Text>
          </TouchableOpacity>  

        {/* </View>     */}
      
      {currentPosition ? (  
      <MapView 
       ref={map => (mapRef = map)}
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
        style={styles.map}>
          
         
        {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#474CCC" />}
        {/* {markers} */}
      </MapView>
       ) : (
            <View style={styles.load}>
               <Text style={styles.loadText}>Loading...</Text>
             </View>
      )} 
      <TouchableOpacity
          style={styles.myLocationButton}
          onPress={handleMyLocationPress}>
          {/* <Text style={styles.myLocationButtonText}>My Location</Text> */}
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
  buttons:{
    flex:1,
    //position:'absolute',
    zIndex: 1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:"space-between",
   
    
  },
  images: {
    flex:1,
    width: Dimensions.get("window").width,
    paddingTop: 70,

  },
  
  button: {
    position:'absolute',
    width: Dimensions.get("window").width/2,
    alignItems: 'center',
    paddingTop: 10,
    justifyContent: 'center',
    backgroundColor: '#474CCC',
    borderRadius: 50,
    // width: '70%',
    //marginBottom:90,
    zIndex:1,
    left:'25%',
    bottom: '2%',
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 15,
  },
  icon: {
    position: 'absolute',
    left:'4%',
    top:'12%',
    width : 50,
    height: 50,
    marginLeft:30,
    zIndex:1,
  },
  profil: {
    position: 'absolute',
    width: 90,
    height: 90,
    top:'9%',
    right:'2%',
    borderRadius: 50,
    backgroundColor: '#f00', // Changez la couleur de fond selon vos besoins
    zIndex: 1,
    borderWidth:2,
    borderColor: '#474CCC',
    borderWidth : 4,
    borderRadius: 50,
    marginRight:30,

  },

  load:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadText: {
    fontSize: 24,
    fontWeight: 'bold',
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
  localisation_icon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    // borderWidth : 4,
  },
  myLocationButton: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderColor: '#474CCC',
    backgroundColor:'white',
    borderRadius:10,
    width: 50,
    height: 50,
    position: 'absolute',
    bottom:'12%',
    right:'4%',
    zIndex: 1,
  }

});
