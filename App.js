import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import Constants from 'expo-constants';

// You can import from local files
// import AssetExample from './components/AssetExample';
import ProfSign from './screens/ProfSign'
import LandingScreen from './screens/LandingScreen'
import CreateAccount from './screens/CreateAccount'

// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';

export default function App() {
  return (
    //<ProfSign/>
    //<LandingScreen/>
    <CreateAccount/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#6BC7A6',
  
  },
  activate:{
    height:556,
    marginTop: 20,
    width: "100%",
    borderRadius:20,
    backgroundColor: "white"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
