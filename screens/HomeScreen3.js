import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useEffect } from 'react'


//This is just the view containing the homescreen.
export default function App({route}) {
  var {arr} = route.params
  console.log("arrrrrr", arr)
  const navigation = useNavigation();
  var siit = arr[0]
  siit.delete("0")
  var it = Array.from(siit);

  const [userSelection, setSelection] = React.useState('0');
  const [update, setUpdate] = React.useState(0);
  const [quesAdded, setQuesAdded] = React.useState(0);

  var user = firebase.auth().currentUser.uid

  const listItems = it.map((number) =>
    <Text>{
      <TouchableOpacity style={styles.button_container} onPress={()=> navigation.navigate('Create Question', {quiz_id: 0, question_number: 1, className: number, owner: firebase.auth().currentUser.uid})}>
        <Text style={styles.button_text}>{number}</Text>
      </TouchableOpacity>
    }</Text>
  );

  console.log("BRRRUHHHH", it); //1

    onButtonPress = () => {
      Alert.prompt(
        "Enter Class Name",
        "Enter Class Name for Class Creation",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: password => {setUpdate(1); setSelection(password)}
          }
        ],
        "secure-text"
      );
    };

  function handleClick(){
    onButtonPress()
    console.log("fffffff", userSelection)
  }

  async function saveBlank(val){
    const db = firebase.firestore();
    if(siit.has(val)){
      setQuesAdded(1)
      return;
    }
    
    //Generate quiz id (0-999999) until an open one is found, unless the quiz ID has already been chosen
    //This is very scalable should we need more, though it is not the most efficient
    while(true){
      var quiz_id = 0;
      if(quiz_id == 0){
        quiz_id = String(parseInt(Math.random()*1000000))
      }
      //get the quiz document associated with the potential quiz ID
      const doc_check = await db.collection('quizzes').doc(quiz_id).get()
      if(!doc_check.exists){
        break
      }
      doc_check.catch((e) => {
        console.error(e)
      })
    }
    //Given the question data stored in the state, save the question to firestore
    const data = {
      correct_array: 1,
      question_array: "question",
      answer_array: ["a1","a2","a3","a4"]
    }
    const fieldData = {
      class: userSelection,
      owner: firebase.auth().currentUser.uid
    }
    db.collection('quizzes').doc(quiz_id).collection('questions').doc("1").set(data)
    db.collection('quizzes').doc(quiz_id).set(fieldData)
    setQuesAdded(1)
  }




  useEffect(() => {

    if(update == 1){ 
      console.log("Hello", userSelection)
      saveBlank()
    }
  });


  const isFocused = useIsFocused()

  useEffect(() => {

    if(quesAdded == 1){ 
      console.log("Bye", userSelection)
      navigation.navigate('Home Screen')
    }
  });







  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.top_container}>
          <Text style={styles.top_message}>EDUPOLL CLASSES</Text>
        </View>
        <Image source={require("../assets/home.png")} />
        <View style={styles.activate}>
          <Text style={styles.welcome_message}>Which Class Would You Like!</Text>
          <View>{listItems}</View>
          <TouchableOpacity style={styles.button_container} onPress={()=> handleClick()}>
            <Text style={styles.button_text}>Add Class +</Text>
          </TouchableOpacity> 
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
  top_container: {
    height: 73,
    width: "80%",
    borderRadius:57,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    justifyContent: "center",
    marginTop: '5%',
    marginBottom: '8%',
  },
  top_message: {
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    paddingTop: '10%',
    paddingBottom: '20%',
    paddingLeft: '15%',
    paddingRight: '15%'
  },
  welcome_message: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingTop: '10%',
    paddingBottom: '10%',
    paddingLeft: '15%',
    paddingRight: '15%'
  },
  activate: {
    height: "60%",
    marginTop: 10,
    width: "100%",
    borderRadius:20,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button_text: {
    color: "white",
    fontSize: 18
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
    marginTop: 10,
  },
});
