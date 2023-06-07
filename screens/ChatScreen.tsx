import React from "react";
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function PlacesScreen({ navigation }) {
  const dispatch = useDispatch();

  const [city, setCity] = useState('');

  const gotoracecard = () => {
    navigation.navigate("Racecard");
  }

  const gotoParticipants = () => {
    navigation.navigate("Participants");
  }

  const gotoJoin = () => {
    navigation.navigate("JoinRaceScreen");
  }
  const gotoSnapScreen = () => {
    navigation.navigate("SnapScreen");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chat</Text>

      <View style={styles.inputContainer}>
        <TextInput placeholder="Message" onChangeText={(value) => setCity(value)} value={city} style={styles.input} />
        <TouchableOpacity onPress={gotoracecard} style={styles.buttonSend} activeOpacity={0.8}>
          <Text><FontAwesome5 name="paper-plane" size={20} color="white" /></Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={gotoracecard} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Racecard</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={gotoParticipants} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Participants </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={gotoSnapScreen} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Join SnapScreen </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={gotoJoin} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Join race</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* {places} */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 20,
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  input: {
    width: '65%',
    marginTop: 6,
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  buttonSend: {
    marginTop: 20,
    width: '30%',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#474CCC',
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    width: '30%',
    alignItems: 'center',
    paddingTop: 8,
    backgroundColor: '#474CCC',
    borderRadius: 10,
  },
  textButton: {
    color: '#ffffff',
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },
});
