

import React from "react";
import { Modal, StyleSheet, Text, Dimensions, TextInput, TouchableOpacity, View } from 'react-native';


export default function CreateRace() {  
    
    
    return (
    <View style={styles.container}>
        <Text style={styles.text}>
            Hello CreateRace Screen
        </Text>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"column",
      alignItems:'center',
      justifyContent:'center',
      
    },
    text:{
    
      
      fontSize:30,
    }

})