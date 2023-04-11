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
import { useDispatch } from 'react-redux';
import { updateFirstname,updateUsername,updateEmail,updateImage,updateAge,updateGender, } from '../reducers/user';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(null);
  const [pseudo, setPseudo] = useState(null);
  const [email, setEmail] = useState(null);
  const [mdp, setMdp] = useState(null);
  const [mdp2, setMdp2] = useState(null);
  const [age, setAge] = useState(Number);
  const [gender,setGender] = useState(null);

  const [connectionError,setConnectionError] = useState(null);

  const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = () => {

function checkBody(body, keys) {
  let isValid = true;

  for (const field of keys) {
    if (!body[field] || body[field] === '') {
      isValid = false;
    }
  }

  return isValid;
}
   
if (mdp === mdp2 && checkBody({username, pseudo, email, mdp, age, gender}, ['username', 'pseudo', 'email', 'mdp', 'age', 'gender'])){
  
  dispatch(updateAge(age));
  navigation.navigate('TabNavigator', { screen: 'Map' });
}else{
  setConnectionError(!connectionError)
}
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* <Image style={styles.image} source={require('../assets/home-image.jpg')} /> */}
      <Text style={styles.title}>Inscription</Text>

  <TextInput placeholder="Prénom:" onChangeText={(value) => setUsername(value)} value={username} style={styles.input} />
  <TextInput placeholder="Pseudo:" onChangeText={(value) => setPseudo(value)} value={pseudo} style={styles.input} />
  <TextInput placeholder="Email:" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
  <View style={styles.inputContainer}>
  <TextInput placeholder="Password" onChangeText={(value) => setMdp(value)} value={mdp} style={styles.inputPassword} secureTextEntry={showPassword}/>
  <TouchableOpacity 
      onPress={() => setShowPassword(!showPassword)}
      activeOpacity={0.8}
      style={styles.iconButton}
    >


    </TouchableOpacity>
    </View>


<View style={styles.inputContainer}>
  <TextInput placeholder="Confirmer le mot de passe" onChangeText={(value) => setMdp2(value)} value={mdp2} style={styles.inputPassword} secureTextEntry={showPassword}/>
  <TouchableOpacity 
      onPress={() => setShowPassword(!showPassword)}
      activeOpacity={0.8}
      style={styles.iconButton}
    >
      <FontAwesome5 name={showPassword ? "eye" : "eye-slash"} size={20} color="#474CCC" />
    </TouchableOpacity>
    </View>
      
      <TextInput placeholder="age" onChangeText={(value) => setAge(value)} value={age} style={styles.input} />
      <TextInput placeholder="gender" onChangeText={(value) => setGender(value)} value={gender} style={styles.input} />
      {connectionError && <Text style={styles.error}>Un champ est vide ou les mots de passe ne sont pas identiques.</Text>}
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>S'inscrire</Text>
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
    color: '#474CCC'
  },
  input: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  inputContainer:{
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputPassword:{
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },

  iconButton:{
    marginRight: 10,
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
});

