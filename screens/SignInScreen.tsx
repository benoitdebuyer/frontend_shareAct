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
import { updateEmail } from '../reducers/user';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Grabbed from emailregex.com
const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const BACKEND_ADDRESS = 'http://10.6.23.18:3000';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);


  const handleSubmit = () => {
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      return;
    }
  
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
          dispatch(updateEmail(email));
          navigation.navigate("TabNavigator", { screen: "Map" });
        }
      })
  };
  


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* <Image style={styles.image} source={require('../assets/home-image.jpg')} /> */}
      <Text style={styles.title}>Connexion</Text>


      <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />


      <View style={styles.inputContainer}>
      <TextInput placeholder="Password" onChangeText={(value) => setPassword(value)} value={password} style={styles.inputPassword} secureTextEntry={hidePassword}/>
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
  image: {
    width: '100%',
    height: '50%',
  },
  title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
    color: '#474CCC',
  },
  input: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '70%',
    marginTop: 30,
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
    alignItems: 'center',
  },
  inputPassword: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
  iconButton: {
    marginRight: 10,
  },
});