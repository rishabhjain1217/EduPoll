import React, {Component} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import Constants from 'expo-constants';

// You can import from local files
// import AssetExample from './components/AssetExample';
import ProfSign from './screens/ProfSign'
import LandingScreen from './screens/LandingScreen'
import CreateAccount from './screens/CreateAccount'
import Login from './screens/Login'
import {createStackNavigator} from '@react-navigation/stack'
import { StackRouter } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';

// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';

const RootStack = createStackNavigator();

export default class App extends Component {
  render(){
    return (
      <NavigationContainer headerShown={false}>
        <RootStack.Navigator initialRouteName="Landing"  screenOptions={{headerShown: false}}>
          <RootStack.Screen name="Landing" component={LandingScreen}
          />
          <RootStack.Screen name="Create Account" component={CreateAccount}/>
          <RootStack.Screen name="Login" component={Login}/>        
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
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
