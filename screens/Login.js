import React, {Component} from 'react';
import { Text, View, Button, StyleSheet, Image, TextInput, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

var user = null
export default function App() {
  
  const createOneButtonAlert = (errorCode) =>
  {

  var title, subtitle;
  title = "Incorrect Email or Password"
  subtitle = "Please Try Again"

  Alert.alert(
    title,
    subtitle,
    [
      { text: "Try Again", onPress: () => console.log("Trying again") }
    ]
  )
  };

    function signInWithEmailPassword(email, password) {
      print(email, password)
      // [START auth_signin_password]
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          user = userCredential.user;
          console.log("signed in!")
          navigation.navigate('Home Screen')
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log('not signed in')
          createOneButtonAlert(errorCode)
        });
      // [END auth_signin_password]
    }
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const navigation = useNavigation();
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
       <View style={styles.container}>
        <View style={styles.back_arrow_container}>
          <TouchableOpacity style={styles.back_arrow} onPress={()=>{navigation.navigate('Landing')
            console.log("back arrow pressed")
            }}>
            <Image source={require("../assets/back-arrow.png")} />
          </TouchableOpacity>
        </View>
        <Image source={require("../assets/girl_on_laptop.png")} />
        <View style={styles.activate}>
          <Text style={styles.welcome_message}>Log in</Text>
          <TextInput style={styles.text_box} 
          placeholder="student@email.com" 
          keyboardType="email-address"
          onChangeText={email => setEmail(email)}/>
          <TextInput style={styles.text_box} 
          placeholder="Password" 
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}/>  
          <TouchableOpacity style={styles.button_container} onPress={()=>{signInWithEmailPassword(email, password)}}>
              <Text style={styles.button_text}>Login</Text>
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
  button_text: {
    color: "white",
    fontSize: 18
  },
  welcome_message: {
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    paddingTop: '5%',
    paddingBottom: '8%',
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
    height: 61,
    width: 312,
    borderRadius:20,
    backgroundColor: "#399675",
    textAlign: "center",
    justifyContent: "center",
    alignItems: 'center',
    margin: 5,
    marginTop: 10,
  },
});
