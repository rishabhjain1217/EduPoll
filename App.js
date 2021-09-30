import React, {Component} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import * as firebase from 'firebase'
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

const firebaseConfig = {
  apiKey: "AIzaSyCqDR3uYSrLogtMvojmGm2S_UokXhW08jI",
  authDomain: "edupoll.firebaseapp.com",
  projectId: "edupoll",
  storageBucket: "edupoll.appspot.com",
  messagingSenderId: "1088830263060",
  appId: "1:1088830263060:web:847f5bc36cdea0bc9ebc01",
  measurementId: "G-7910S9FKPM"
};
if(firebase.apps.length == 0) {
firebase.initializeApp(firebaseConfig);
}
// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';

const RootStack = createStackNavigator();

export default class App extends Component {
  function storeQuizScore(userID, score){
    //writes score to database
    console.log("hi")
    firebase.database().ref('users/'+userID).set(
      {
        highscore: score
      }
    )
  }
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
