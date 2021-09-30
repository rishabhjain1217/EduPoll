import React, {Component} from 'react';
import { Text, View, Button, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Constants from 'expo-constants';
import * as firebase from 'firebase'

import { TouchableOpacity } from 'react-native-gesture-handler';


export default class Login extends Component {
  function signInWithEmailPassword() {
    var email = "test@example.com";
    var password = "hunter2";
    // [START auth_signin_password]
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("signed in!")
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('not signed in')
      });
    // [END auth_signin_password]
  }



  function storeQuizScore(userID, score){
    //writes score to database
    console.log("hi")
    firebase.database().ref('users/'+userID).set(
      {
       oldhighscore: score - 100,
       newhighscore: score
       
      }
    )
  }
  render(){
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
       <View style={styles.container}>
        <View style={styles.back_arrow_container}>
          <TouchableOpacity style={styles.back_arrow} onPress={()=>{this.props.navigation.navigate('Landing')
            console.log("back arrow pressed")
            }}>
            <Image source={require("../assets/back-arrow.png")} />
          </TouchableOpacity>
        </View>
        <Image source={require("../assets/girl_on_laptop.png")} />
        <View style={styles.activate}>
          <Text style={styles.welcome_message}>Log in</Text>
          <TextInput style={styles.text_box} placeholder="student@email.com" keyboardType="email-address"/>
          <TextInput style={styles.text_box} placeholder="Password" secureTextEntry={true}/>  
          <View style={styles.button_container}>
            <Button title='Login' color="white" onPress={()=>{
              signInWithEmailPassword()
            }}>
              </Button>
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
    paddingBottom: '20%',
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