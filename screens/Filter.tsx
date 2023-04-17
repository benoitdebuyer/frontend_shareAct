import React from "react";
import { useEffect, useState } from 'react';
import { Dimensions, AppRegistry, StyleSheet, Text, Image, TextInput, View, TouchableOpacity, Button, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Slider} from '@miblanchard/react-native-slider';






const BACKEND_ADDRESS = 'https://shareact-backend.vercel.app';


/////////////////Slider horaire///////////////////////////////////////////

const DEFAULT_VALUE = 0.2;
function Link(props) {
  return (
    <Text
      {...props}
      accessibilityRole="link"
      style={StyleSheet.compose(styles.link, props.style)}
    />
  );
}

const SliderContainer = (props) => {
  const { caption, sliderValue, trackMarks } = props;
  const [value, setValue] = React.useState(
    sliderValue ? sliderValue : DEFAULT_VALUE
  );
  let renderTrackMarkComponent;

  if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
    renderTrackMarkComponent = (index) => {
      const currentMarkValue = trackMarks[index];
      const currentSliderValue =
        value || (Array.isArray(value) && value[0]) || 0;
      const style = currentMarkValue > Math.max(currentSliderValue);
     
      return <View/>;
    };
  }

  const renderChildren = () => {
    console.log(value)
    return React.Children.map(props.children, (child) => {
      if (!!child && child.type === Slider) {
        return React.cloneElement(child, {
          onValueChange: setValue,
          renderTrackMarkComponent,
          trackMarks,
          value
        });
      }

      return child;
    });
  };

  return (
    <View >
      <Text style={styles.textFilter}>Sélectionner par horaire de départ :</Text>
      {renderChildren()}
      <View style={styles.filter}>
        {/* <Text >{caption}</Text> */}
        
        <Text style={styles.textFilter}>D'ici {Array.isArray(value) ? value.join(" à ") : value} h !</Text>
      </View>
    </View>
  );
};
/////////////////////////////////////////////////////////////////////

const applyFilter = () => {
    console.log("apply filter")
  };

export default function Filter() {
    return (
        <View style={styles.container}>
            <Text><FontAwesome5 name="filter" size={60} color="#474CCC" /></Text>

           
            <View style={styles.slider}>
            <SliderContainer
                // default value on slider
                sliderValue={[2, 8]}
            >
                <Slider
                
                maximumTrackTintColor="#d3d3d3"
                maximumValue={9}
                minimumTrackTintColor="#474CCC"
                minimumValue={1}
                step={1}
                thumbTintColor="#474CCC"
                />
                
            </SliderContainer>
            </View>

            <TouchableOpacity
              style={styles.buttonAnnuler}
              onPress={applyFilter}
            >
              <Text style={styles.textStyle}>Annuler</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonProfileModif}
              onPress={applyFilter}
            >
              <Text style={styles.textStyle}>Appliquer le filtre</Text>
            </TouchableOpacity>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems:'center',
        
        
        
      },
      slider:{
        width:Dimensions.get("window").width*2/3,
        
      },
      buttonProfileModif: {
   

        margin :15,
        paddingTop: 12,
        paddingLeft: 20, 
        paddingRight:20, 
        backgroundColor:'#474CCC',
        borderRadius: 20,
        alignContent:'center',
        justifyContent:'center',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 10,
        
      },
      buttonAnnuler: {
   

        margin :15,
        paddingTop: 12,
        paddingLeft: 20, 
        paddingRight:20, 
        backgroundColor:'red',
        borderRadius: 20,
        alignContent:'center',
        justifyContent:'center',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 10,
        
      },
      textStyle: {
        textAlign:'center',
        color: '#ffffff',
        height: 30,
        fontWeight: '600',
        fontSize: 15,
      },
      filter:{
        width: Dimensions.get("window").width/2,
        
        
      },
      textFilter:{
        fontSize:20,
        
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        color: '#474CCC',

      },
    
      logo: {
        height: 80
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
      link: {
        color: "#1B95E0"
      },
      code: {
        fontFamily: "monospace, monospace"
      },
      fontAwesome:{
        width:40,
      },
    });
    
   
    