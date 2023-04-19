import React from "react";
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, Image, TextInput, View, TouchableOpacity, Button,KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { updateUsername, updateFirstname, updateEmail,updateImage } from '../reducers/user'
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const BACKEND_ADDRESS = 'https://shareact-backend.vercel.app';

export default function MonCompte({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: UserState }) => state.user.value);
  let [email, setEmail] = useState(null);
  let [firstname, setFirstname] = useState(null);
  let [username, setUsername] = useState(null);
  // const [dateOfBirth, setDateOfBirth] = useState(new Date());
  // const [age, setAge] = useState(null);
  // const [image, setImage] = useState(null);
  const [showTextInputFirstname, setShowTextInputFirstname] = useState(false);
  const [showTextInputUsername, setShowTextInputUsername] = useState(false);
  const [showTextInputEmail, setShowTextInputEmail] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  // const [showTextInputImage, setShowTextInputImage] = useState(false);

  //const navigation = useNavigation();


  const handleButtonPressFirstname = () => {
    onPress = { handleButtonPressFirstname }
    setShowTextInputFirstname(true);
  };

  const handleButtonPressUsername = () => {
    setShowTextInputUsername(true);
  };

  const handleButtonPressEmail = () => {
    setShowTextInputEmail(true);
  };

  // const handleButtonPressImage = () => {
  //   setShowTextInputImage(true);
  // };

  // Bouton "Envoyer les modifications"
  const handleSendBdd = () => {

    // console.log(firstname, username, email, image, user.token)
    if (firstname === null) {
      firstname = user.firstname
      //setFirstname(user.firstname)

    }
    if (username === null) {
      username = user.username
    }
    if (email === null) {
      email = user.email
    }
    // console.log(firstname, username, email, image, user.token)

    const datas = {
      firstname: firstname,
      username: username,
      email: email,
      // image: image,
      token: user.token,
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
          dispatch(updateFirstname(firstname));
          dispatch(updateUsername(username));
          dispatch(updateEmail(email));
          // console.log("Hello BDD")
          navigation.navigate("TabNavigator", { screen: "Map" });
        }
      })

  }
  // Bouton "Annuler"
  const handleReturn = () => {

    navigation.navigate("TabNavigator", { screen: "Map" });
  }

  // aller prendre une photo ou generation aleatoir d image/////////////
  let testimage = user.image 

  
 ///generation aleatoir
   

  return (
<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <View style={styles.container}>


<View style={styles.containertop}>

      {/* <TouchableOpacity onPress={()=>randomizePhoto()}>
        <FontAwesome5 name="undo" size={30} color="#000000" />
      </TouchableOpacity> */}

      <Image source={{ uri : testimage}}
        style={styles.imgProfile} />

     {/* <TouchableOpacity onPress={()=>takePhoto()} style={styles.buttonChangePhoto} activeOpacity={0.8}>
        <FontAwesome5 name="camera" size={30} color="#000000" />
      </TouchableOpacity>  */}

</View>



      <View style={styles.boolean}>
        {showTextInputFirstname ? (
          <TextInput
            placeholder='Prénom'
            onChangeText={(value) => setFirstname(value)}
            value={firstname}
            style={styles.input}
          />
        ) : (
          <View style={styles.changeField}>
            <Text style={styles.textInfos}>{user.firstname}</Text>
            <TouchableOpacity style={styles.buttonChangeOne} onPress={handleButtonPressFirstname} activeOpacity={0.8}>
              {/* <Text style={styles.textButtonChangeOne}>x</Text> */}
              <Text><FontAwesome5 name="edit" size={20} color="#474CCC" /></Text>
            </TouchableOpacity>
          </View>
        )}

      </View>

      <View style={styles.boolean}>
        {showTextInputUsername ? (
          <TextInput
            placeholder='Pseudo'
            onChangeText={(value) => setUsername(value)}
            value={username}
            style={styles.input}
          />
        ) : (
          <View style={styles.changeField}>
            <Text style={styles.textInfos}>{user.username}</Text>
            <TouchableOpacity style={styles.buttonChangeOne} onPress={handleButtonPressUsername} activeOpacity={0.8}>
              {/* <Text style={styles.textButtonChangeOne}>x</Text> */}
              <Text><FontAwesome5 name="edit" size={20} color="#474CCC" /></Text>
            </TouchableOpacity>
          </View>
        )}

      </View>

      <View style={styles.boolean}>
        {showTextInputEmail ? (
          <View style={styles.changeField}>
            <TextInput
              placeholder='email'
              onChangeText={(value) => setEmail(value)}
              value={email}
              style={styles.input}
            />
          </View>
        ) : (
          <View style={styles.changeField}>
            <Text style={styles.textInfos}>{user.email}</Text>
            <TouchableOpacity style={styles.buttonChangeOne} onPress={handleButtonPressEmail} activeOpacity={0.8}>
              {/* <Text style={styles.textButtonChangeOne}>x</Text> */}
              <Text><FontAwesome5 name="edit" size={20} color="#474CCC" /></Text>
            </TouchableOpacity>
          </View>
        )}
      </View>


      <TouchableOpacity style={styles.button} onPress={handleSendBdd} activeOpacity={0.8}>
        <Text style={styles.textButton} >Envoyer les modifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonQuit} onPress={handleReturn} activeOpacity={0.8}>
        <Text style={styles.textButton} >Annuler</Text>
      </TouchableOpacity>

    </View>
    </KeyboardAvoidingView>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  containertop: {
    // flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgProfile: {
    margin: 10,
    width: 140,
    height: 140,
    borderColor: '#474CCC',
    borderWidth: 4,
    borderRadius: 100,
  },
  textButtonChangePhoto: {
    textAlign: 'center',
    alignItems: 'center',
    color: 'black',
    height: 30,
    fontWeight: '600',
    fontSize: 15,
    width: Dimensions.get("window").width / 3,
  },
  input: {
    width: '50%',
    textAlign: 'center',
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    fontSize: 18,
    paddingTop: 5,
    marginRight: 31,
  },
  textInfos: {
    width: '50%',
    textAlign: 'center',
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    fontSize: 18,
    paddingBottom: 5,
    margin: 10,
    height: 30,
    fontWeight: '600',
  },
  // buttonChangePhoto: {
  //   margin: 15,
  //   paddingTop: 12,
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   color: '#474CCC',
  //   borderWidth: 1,
  //   backgroundColor: '#fff',
  //   borderRadius: 100,
  //   borderColor: "#474CCC",
  //   alignItems: 'center',
  //   shadowOpacity: 0.4,
  //   shadowRadius: 5,
  //   elevation: 10,
  // }

  boolean: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    margin: 15,

  },
  text: {
    fontSize: 30,
    color: '#474CCC',
    fontWeight: "bold",
    marginBottom: 20,
  },
  changeField: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // Icon Fontawesome5
  buttonChangeOne: {
    width: Dimensions.get("window").width / 13,
    height: Dimensions.get("window").width / 13,
    paddingLeft: 7,
    paddingTop: 8,
  },


  button: {
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

  buttonQuit: {
    margin: 15,
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'red',
    borderRadius: 100,
    alignContent: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },

  textButton: {
    textAlign: 'center',
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 15,
  },
})
