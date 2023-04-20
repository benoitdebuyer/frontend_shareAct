import React from "react";
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const BACKEND_ADDRESS = 'https://shareact-backend.vercel.app';
// const BACKEND_ADDRESS = 'http://10.6.23.18:3000';

export default function CreateRace() {
  const user = useSelector((state) => state.user.value);
  const race = useSelector((state) => state.race.value);

  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [level, setLevel] = useState('');
  const [nbrParticipants, setNbrParticipants] = useState('');
  const [dateRace, setDateRace] = useState(new Date());
  const [dateInput, setDateInput] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  // Description
  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  // Pour la sélection de la date et de l'heure
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

  // Durée
  const handleDurationChange = (text) => {
    setDuration(text.replace(/[^0-9]/g, '').slice(0, 3));
  };

  // Distance
  const handleDistanceChange = (text) => {
    setDistance(text.replace(/[^0-9]/g, '').slice(0, 2));
  };

  // Bouton créer ma course
  const handleCreate = () => {
    const date = new Date(dateRace);
    const durationNumber = Number(duration);
    const distanceNumber = Number(distance);
    const nbrParticipantsNumber = Number(nbrParticipants);
    const data = { token: user.token, description: description, date: date, address: race.newAddress, latitude: race.newracelat, longitude: race.newracelon, duration: durationNumber, distance: distanceNumber, level: level, maxParticipants: nbrParticipantsNumber };
    console.log(data);

    fetch(`${BACKEND_ADDRESS}/races`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, description: description, date: date, address: race.newAddress, latitude: race.newracelat, longitude: race.newracelon, duration: durationNumber, distance: distanceNumber, level: level, maxParticipants: nbrParticipantsNumber }),
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

          <Text style={styles.titleAddress} >Adresse : </Text>
          <Text style={styles.address} >{race.newAddress} </Text>



          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Durée"
              keyboardType="numeric"
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
              keyboardType="numeric"
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
                locale="fr_FR"
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
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
                { label: '5', value: 5 },
                { label: '6', value: 6 },
                { label: '7', value: 7 },
                { label: '8', value: 8 },
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
  titleAddress: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#474CCC',
  },
  address: {
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    height: 60,
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    minWidth: '80%',
    maxWidth: '80%',
    fontSize: 16,
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
    height: 18,
  },

  // Bouton créer ma course
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


})

// Pour les sélections "niveau" et "nombre maximum de participants"
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    textAlign: 'center',
  },
  inputAndroid: {
    fontSize: 16,
    textAlign: 'center',
  },
});
