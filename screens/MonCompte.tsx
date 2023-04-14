import React from "react";
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, Image, TextInput, View, TouchableOpacity, Button, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';



const BACKEND_ADDRESS = 'https://shareact-backend.vercel.app';


export default function MonCompte() {
    const user = useSelector((state: { user: UserState }) => state.user.value);
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState(null);
    const [username, setUsername] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [age, setAge] =useState(null);
    const [image, setImg]= useState(null);

    const navigation = useNavigation();


  const handleReturn = () => {

    navigation.navigate("TabNavigator", { screen: "Map" });


  }

  const handleSendBdd = () => {
    console.log(firstname, username, email, image, user.token)

    const datas = {
      firstname: firstname,
      username: username,
      email: email,
      image: image,
      token:user.token,
    };

    fetch(`${BACKEND_ADDRESS}/users/changesprofil`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datas),
          })
            .then((response) => response.json())
            .then((data) => {
              if (!data.result) { 
                
                console.log(data.error)

                
              } else { 
                //dispatch(updateEmail(email));
                console.log("Hello BDD")
                navigation.navigate("TabNavigator", { screen: "Map" });
                

              }
            })

  
  }
  return (
    <View style={styles.container}>
        <Text style={styles.text}>
            Modifiez vos paramètres :
        </Text>
        
        <Image source ={require('../assets/user.png')}
             style={styles.imgProfile}/>

        <TouchableOpacity  style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton} >Changer la photo</Text>
        </TouchableOpacity> 

        <TextInput placeholder={user.firstname} onChangeText={(value) => setFirstname(value)} value={firstname} style={styles.input} />

        <TextInput placeholder={user.username} onChangeText={(value) => setUsername(value)} value={username} style={styles.input} />
        
        <TextInput placeholder={user.email} onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
        <TextInput placeholder='/img' onChangeText={(value) => setImg(value)} value={image} style={styles.input} />
       


        <TouchableOpacity  style={styles.button} onPress={handleSendBdd} activeOpacity={0.8}>
              <Text style={styles.textButton} >Envoyer les modifications</Text>
      </TouchableOpacity> 

      <TouchableOpacity  style={styles.buttonQuit} onPress={handleReturn} activeOpacity={0.8}>
              <Text style={styles.textButton} >Annuler</Text>
      </TouchableOpacity>  
        
     


    </View>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:30,
    color:'#474CCC',
    fontWeight:"bold",
    marginBottom:20,
  },
  button:{
    paddingTop:30,
    margin :15,
    
    backgroundColor:'#474CCC',
    borderRadius: 100,
    alignContent:'center',
    justifyContent:'center',
    height:    Dimensions.get("window").height/15,

  },
  buttonQuit:{
    paddingTop:30,
    margin :15,
    
    backgroundColor:'red',
    borderRadius: 100,
    alignContent:'center',
    justifyContent:'center',
    height:    Dimensions.get("window").height/15,

  },
imgProfile:{
    margin : 10,
    width: 140,
    height:140,
    borderWidth:2,
    borderColor: '#474CCC',
    borderWidth : 4,
    borderRadius: 100,
   
},
 
textButton:{
   
    textAlign:'center',
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 15,
   
    width: Dimensions.get("window").width/2,
    height: 50,

},
input: {
    width: '70%',
    textAlign:'center',
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    fontSize: 18,
    paddingBottom: 5,
    margin: 10,
    
  },
  
})
