import * as React from 'react';
import { Text, View, Button, StyleSheet, Image, TextInput} from 'react-native';

import Constants from 'expo-constants';


export default function App() {
  return (
     <View style={styles.container}>
      <Image source={require("../assets/student_pic.png")} />
      <View style={styles.activate}>
      </View>     
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#6BC7A6',
  
  },
  activate: {
    height: "65%",
    marginTop: 20,
    width: "100%",
    borderRadius:20,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  text_box: {
    
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