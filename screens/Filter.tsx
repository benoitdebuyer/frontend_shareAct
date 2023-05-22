import React from "react";
import {useState} from 'react';
import { Dimensions,StyleSheet, Text, KeyboardAvoidingView, Image, TextInput, View, TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Slider } from '@miblanchard/react-native-slider';
import { addFilter, addFilter2 } from '../reducers/filter';

// slider créé par @miblanchard/react-native-slider (lien utile :  https://github.com/miblanchard/react-native-slider)

const BACKEND_ADDRESS = 'https://backend-share-act.vercel.app/';


//--------------------------------------Slider-----------------------------------------------------------
const DEFAULT_VALUE = 0.2;

const SliderContainer = (props) => {
  const dispatch = useDispatch(); //hook de redux qui permet de dispatcher une action pour mettre à jour l'état global de l'application.
  const { sliderValue, trackMarks } = props; // Le composant SliderContainer prend plusieurs propriétés (props), sliderValue et trackMarks.
  // sliderValue est une valeur numérique représentant la position actuelle du curseur et trackMarks est un tableau d'entiers représentant les positions marquées sur la piste du curseur.
  const [value, setValue] = React.useState(sliderValue ? sliderValue : DEFAULT_VALUE); //hook qui permet de déclarer un état local pour le composant
 
//Rappel thérorique : En React, un composant enfant est un composant React qui est déclaré et utilisé à l'intérieur d'un autre composant parent. 
//Les composants enfants sont des éléments React que l'on peut ajouter à un composant parent pour créer une interface utilisateur complexe.
//Un composant enfant peut recevoir des données du composant parent sous forme de propriétés (props) et les utiliser pour afficher une partie de l'interface utilisateur. 

  const renderChildren = () => {
    dispatch(addFilter(value))
    console.log("les valeurs sélectionnées par l'utilisateur : ", value) // valeur qui nous intéresse (=> [date min, date max])
    return React.Children.map(props.children, (child) => { // la fonction parcourt les éléments enfants de Slider Container
      console.log("éléments retournés par la fonction map : ", child)
      if (!!child && child.type === Slider) { // l'expression !!child permet de vérifier si la variable child est définie et non nulle. Si c'est le cas, !!child renvoie true, sinon il renvoie false.
        return React.cloneElement(child, { // Si c'est le cas, on crée un nouveau composant Slider en utilisant la méthode React.cloneElement, qui permet de cloner un élément React et de modifier certaines de ses propriétés.
          onValueChange: setValue, // on passe la fonction setValue en tant que gestionnaire d'événement pour la modification de la valeur du curseur (onValueChange)
          trackMarks, // trackMarks et value sont des propriétés passées au composant SliderContainer
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
//--------------------------------------fin slider------------------------------------------------


export default function Filter() {
  const dispatch = useDispatch();

  let [dist, setDist] = useState(10000);
  const navigation = useNavigation();

  const applyFilter = () => {
    //console.log("apply filter")
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
        <Text style={styles.textFilter}>Distance max jusqu'au point de rendez-vous</Text>
        <View style={styles.dist}>
          <TextInput
            keyboardType="number-pad"
            placeholder='Distance'
            onChangeText={(value) => setDist(value)}
            value={dist}
            style={styles.input}
          />
          <Text style={styles.km}>km</Text>
        </View>
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
    backgroundColor: '#E2E8F3',
    borderRadius: 20,
    borderColor: '#474CCC',
    borderWidth: 2,
    margin: 50,
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
    backgroundColor: '#E2E8F3',
    borderRadius: 20,
    borderColor: '#474CCC',
    borderWidth: 2,
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


