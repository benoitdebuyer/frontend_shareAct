import React from "react";
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { login } from '../reducers/user';
import { autoBatchEnhancer } from "@reduxjs/toolkit";
import { updateFirstname, updateToken, updateUsername, updateEmail, updateImage, updateAge, updateGender, updateDatebirth } from '../reducers/user';

// Grabbed from emailregex.com
const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const BACKEND_ADDRESS = 'https://shareact-backend.vercel.app';



export default function HomeScreen({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector((state: { user: UserState }) => state.user.value);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  // pour cacher ou afficher le mot de passe
  const [hidePassword, setHidePassword] = useState(true);


  //   const handleSubmit = () => {
  // // dispatch pour test
  // dispatch(updateToken('U4t1K88SoTEvn5wHM08X5ASxfk4WYniw'))
  // dispatch(updateFirstname('Test'))
  // dispatch(updateUsername('Test'))
  // dispatch(updateEmail('Test@Test.Test'))
  // dispatch(updateAge('20'))
  // dispatch(updateGender('Autre'))

  //     navigation.navigate("TabNavigator", { screen: "Map" });
  //   }


  const handleSubmit = () => {
    fetch(`${BACKEND_ADDRESS}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          setEmailError(true);
        } else {


          dispatch(updateFirstname(data.firstname));
          dispatch(updateUsername(data.username));
          dispatch(updateToken(data.token));
          dispatch(updateEmail(email));
          dispatch(updateGender(data.gender));
          dispatch(updateDatebirth(data.age));

      navigation.navigate("TabNavigator", { screen: "Map" });
       }
    })
}

//   const handleSubmit = () => {
//     fetch(`${BACKEND_ADDRESS}/users/signin`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       if (!data.result) {
//         setEmailError(true);
//       } else {
       
       
//         dispatch(updateFirstname(data.username));
//         dispatch(updateUsername(data.firstname));
//         dispatch(updateToken(data.token));
//         dispatch(updateEmail(email));
//         dispatch(updateGender(data.gender));
//         dispatch(updateDatebirth(data.age));

//         // appel de la fonction calculateAge qui calcule l'age par rapport a la date de naissance.
//         const agecalculated = calculateAge(new Date(data.age)); 
//         dispatch(updateAge(agecalculated))
//         navigation.navigate("TabNavigator", { screen: "Map" });
//       }
//     })
// }


const calculateAge = (dateOfBirth) => {
  const diff = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* <Image style={styles.image} source={require('../assets/home-image.jpg')} /> */}
      <Text style={styles.title}>Connexion</Text>
      <Image style={styles.image} source={require('../assets/shareact-white.png')} />


      <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} keyboardType="email-address" style={styles.input} />


      <View style={styles.inputContainer}>
        <TextInput placeholder="Password" onChangeText={(value) => setPassword(value)} value={password} style={styles.inputPassword} secureTextEntry={hidePassword} />
        <TouchableOpacity
          onPress={() => setHidePassword(!hidePassword)}
          activeOpacity={0.8}
          style={styles.iconButton}
        >
          <FontAwesome5 name={hidePassword ? "eye-slash" : "eye"} size={20} color="#474CCC" />
        </TouchableOpacity>
      </View>


      {emailError && <Text style={styles.error}>L'adresse e-mail ou le mot de passe est incorrect</Text>}


      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Se connecter</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
    color: '#474CCC',
    textAlign: 'center',
  },
  image: {
    width: '70%',
    height: '40%',
    marginTop: 5,
  },
  input: {
    width: '80%',
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    fontSize: 18,
    paddingBottom: 5,
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
  inputContainer: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputPassword: {
    flex: 1,
    fontSize: 18,
    marginLeft: 0,
    marginTop: 25,
    paddingBottom: 5,
  },
  iconButton: {
    marginRight: 10,
    paddingBottom: 5,
  },
  button: {
    width: '70%',
    alignItems: 'center',
    paddingTop: 8,
    marginTop: 50,
    backgroundColor: '#474CCC',
    borderRadius: 50,
    marginBottom: 20,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});