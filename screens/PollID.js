import React, {Component} from 'react';
import { Text, View, Button, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, ImageBackground} from 'react-native';
import firebase from 'firebase';

import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';



export default function App(){
      
      const navigation = useNavigation();
    return (

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
        <View style={styles.container}>
          <View style={styles.back_arrow_container}>
            <TouchableOpacity style={styles.back_arrow} 
              onPress={()=>{navigation.navigate('Landing')
              console.log("back arrow pressed")
            }}>
              <Image source={require("../assets/back-arrow.png")} />
            </TouchableOpacity>
          </View>
          <Image style={{zIndex: 1}} source={require("../assets/student_pic.png")} />
          <View style={styles.activate}>
            <Text style={styles.welcome_message}>Enter Poll ID</Text>
            <TextInput 
            style={styles.text_box} 
            placeholder="XXXXXX" 
            keyboardType="default"/>
          </View>
        </View>
      </TouchableWithoutFeedback> 
    );
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#6BC7A6',
  
  },

  back_arrow_container: {
    flex: 1,
    height: 400,
    width: '95%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    zIndex: 10,
  },
  back_arrow: {
    height: '100%',
    width: '100%'
  },
  welcome_message: {
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    paddingTop: '10%',
    paddingBottom: '10%',
    paddingLeft: '15%',
    paddingRight: '15%'
  },
  activate: {
    height: "60%",
    marginTop: 20,
    width: "100%",
    borderRadius:20,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text_box: {
    height: "12.3%",
    width: "80%",
    borderRadius:10,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "grey",
    margin: '2%',
    padding: '3%',

  },
  button_container: {
    height: "12.3%",
    width: "80%",
    borderRadius:20,
    backgroundColor: "#399675",
    textAlign: "center",
    justifyContent: "center",
    margin: 5,
  },
});