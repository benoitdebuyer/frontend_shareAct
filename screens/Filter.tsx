import React from "react";
import {useState} from 'react';
import { Dimensions,StyleSheet, Text, KeyboardAvoidingView, Image, TextInput, View, TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Slider } from '@miblanchard/react-native-slider';
import { addFilter, addFilter2 } from '../reducers/filter';
import { Platform } from "react-native";

// slider by @miblanchard/react-native-slider (https://github.com/miblanchard/react-native-slider)

const BACKEND_ADDRESS = 'https://backend-share-act.vercel.app/';


//--------------------------------------Slider-----------------------------------------------------------
const DEFAULT_VALUE = 0.2;


const SliderContainer = (props) => {
     const { sliderValue, trackMarks } = props; 
  const [value, setValue] = React.useState(sliderValue ? sliderValue : DEFAULT_VALUE);
 

  const renderChildren = () => {
    //console.log("values selected : ", value) 
    return React.Children.map(props.children, (child) => { 
      console.log("éléments retournés par la fonction map : ", child)
      if (!!child && child.type === Slider) { // !!child : return a boolean. It checks if child variable is determined and not null. 
        return React.cloneElement(child, { 
          onValueChange: setValue, 
          trackMarks,
          value
        });       
      }
      return child;
    });
  };

  return (
    <View >
      <View style={styles.filter}>
        <Text style={styles.textFilter}>Départ d'ici {value.join(" à ")} heures</Text>
      </View>
      {renderChildren()}
    </View>
  );
};
//--------------------------------------end slider------------------------------------------------


export default function Filter() {
  const dispatch = useDispatch();

  const [dist, setDist] = useState('');
    const navigation = useNavigation();

  const applyFilter = () => {
    console.log("la distance sélectionnée par l'utilisateur : ", dist)
    //console.log("apply filter")
    if (dist !=''){
      dispatch(addFilter2(dist))
      //dispatch((addFilter(value)))
      console.log('1')
      navigation.navigate("TabNavigator", { screen: "Map" });}
      if (dist === '')
      { console.log('2')
      dispatch(addFilter2(10000))
      navigation.navigate("TabNavigator", { screen: "Map" });
      }
    
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text><FontAwesome name="filter" size={60} color="#474CCC" /></Text>
      <View style={styles.slider}>
        <SliderContainer
          // default value on slider
          sliderValue={[5, 60]}>
          <Slider
            maximumTrackTintColor="#d3d3d3"
            maximumValue={72}
            minimumTrackTintColor="#474CCC"
            minimumValue={1}
            step={1}
            thumbTintColor="#474CCC"/>
        </SliderContainer>
      </View>
      <View style={styles.distance}>
        <Text style={styles.textFilter}>Distance max jusqu'au point de rendez-vous</Text>
        <View style={styles.dist}>
          <TextInput
            keyboardType="number-pad"
            placeholder='Distance'
            value={dist}
            style={styles.input}
            onChangeText={setDist}          
          />
          <Text style={styles.km}>km</Text>
        </View>
      </View>

      <View style={styles.buttons}>
           <TouchableOpacity
          style={styles.buttonProfileModif}
          onPress={applyFilter}>
          <Text style={styles.textStyle}>Appliquer le filtre</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 9,
  },

  slider: {
    width: Dimensions.get("window").width * 2 / 3,
    padding: 30,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#474CCC',
    borderWidth: 2,
    margin: 50,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },

  buttonProfileModif: {
    margin: 50,
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#474CCC',
    borderRadius: 20,
    alignContent: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },

  buttonAnnuler: {
    margin: 15,
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignContent: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },

  distance: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#474CCC',
    borderWidth: 2,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },

  dist: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  textStyle: {
    textAlign: 'center',
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },

  textStyleAnnuler: {
    textAlign: 'center',
    color: 'black',
    height: 30,
    fontWeight: '600',
    fontSize: 15,
  },

  filter: {
    width: Dimensions.get("window").width / 2,
  },

  textFilter: {
    textAlign: 'center',
    color: '#474CCC',
    height: 30,
    fontWeight: '500',
    fontSize: 16,
  },

  km: {
    fontSize: 18,
  },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },

  logo: {
    height: 80,
  },

  header: {
    padding: 20
  },

  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center"
  },

  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center"
  },

  code: {
    fontFamily: "monospace, monospace"
  },

  fontAwesome: {
    width: 40,
  },

  input: {
    textAlign: 'center',
    borderBottomColor: '#474CCC',
    borderBottomWidth: 1,
    fontSize: 18,
    paddingTop: 5,
    marginRight: 31,
  },
});


