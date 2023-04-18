import React from "react";
import { useEffect, useState } from 'react';
import { Dimensions, AppRegistry, StyleSheet, Text,KeyboardAvoidingView, Image, TextInput, View, TouchableOpacity, Button, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Slider} from '@miblanchard/react-native-slider';
import { addFilter, addFilter2 } from '../reducers/filter';






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
    const dispatch = useDispatch();
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
    dispatch(addFilter(value))
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
      {/* <Text style={styles.textFilter}>Sélectionner par horaire de départ :</Text>
       */}
      <View style={styles.filter}>
        {/* <Text >{caption}</Text> */}
        
        <Text style={styles.textFilter}>Départ d'ici {Array.isArray(value) ? value.join(" à ") : value} h !</Text>
        
      </View>
      {renderChildren()}
    </View>
  );
};
/////////////////////////////////////////////////////////////////////


export default function Filter() {
    const dispatch = useDispatch();

    let [dist, setDist] = useState(10000);
    const navigation = useNavigation();

    const quitFilterPage = () => {
        console.log("quit filter")
        //navigation.navigate("TabNavigator", { screen: "Map" });
      };
    const applyFilter = () => {
        console.log("apply filter")
        

      
         dispatch(addFilter2(dist))

         

        navigation.navigate("TabNavigator", { screen: "Map" });
      };



    
    return (
             <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text><FontAwesome5 name="filter" size={60} color="#474CCC" /></Text>

           
            <View style={styles.slider}>
            <SliderContainer
                // default value on slider
                sliderValue={[5, 60]}
            >
                <Slider
                
                maximumTrackTintColor="#d3d3d3"
                maximumValue={72}
                minimumTrackTintColor="#474CCC"
                minimumValue={1}
                step={1}
                thumbTintColor="#474CCC"
                />

             
                
            </SliderContainer>
            </View>
            <View style={styles.distance}>
            <TextInput
                placeholder='Entrez la distance max ...'
                onChangeText={(value) => setDist(value)}
                value={dist}
                style={styles.input}
            />
            <Text >km</Text>
            </View>
            
            <View style={styles.buttons}>
                {/* <TouchableOpacity
                style={styles.buttonAnnuler}
                onPress={quitFilterPage}
                >
                <Text style={styles.textStyleAnnuler}>Annuler</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                style={styles.buttonProfileModif}
                onPress={applyFilter}
                >
                <Text style={styles.textStyle}>Appliquer le filtre</Text>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
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
        backgroundColor:'white',
        borderRadius: 20,
        alignContent:'center',
        justifyContent:'center',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 10,
        
      },
      distance:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end',

      },
      textStyle: {
        textAlign:'center',
        color: '#ffffff',
        height: 30,
        fontWeight: '600',
        fontSize: 15,
      },
      textStyleAnnuler: {
        textAlign:'center',
        color: 'black',
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
      buttons:{
        display:'flex',
        flexDirection:'row',
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
      input :{
    width: Dimensions.get("window").width/2,
      textAlign: 'center',
      borderBottomColor: '#474CCC',
      borderBottomWidth: 1,
      fontSize: 18,
      paddingTop: 5,
      marginRight: 31,
      },
    });
    
   
    