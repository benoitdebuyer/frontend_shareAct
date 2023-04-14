import React, { useEffect, useState, useRef } from 'react';
import { Modal, Image, StyleSheet, Dimensions, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { useFocusEffect } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';
//import Modal from 'react-native-modal'

const BACKEND_ADDRESS = 'https://shareact-backend.vercel.app';



export default function MapScreen() {



  const navigation = useNavigation();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [tempCoordinates, setTempCoordinates] = useState(null);
  const [modalProfileVisible, setModalProfileVisible] = useState(false);
  const [newPlace, setNewPlace] = useState('');
  const [races, setRaces] = useState([]);

 

  const user = useSelector((state: { user: UserState }) => state.user.value);

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
            setCurrentPosition(location.coords);        
          });
      }
    })();
    fetch(`${BACKEND_ADDRESS}/races/all/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
       data.result && setRaces(data.races);
      
      });
  }

  ,[]);



  const onChangeButtonPress= () => {
    navigation.navigate( "MonCompte" );
    setModalProfileVisible(!modalProfileVisible);
   }

  const handleCreateRace = () => {
    navigation.navigate('MapCreate');
  }
  const allRaces = races.map((data, i) => {
    return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.address} pinColor="#FF4800" />;
  }); 

  return (
    <View style={styles.container}>
    
      <Image
        source={require('../assets/filter.png')}
        style={styles.icon}
      /> 
      
      <Pressable
  style={styles.buttonProfileModale}
  onPress={() => setModalProfileVisible(true)}
>
  <Image source={require('../assets/user.png')} style={styles.profil} />
</Pressable>
      <TouchableOpacity  style={styles.button} onPress={() => handleCreateRace()} activeOpacity={0.8}>
              <Text style={styles.textButton} >Créer une course</Text>
      </TouchableOpacity>  

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
        {allRaces} 
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


      <Modal
        animationType="slide"
        transparent={true}
        //backdropColor="red"
        //presentationStyle="OverFullScreen"
        
        visible={modalProfileVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setModalProfileVisible(!modalProfileVisible);

        }}>

       

       
          <View style={styles.modalView}>
            
            

                      
            <Image source ={require('../assets/user.png')}
             style={styles.imgProfileModal}/>

            <View style={styles.infosProfile}>

            <Text style ={styles.textInfos}>
                  
                  {user.username}
                  </Text>

                  <Text style ={styles.textInfos}>
                
                  {user.firstname}
                  </Text>

                <Text style ={styles.textInfos}>
                  
                  {user.email}
                  </Text>

                  <Text style ={styles.textInfos}>
                 
                  {user.age}
                  </Text>

            </View>

            <TouchableOpacity style={styles.buttonProfileModif} onPress={onChangeButtonPress}>
                <Text style={styles.textStyle}>Changez votre profil</Text>
            </TouchableOpacity> 

          
          </View>
     
        
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
  buttons:{
    flex:1,
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
    zIndex:1,
    left:'25%',
    bottom: '2%',
  },
  imgProfileModal:{
      width:  Dimensions.get("window").width/3, 
      height:  Dimensions.get("window").width/3,
      borderColor: '#474CCC',
      borderWidth: 5, 
      borderRadius: 100, 
      marginBottom: 30, 
  },
  infosProfile:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',


    

  },
  textInfos:{


    width: '70%',

    textAlign:'center',
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    fontSize: 18,
    paddingBottom: 5,
    margin: 15,
    fontWeight: '600',
    fontSize: 15,
    


    

  },
  buttonProfileModif:{
    paddingTop:30,
    margin :15,
    
    backgroundColor:'#474CCC',
    borderRadius: 100,
    alignContent:'center',
    justifyContent:'center',
    height:    Dimensions.get("window").height/15,
  },
  textStyle:{
    textAlign:'center',
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 15,
    width: Dimensions.get("window").width/2,
    height: 50,

   

  },


  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 15,
  },
  buttonProfileModale:{
    zIndex:1,
    position: 'absolute',
    top:'9%',
    right:'2%',
    
    
  },
  icon: {
    position: 'absolute',
    left:'4%',
    top:'12%',
    zIndex:1,
    width : 50,
    height: 50,
    marginLeft:30,
    
  },
  profil: {
   
    width: 90,
    height: 90,
   
    borderRadius: 50,
    backgroundColor: '#ffffff',
    
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
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    width :  Dimensions.get("window").width, 
    height :Dimensions.get("window").height, 
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
