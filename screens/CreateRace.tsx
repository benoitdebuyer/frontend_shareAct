

import React from "react";
import { Modal, StyleSheet, Text, Dimensions, TextInput, TouchableOpacity, View } from 'react-native';


export default function CreateRace() {  
    
    
    return (
    <View style={styles.container}>
        <Text style={styles.text}>
            HelloCreate
        </Text>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"column",
      alignItems:'center',
      width: Dimensions.get("window").width,
    height:Dimensions.get("window").height,
    },
    text:{
      flex: 1,
      fontSize:30,
    }

})