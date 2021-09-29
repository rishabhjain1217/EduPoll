import React, {Component} from 'react';
import { Text, View, Button, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';

import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class CreateAccount extends Component{
  render(){
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.back_arrow} onPress={()=>this.props.navigation.navigate('Landing')}>
            <Image source={require("../assets/back-arrow.png")} />
          </TouchableOpacity>
          <Image source={require("../assets/student_pic.png")} />
          <View style={styles.activate}>
            <Text style={styles.welcome_message}>Create Student Account</Text>
            <TextInput style={styles.text_box} placeholder="student@email.com" keyboardType="email-address"/>
            <TextInput style={styles.text_box} placeholder="Nickname"/>
            <TextInput style={styles.text_box} placeholder="Password" secureTextEntry={true}/>  
            <View style={styles.button_container}>
              <Button title='Create Account' color="white"/>
            </View>
          </View>    
        </View>
      </TouchableWithoutFeedback> 
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#6BC7A6',
  
  },
  back_arrow: {
    position: 'absolute',
    bottom: -30,
    right: 120,
  },
  welcome_message: {
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    paddingTop: '10%',
    paddingBottom: '20%',
    paddingLeft: '15%',
    paddingRight: '15%'
  },
  activate: {
    height: "65%",
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