import React from "react";
import { useEffect, useState } from 'react';
import { Modal, Image,  StyleSheet, Dimensions,  Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPlace, importPlaces } from '../reducers/user';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


const BACKEND_ADDRESS = 'http://10.6.240.95:3000';

export default function MapScreen(navigation) {

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

    

    // fetch(`${BACKEND_ADDRESS}/places/${user.nickname}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     data.result && dispatch(importPlaces(data.places));
    //   });
  }, []);

  const handleSubmit = () => {
    navigation.navigate('CreateRace');
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
              <Image source ={require('../assets/cerf.jpg')}
                    style={styles.profil}
            />
            
          {/* </View>   */}
          <TouchableOpacity  style={styles.button} activeOpacity={0.8}>
                  <Text style={styles.textButton} onPress={() => handleSubmit()}>Créer une course</Text>
          </TouchableOpacity>  

        {/* </View>     */}
      
      {currentPosition ? (  
      <MapView 
       mapType="standard"
        showsUserLocation={true}
        showsMyLocationButton={true}
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
    bottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 20,
    paddingTop: 8,
    backgroundColor: '#474CCC',
    borderRadius: 30,
    height:50,
    width: Dimensions.get("window").width/2,
    //marginBottom:90,
    zIndex:1,
    left:'25%',
    bottom: '2%',
    

    
  },
  icon: {
    position: 'absolute',
    left:'4%',
    top:'12%',
    
    width : 60,
    height: 60,
    
    
    
    marginLeft:30,
    zIndex:1,
  },
  profil: {
    position: 'absolute',
    width: 100,
    height: 100,
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
 
 
  textButton: {
    color: '#ffffff',
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },
});
