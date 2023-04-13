import React from "react";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const BACKEND_ADDRESS = 'https://shareact-backend.vercel.app';
// const BACKEND_ADDRESS = 'http://10.6.23.18:3000';

export default function CreateRace() {
  const user = useSelector((state) => state.user.value);
  const route = useRoute();

  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  // const [nbrParticipants, setNbrParticipants] = useState('');
  const [level, setLevel] = useState('');
  const [nbrParticipants, setNbrParticipants] = useState('');

  const [dateRace, setDateRace] = useState(new Date());
  const [dateInput, setDateInput] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setDateRace(date);
    hideDatePicker();
    setDateInput(true)
  };

  // Description
  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  // Durée
  const handleDurationChange = (text) => {
    setDuration(text.replace(/[^0-9]/g, '').slice(0, 3));
  };

  // Distance
  const handleDistanceChange = (text) => {
    setDistance(text.replace(/[^0-9]/g, '').slice(0, 2));
  };


  const handleCreate = () => {
    const date = new Date(dateRace);
    const durationNumber = Number(duration);
    const distanceNumber = Number(distance);
    const nbrParticipantsNumber = Number(nbrParticipants);
    const data = { token: user.token, description: description, date: date, address: "Parc", latitude: user.userplaces, longitude: user.userplaces, duration: durationNumber, distance: distanceNumber, level: level, maxParticipants: nbrParticipantsNumber };
    console.log(data); // Ajout de cette ligne pour afficher les données envoyées
    fetch(`${BACKEND_ADDRESS}/races`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, description: description, date: date, address: "Place de la mairie", latitude: 48.883732, longitude: 2.230914, duration: durationNumber, distance: distanceNumber, level: level, maxParticipants: nbrParticipantsNumber }),
    }).then((response) => response.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate("TabNavigator", { screen: "Map" });
        }
      });
  };



  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Création de course</Text>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Description de votre course :"
            multiline={true}
            maxLength={100}
            value={description}
            onChangeText={handleDescriptionChange}
          />

          <View style={styles.placeView}>
            <Text style={styles.titlePlace}>Adresse : </Text>
            <Text style={styles.place}>Bois de Boulogne, près du lac</Text>
          </View>



          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Durée"
              maxLength={4}
              value={duration}
              onChangeText={handleDurationChange}
            />
            <Text style={styles.inputText}>min</Text>
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Distance"
              maxLength={4}
              value={distance}
              onChangeText={handleDistanceChange}
            />
            <Text style={styles.inputText}>km</Text>
          </View>


          <View style={styles.selectView}>
            <TouchableOpacity onPress={showDatePicker}>
              {dateInput ? <Text style={styles.buttonDateText}>{dateRace.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</Text> : <Text style={styles.buttonDateText}>Date et heure</Text>}
            </TouchableOpacity>

            <Modal
              transparent={true}
              visible={isDatePickerVisible}
              onRequestClose={hideDatePicker}
            >
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </Modal>
          </View>


          <View style={styles.selectView}>
            <RNPickerSelect
              onValueChange={(value) => setLevel(value)}
              items={[
                { label: 'Débutant', value: 'débutant' },
                { label: 'Normal', value: 'normal' },
                { label: 'Confirmé', value: 'confirmé' },
              ]}
              placeholder={{ label: 'Niveau :', value: null }}
              style={pickerSelectStyles}
              value={level}
            />
          </View>

          <View style={styles.selectView}>
            <RNPickerSelect
              onValueChange={(value) => setNbrParticipants(value)}
              items={[
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
                { label: '5', value: 5 },
                { label: '6', value: 6 },
                { label: '7', value: 7 },
              ]}
              placeholder={{ label: 'Nombre maximum de participants :', value: null }}
              style={pickerSelectStyles}
              value={nbrParticipants}
            />
          </View>





        </View>

        <TouchableOpacity onPress={() => handleCreate()} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Créer ma course</Text>
        </TouchableOpacity>


      </View>
    </ScrollView>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  title: {
    width: '80%',
    fontSize: 36,
    fontWeight: '600',
    color: '#474CCC',
    textAlign: 'center',
  },
  // Description
  textInput: {
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20,
    paddingTop: 10,
    minWidth: '80%',
    maxWidth: '80%',
    height: 100,
    borderWidth: 1,
    borderColor: '#474CCC',
    paddingHorizontal: 10,
    paddingVertical: 60,
    fontSize: 16,
    borderRadius: 15,
  },
  // Adresse du parcours
  placeView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titlePlace: {
    marginTop: 20,
    color: '#474CCC',
  },
  place: {
    marginTop: 20,
  },
  // Durée et distance
  inputView: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  input: {
    marginTop: 10,
    width: 100,
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor: '#474CCC',
    paddingHorizontal: 10,
    fontSize: 16,
    // borderRadius: 15,
    textAlign: 'center',
  },
  inputText: {
    marginLeft: 10,
    fontSize: 16,
    paddingBottom: 6,
  },
  // Niveau et Nombre de participants
  selectView: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#474CCC',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
  },
  // Date et heure
  buttonDateText: {
    color: 'black',
    textAlign: 'center',
  },

  // Bouton créer ma course
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


})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    // paddingVertical: 12,
    // paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: 'gray',
    // borderRadius: 4,
    // color: 'black',
    // paddingRight: 30, // to ensure the text is never behind the icon
    // backgroundColor: 'white',
    // marginLeft: 20,
    // marginRight: 20,
    textAlign: 'center',
  },
  inputAndroid: {
    fontSize: 16,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    // borderWidth: 0.5,
    // borderColor: 'purple',
    // borderRadius: 8,
    // color: 'black',
    // paddingRight: 30, // to ensure the text is never behind the icon
    // backgroundColor: 'white',
    // marginLeft: 20,
    // marginRight: 20,
    textAlign: 'center',
  },
});
