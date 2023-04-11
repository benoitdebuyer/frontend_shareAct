import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen({ navigation }) {


  const handleSignUp = () => {;
    navigation.navigate('SignUp');
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
     <View style={styles.logobox} >
     <Image style={styles.image} source={require('../assets/shareact3.png')} />
    
      {/* <Text style={styles.title}>Welcome to Share Act</Text> */}


      <TouchableOpacity onPress={() => handleSignIn()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Connexion</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleSignUp()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Inscription</Text>
      </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#474CCC',
    alignItems: 'center',
    justifyContent: 'center',
 
  },
  logobox:{
    alignItems: 'center',
    width: '100%',
    height: '100%',
    
  },
  image: {
    width: '70%',
    height: '40%',
    marginTop:90,
    marginBottom:70,
    
    
  },
  title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#ec6e5b',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '70%',
    marginTop: 30,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    marginBottom: 20,
  },
  textButton: {
    color: '#474CCC',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});
