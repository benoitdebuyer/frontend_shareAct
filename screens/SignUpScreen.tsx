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
} from 'react-native';
import { useDispatch } from 'react-redux';
import { updateEmail } from '../reducers/user';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    dispatch(updateEmail(email));
    navigation.navigate('TabNavigator', { screen: 'Map' });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* <Image style={styles.image} source={require('../assets/home-image.jpg')} /> */}
      <Text style={styles.title}>Inscription</Text>

      <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
      <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
      <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
      <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
      <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
      <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
      <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
      <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />




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
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#474CCC',
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});
