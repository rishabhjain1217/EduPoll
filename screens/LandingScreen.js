import * as React from 'react';
import { Text, View, Button, StyleSheet, Image, } from 'react-native';

import Constants from 'expo-constants';


export default function App() {
  return (
     <View style={styles.container}>
        <Image source={require("../assets/book_logo.png")} marginTop="15%"/>
        <Text style={styles.welcome_message}>Welcome to EduPoll</Text>
        <Text style={styles.help_text}>You can use this app to answer real-time questions that your teachers will ask!</Text>
        <View style={styles.button_container}>
          <Button title="Create Account" color="white"/>
        </View>
        <View style={styles.button_container}>
          <Button title='Log In' color="white"/>
        </View>
      <View style={styles.activate}>
      </View>     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F2F2F2',
  
  },
  welcome_message: {
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    paddingTop: '10%',
  },
  help_text: {
    fontWeight: 'normal',
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: '5%',
    paddingBottom: '15%',
  },
  button_container: {
    height: "8%",
    width: "80%",
    borderRadius:20,
    backgroundColor: "#399675",
    textAlign: "center",
    justifyContent: "center",
    margin: 5,
  },
});
