import * as React from 'react';
import { Text, View, Button, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import * as firebase from 'firebase';
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//import 'firebase/auth';
import Constants from 'expo-constants';


export default function App() {

  function signUpWithEmailPassword(email, password) {
    //var email = "test@example.com";
    console.log("email: ", email, " password: ", password);
    //var password = "hunter2";
    // [START auth_signup_password]
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
    }
    function print(email, password) {
      console.log("email: ", email, " password: ", password);
    }


  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
     <View style={styles.container}>
      <Image source={require("../assets/student_pic.png")} />
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
          <View style={styles.button_container}>
            <Button title='Create Account' color="white" onPress={()=>{
              signUpWithEmailPassword(email, password)
            }}/>
          </View>
        </View>    
      </View>
    </TouchableWithoutFeedback> 
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