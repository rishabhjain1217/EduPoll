import * as React from 'react';
import { Text, View, Button, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Constants from 'expo-constants';
import * as firebase from 'firebase' 

//this is just a test function 
export default function App() {
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
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
     <View style={styles.container}>
      <Image source={require("../assets/girl_on_laptop.png")} />
        <View style={styles.activate}>
          <Text style={styles.welcome_message}>Log in</Text>
          <TextInput style={styles.text_box} placeholder="student@email.com" keyboardType="email-address"/>
          <TextInput style={styles.text_box} placeholder="Password" secureTextEntry={true}/>  
          <View style={styles.button_container}>
            <Button title='Login' color="white" onPress={()=>{
              storeQuizScore("TestingUser1", 860)
            }}>
              </Button>
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