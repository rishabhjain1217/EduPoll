import React, {Component} from 'react';
import { Text, View, Button, StyleSheet, Image, TextInput, Alert, TouchableWithoutFeedback, Keyboard, ImageBackground} from 'react-native';
import firebase from 'firebase';

import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';



export default function App(){

    const createOneButtonAlert = (errorCode) =>
    {

      var title, subtitle;
    
    if (errorCode == "auth/weak-password") {
      title = "Weak Password"
      subtitle = "Password must be at least six characters"
    }
    else if (errorCode == "auth/invalid-email") {
      title = "Invalid Email"
      subtitle = "Please enter a valid email address"
    }
    else if (errorCode == "auth/email-already-in-use") {
      title = "Email Already Used"
      subtitle = "Please log in with existing email address or create an account with a new email address"
    }
    else {
      title = "Error"
      subtitle = "Unknown Error"
    }

    Alert.alert(
      title,
      subtitle,
      [
        { text: "Try Again", onPress: () => console.log("Trying again") }
      ]
    )
    };
  
    function signUpWithEmailPassword(email, password_input) {
      //var email = "test@example.com";
      var password = password_input;
      print(email, password)
      // [START auth_signup_password]
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          console.log("signing in!")
          navigation.navigate('Home Screen')
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          //console.log(errorCode)
          var errorMessage = error.message;
          createOneButtonAlert(errorCode);
          //console.log(errorMessage)
        });
      }
      function print(email, password) {
        console.log("email: ", email, " password: ", password);
      }
      var [email, setEmail] = React.useState('');
      var [password, setPassword] = React.useState('');
      
      const navigation = useNavigation();
    return (

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
        <View style={styles.container}>
          <View style={styles.back_arrow_container}>
            <TouchableOpacity style={styles.back_arrow} onPress={()=>{navigation.navigate('Landing')
            console.log("back arrow pressed")
            }}>
              <Image source={require("../assets/back-arrow.png")} />
            </TouchableOpacity>
          </View>
          <Image style={{zIndex: 1}} source={require("../assets/student_pic.png")} />
          <View style={styles.activate}>
            <Text style={styles.welcome_message}>Create Student Account</Text>
            <TextInput 
            style={styles.text_box} 
            placeholder="student@email.com" 
            keyboardType="email-address" 
            onChangeText={email => setEmail(email)}/>
            <TextInput style={styles.text_box} placeholder="Nickname"/>
            <TextInput 
            style={styles.text_box} 
            placeholder="Password" 
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}/>  
            <TouchableOpacity style={styles.button_container} onPress={()=>{signUpWithEmailPassword(email, password)}}>
              <Text style={styles.button_text}>Create Account</Text>
            </TouchableOpacity>
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
    height: 60,
    width: 312,
    borderRadius:20,
    backgroundColor: "#399675",
    textAlign: "center",
    justifyContent: "center",
    alignItems: 'center',
    margin: 5,
    marginTop: 20,
  },
  button_text: {
    color: "white",
    fontSize: 18
  }
});