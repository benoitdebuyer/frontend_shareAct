import React from "react";
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View, TouchableOpacity, Button, } from 'react-native';
import { useNavigation } from '@react-navigation/native';




const BACKEND_ADDRESS = 'https://shareact-backend.vercel.app';


export default function MonCompte() {
    const navigation = useNavigation();

  const handleReturn = () => {

    navigation.navigate("TabNavigator", { screen: "Map" });


  }

  return (
    <View style={styles.container}>
        <Text style={styles.text}>

            Hello
        </Text>

      <TouchableOpacity  style={styles.button} onPress={() => handleReturn()} activeOpacity={0.8}>
              <Text style={styles.textButton} >Annuler</Text>
      </TouchableOpacity>  
        
     


    </View>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:100,
  },
textButton:{
    backgroundColor:'black',
  color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 15,
    borderRadius: 100,
    width: Dimensions.get("window").width/2,

}
  
})
