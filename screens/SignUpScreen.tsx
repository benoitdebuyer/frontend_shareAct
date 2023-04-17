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
  UserState,
  Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateFirstname, updateToken, updateUsername, updateEmail, updateImage, updateAge, updateGender, updateDatebirth } from '../reducers/user';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";



export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: UserState }) => state.user.value);

  const [firstname, setFirstname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [mdp, setMdp] = useState(null);
  const [mdp2, setMdp2] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);


  const [connectionError, setConnectionError] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [ageaddinput, setageaddinput] = useState(false);

  const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const handleSubmit = () => {
    console.log(user)
    console.log(`state firstane ${firstname}  username ${username} age ${age} pdw ${mdp} pd2 ${mdp2} gender ${gender} email ${email} dateof ${dateOfBirth} `)
    if (!EMAIL_REGEX.test(email)) {
      setConnectionError(true);
      return;
    }
    if (mdp == mdp2 && firstname && username && email && gender && age) {

      fetch('https://shareact-backend.vercel.app/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname: firstname, username, email, password: mdp, age: dateOfBirth.toISOString(), gender }),
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          data.result && dispatch(updateToken({ token: data.token, }));


          dispatch(updateFirstname(firstname))
          dispatch(updateUsername(username))
          dispatch(updateEmail(email))
          dispatch(updateDatebirth(dateOfBirth.toISOString()))
          dispatch(updateAge(age))
          dispatch(updateGender(gender))
          dispatch(updateToken(data.token))
          console.log('log  user token ',user.token)
        });

      navigation.navigate("TabNavigator", { screen: "Map" });

    } else {
      setConnectionError(!connectionError)
    }
  }


  // en cas de lien vers snap

  ///////////////////////////////////////////////////////////////

  // const handleSubmit = () => {
  //   console.log(`state firstane ${firstname}  username ${username} age ${age} pdw ${mdp} pd2 ${mdp2} gender ${gender} email ${email} dateof ${dateOfBirth} `)
  //   if (!EMAIL_REGEX.test(email)) {
  //     setConnectionError(true);
  //       return;
  //     }
  // if ( mdp == mdp2 && firstname && username && email && gender && age){

  //   dispatch(updateFirstname(firstname))
  //   dispatch(updateUsername(username))
  //   dispatch(updateEmail(email))
  //   dispatch(updateDatebirth(dateOfBirth.toISOString()))
  //   dispatch(updateAge(age))
  //   dispatch(updateGender(gender))
  //   navigation.navigate("SnapScreen");
  // }else{
  //   setConnectionError(!connectionError)
  // }
  // }

  ///////////////////////////////////////////////////////////////////////







  // const handleCalendarClose = (dob) => {
  //   console.log(dateOfBirth)
  //   console.log(user.age)
  //   setShowCalendar(false) 
  //     const calculateAge = (dob) => {
  //       const diff = Date.now() - dob.getTime();
  //       const ageDate = new Date(diff);
  //       return Math.abs(ageDate.getUTCFullYear() - 1970);
  //     };
  //     const age = calculateAge(dateOfBirth);
  //     setAge(age);
  //     dispatch(updateAge(age));
  // };


  // let calandar = <View style={styles.inputContainercalandar}>
  // <TouchableOpacity 
  //   onPress={() => setShowCalendar(!showCalendar)}
  //   activeOpacity={0.8}
  //   style={styles.inputcalandar}
  // >
  // <Text style={styles.inputcalandar}>{age ? `vous avez ${age} ans ` : 'Quel age avez vous.'}</Text>
  // </TouchableOpacity>
  // <TouchableOpacity 
  //   onPress={() => setShowCalendar(!showCalendar)}
  //   activeOpacity={0.8}

  // >
  //   <FontAwesome5 name="calendar-alt" size={20} color="#474CCC" />
  //   {showCalendar && <DatePicker
  //     style={{ width: 200 }}
  //     value={new Date()}
  //     date={dateOfBirth}
  //     mode="date"
  //     placeholder="Date de naissance"
  //     format="YYYY-MM-DD"
  //     minDate="1900-01-01"
  //     maxDate="2023-04-11"
  //     confirmBtnText="Confirmer"
  //     cancelBtnText="Annuler"
  //     customStyles={{
  //       dateIcon: {
  //         position: 'absolute',
  //         left: 0,
  //         top: 4,
  //         marginLeft: 0,
  //       },
  //       dateInput: {
  //         marginLeft: 36,
  //       },}}
  //     onDateChange={(date) => {
  //       setDateOfBirth(new Date(date));}}
  //     onConfirm={(e) => handleCalendarClose(e)}
  //     onCancel={() => setShowCalendar(false)}

  //   />}
  //   </TouchableOpacity>
  // </View>


  // teste poru plus tard calandar bouton

  // <View style={styles.inputContainercalandar}>

  // <TouchableOpacity onPress={() => setGender('Femme')} style={[styles.genderButton, gender === 'Femme' && styles.genderButtonSelected]}>
  //   <Text style={styles.genderButtonText}>Femme</Text>
  // </TouchableOpacity>

  // </View>

  // save de texteinput age 
  //<TextInput placeholder="Age:" onChangeText={(value) => setAge(value)} value={age} keyboardType="numeric" style={styles.input} />
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const seleteddate = date
    const calculateAge = (date) => {
      const diff = Date.now() - date.getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };
    const ageadd = calculateAge(seleteddate);
    dispatch(updateAge(ageadd))
    setDateOfBirth(date)
    setAge(ageadd)
    setageaddinput(true)
    hideDatePicker();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput placeholder="Prénom:" onChangeText={(value) => setFirstname(value)} value={firstname} style={styles.input} />
      <TextInput placeholder="Pseudo:" onChangeText={(value) => setUsername(value)} value={username} style={styles.input} />




      <TextInput placeholder="Email:" onChangeText={(value) => setEmail(value)} keyboardType="email-address" value={email} style={styles.input} />

      <View style={styles.inputContainer}>
        <TextInput placeholder="Password" onChangeText={(value) => setMdp(value)} value={mdp} style={styles.inputPassword} secureTextEntry={showPassword} />

      </View>

      <View style={styles.inputContainer}>
        <TextInput placeholder="Confirmer le mot de passe" onChangeText={(value) => setMdp2(value)}
          value={mdp2} style={styles.inputPassword} secureTextEntry={showPassword} />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          activeOpacity={0.8}
          style={styles.iconButton}
        >
          <FontAwesome5 name={showPassword ? "eye" : "eye-slash"} size={20} color="#474CCC" />
        </TouchableOpacity>
      </View>




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



      <View style={styles.containercalandarm}>
        <TouchableOpacity onPress={showDatePicker} style={styles.buttoncalandarm}>
          {ageaddinput ? <Text style={styles.buttonTextcalandarm}>Vous avez {user.age} ans</Text> : <Text style={styles.buttonTextcalandarm}>Date de naissance : </Text>}
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isDatePickerVisible}
          onRequestClose={hideDatePicker}
        >
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale="fr_FR"
          />
        </Modal>
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
    marginTop: 30,
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  inputcalandar: {
    width: '80%',
    borderBottomColor: '#474CCC',
    fontSize: 18,
    color: 'grey',
  },
  inputContainercalandar: {
    width: '80%',
    marginTop: 30,
    borderBottomColor: '#474CCC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  inputContainercalandar2: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%',
    marginTop: 30,
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputPassword: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },

  iconButton: {
    marginRight: 10,
  },

  button: {
    width: '70%',
    alignItems: 'center',
    paddingTop: 8,
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


  containercalandarm: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 25,
    width: '90%',
  },
  buttoncalandarm: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderColor: "#474CCC",
    borderWidth: 1,
  },
  buttonTextcalandarm: {
    color: 'grey',
    fontWeight: '600',
    fontSize: 16,
    height: 30,
  },


});
