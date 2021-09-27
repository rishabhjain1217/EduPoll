import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import Constants from 'expo-constants';


export default function App() {
  return (
     <View style={styles.container}>
        <Image source={require("../assets/book_logo.png")} />
        <Text style={styles.welcome_message} Welcome to EduPoll/>
      <View style={styles.activate}>
      </View>     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F2F2F2',
  
  },
  welcome_message: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  /*activate:{
    height:556,
    marginTop: 20,
    width: "100%",
    borderRadius:20,
    backgroundColor: "#F2F2F2"
  },*/
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
