

import React from "react";
import { Modal, StyleSheet, Text, Dimensions, TextInput, TouchableOpacity, View } from 'react-native';


export default function CreateRace() {  
    
    
    return (
    <View style={styles.container}>
        <Text >
            HelloCreate
        </Text>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: Dimensions.get("window").width,
    height:Dimensions.get("window").height,
    },

})