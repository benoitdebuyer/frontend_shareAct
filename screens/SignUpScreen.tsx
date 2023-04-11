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
import DatePicker from '@react-native-community/datetimepicker';


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [mdp, setMdp] = useState(null);
  const [mdp2, setMdp2] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender,setGender] = useState(null);
  

  const [connectionError,setConnectionError] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);

  const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = () => {

    if (!EMAIL_REGEX.test(email)) {
        setConnectionError(true);
          return;
        }

   
    if ( mdp == mdp2 && firstname && username && email && dateOfBirth && gender){

      const calculateAge = (dob) => {
        const diff = Date.now() - dob.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      };
      const age = calculateAge(dateOfBirth)
      
      dispatch(updateAge(age));
      navigation.navigate('TabNavigator', { screen: 'Map' })

    }else{
      setConnectionError(!connectionError)
    }
  };
  const handleCalendarClose = () => {
    console.log(dateOfBirth)
    setShowCalendar(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* <Image style={styles.image} source={require('../assets/home-image.jpg')} /> */}
      <Text style={styles.title}>Inscription</Text>

      <TextInput placeholder="Prénom:" onChangeText={(value) => setFirstname(value)} value={firstname} style={styles.input} />
      <TextInput placeholder="Pseudo:" onChangeText={(value) => setUsername(value)} value={username} style={styles.input} />
      <TextInput placeholder="Email:" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />

  <View style={styles.inputContainer}>
  <TextInput placeholder="Password" onChangeText={(value) => setMdp(value)} value={mdp} style={styles.inputPassword} secureTextEntry={showPassword}/>

    </View>

    <View style={styles.inputContainer}>
  <TextInput placeholder="Confirmer le mot de passe" onChangeText={(value) => setMdp2(value)} 
  value={mdp2} style={styles.inputPassword} secureTextEntry={showPassword}/>

  <TouchableOpacity 
      onPress={() => setShowPassword(!showPassword)}
      activeOpacity={0.8}
      style={styles.iconButton}
    >
      <FontAwesome5 name={showPassword ? "eye" : "eye-slash"} size={20} color="#474CCC" />
    </TouchableOpacity>
    </View>



    <View style={styles.inputContainercalandar}>
            <TouchableOpacity 
              onPress={() => setShowCalendar(!showCalendar)}
              activeOpacity={0.8}
              style={styles.inputcalandar}
            >
            <Text style={styles.inputcalandar}>Date de naissance</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setShowCalendar(!showCalendar)}
              activeOpacity={0.8}
              
            >
              <FontAwesome5 name="calendar-alt" size={20} color="#474CCC" />
              {showCalendar && <DatePicker
                style={{ width: 200 }}
                value={dateOfBirth}
                date={dateOfBirth}
                mode="date"
                placeholder="Date de naissance"
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate="2023-04-11"
                confirmBtnText="Confirmer"
                cancelBtnText="Annuler"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={(date) => {
                  setDateOfBirth(new Date(date));
                }}
                onChange={() => handleCalendarClose()}
                onCancel={() => handleCalendarClose()}
              />}

              </TouchableOpacity>
    </View>

      {/* <TextInput placeholder="gender" onChangeText={(value) => setGender(value)} value={gender} style={styles.input} /> */}


      <View style={styles.genderContainer}>
      <TouchableOpacity onPress={() => setGender('Homme')} style={[styles.genderButton, gender === 'Homme' && styles.genderButtonSelected]}>
          <Text style={styles.genderButtonText}>Homme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender('Femme')} style={[styles.genderButton, gender === 'Femme' && styles.genderButtonSelected]}>
          <Text style={styles.genderButtonText}>Femme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender('Autre')} style={[styles.genderButton, gender === 'Autre' && styles.genderButtonSelected]}>
          <Text style={styles.genderButtonText}>Autre</Text>
        </TouchableOpacity>
      </View>





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
  inputcalandar: {
    width: '80%',
    borderBottomColor: '#474CCC',
    fontSize: 18,
    color:'grey',
  },
  inputContainercalandar:{
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center'
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
  genderContainer: {
    flexDirection: 'row',
    marginTop: 25,
    width: '80%',
    justifyContent: 'space-between',
  },
  genderButton: {
    width: '30%',
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#474CCC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderButtonSelected: {
    backgroundColor: '#E2E2F3',
  },
  genderButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#474CCC',
  },
});
