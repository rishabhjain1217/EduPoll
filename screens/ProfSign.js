import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import Constants from 'expo-constants';


export default function App() {
  return (
     <View style={styles.container}>
      <Image source={require("../assets/prof.png")} />
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
