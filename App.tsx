import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import MapCreate from './screens/MapCreate';
import RacesScreen from './screens/RacesScreen';
import SignUpScreen from './screens/SignUpScreen'
import SignInScreen from './screens/SignInScreen'
import ChatScreen from './screens/ChatScreen'
import CreateRace from './screens/CreateRace'
import MonCompte from './screens/MonCompte'
import SnapScreen from './screens/SnapScreen'
import JoinRaceScreen from './screens/JoinRaceScreen'
import Racecardtest from './components/Racecard'
import Participants from './components/Participants'
import Filter from './screens/Filter'

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import race from './reducers/race';
import filter from './reducers/filter';

const store = configureStore({
  reducer: { user, race, filter },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Map') {
          iconName = 'location-arrow';
        } else if (route.name === 'Courses') {
          iconName = 'running';
        } else if (route.name === 'Chat') {
          iconName = 'comment';
        }

        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#474CCC',
      tabBarInactiveTintColor: '#335561',
      headerShown: false,
    })}>
      <Tab.Screen name="Courses" component={RacesScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      {/* <Tab.Screen name="Chat" component={ChatScreen} /> */}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="CreateRace" component={CreateRace} />
          <Stack.Screen name="MapCreate" component={MapCreate} />
          <Stack.Screen name="Racecard" component={Racecardtest} />
          <Stack.Screen name="SnapScreen" component={SnapScreen} />
          <Stack.Screen name="Participants" component={Participants} />
          <Stack.Screen name="JoinRaceScreen" component={JoinRaceScreen} />
          <Stack.Screen name="MonCompte" component={MonCompte} />
          <Stack.Screen name="Filter" component={Filter} />
      
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}








