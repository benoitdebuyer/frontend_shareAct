import React from "react";
import { useState } from 'react';
import {
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
import DateTimePickerModal from "react-native-modal-datetime-picker";

const photosDataall: string[] = [
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/woman2_botq5a.jpg',
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/man2_pcigrd.png',
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/woman1_vl6o6d.png',
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/man1_yt6hju.png',
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681915374/user_ap8cxl.png",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar8_mmnwko.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar4_szelyb.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar12_iwwzmk.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar2_hposjh.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898002/avatar14_l82t8z.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898002/avatar13_ilydse.jpg",
];

const photosDataman: string[] = [
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/man2_pcigrd.png',
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/man1_yt6hju.png',
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681915374/user_ap8cxl.png",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar8_mmnwko.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar2_hposjh.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898002/avatar13_ilydse.jpg",
];

const photosDatawoman: string[] = [
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/woman2_botq5a.jpg',
  'https://res.cloudinary.com/dhydrphov/image/upload/v1681980918/woman1_vl6o6d.png',
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar4_szelyb.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898001/avatar12_iwwzmk.jpg",
  "https://res.cloudinary.com/dhydrphov/image/upload/v1681898002/avatar14_l82t8z.jpg",
];
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
  const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
  
  const handleSubmit = () => {
    if (!EMAIL_REGEX.test(email)) {
      setConnectionError(true);
      return;
    }
    if (mdp == mdp2 && firstname && username && email && gender && age) {
      let genderdataphoto = []
      switch (gender) {
        case 'Femme': genderdataphoto = photosDatawoman
          break;
        case 'Homme': genderdataphoto = photosDataman
          break;
        case 'Autre': genderdataphoto = photosDataall
          break;
        default:
      }

      const newPhotoIndex = Math.floor(Math.random() * genderdataphoto.length);
      const selectedPhoto = genderdataphoto[newPhotoIndex];

      // sending to bdd
      fetch('https://backend-share-act.vercel.app//users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname: firstname, username, email, password: mdp, age: dateOfBirth.toISOString(), gender, image: selectedPhoto }),
      }).then(response => response.json())
        .then(data => {
          dispatch(updateFirstname(firstname))
          dispatch(updateUsername(username))
          dispatch(updateEmail(email))
          dispatch(updateDatebirth(dateOfBirth.toISOString()))
          dispatch(updateAge(age))
          dispatch(updateGender(gender))
          dispatch(updateToken(data.token))
          dispatch(updateImage(selectedPhoto))
        });
      navigation.navigate("TabNavigator", { screen: "Map" });

    } else {
      setConnectionError(!connectionError)
    }
  }

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
          style={styles.iconButton}>
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
          onRequestClose={hideDatePicker}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale="fr_FR"/>
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

  avatarContainer: {
    flexDirection: 'row',
    marginTop: 25,
    width: '90%',
    justifyContent: 'space-between',
  },
  avatarButtonSelected: {
    backgroundColor: '#E2E2F3',
    borderColor: '#474CCC',
    borderWidth: 3,
  },

  photoAvatar: {
    width: 100,
    height: 100,
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
