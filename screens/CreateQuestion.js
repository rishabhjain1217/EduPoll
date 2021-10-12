// You can import from local files
//import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card, RadioButton } from 'react-native-paper';
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import firebase from 'firebase'


import * as React from 'react';
import { Text, View, Button, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';

import Constants from 'expo-constants';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

//const admin = require('firebase-admin')

/**/


export default function App({route}) {
  var {quiz_id, question_number} = route.params
  const [checked, setChecked] = React.useState('first');
  const [value, setValue] = React.useState('first');
  const [a1, setA1] = React.useState('');
  const [a2, setA2] = React.useState('');
  const [a3, setA3] = React.useState('');
  const [a4, setA4] = React.useState('');
  const [question, setQuestion] = React.useState('');
  const [quizID, setQuizID] = React.useState('0');


  async function saveQuestion(){
    const db = firebase.firestore();
    
    console.log("Firebase app quiz 1234: ")
    while(true){
      if(quiz_id == 0){
        quiz_id = String(parseInt(Math.random()*1000000))
        setQuizID(quiz_id)
      }
      const doc_check = await db.collection('quizzes').doc(quiz_id).get()
      if(!doc_check.exists){
        break
      }
      doc_check.catch((e) => {
        console.error(e)
      })
    }
    const data = {
      correct_array: value,
      question_array: question,
      answer_array: [a1,a2,a3,a4]
    }
    db.collection('quizzes').doc(quiz_id).collection('questions').doc(String(question_number)).set(data)
    

    
  }
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
     <View style={styles.container}>
      <View style={styles.top_container}>
        <Text style={styles.top_message}>Quiz Creation</Text>
      </View>
      <View style={styles.question_container}>
        <TextInput style={styles.top_message}
         placeholder="Enter Question"
         onChangeText={text => setQuestion(text)}
         id="question"
         />
      </View>
        <View style={styles.activate}>

        <View style={styles.rdButton}>
          <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <View style={{flexDirection:"row", alignItems: 'center', marginTop: '5%'}}>
              <RadioButton style={{justifyContent: 'flex-start',}} value="first" /> 
              <TextInput id="first answer" style={{justifyContent: 'flex-end', textAlign: "center"}} placeholder="Enter Answer for First Option" keyboardType="default"
              onChangeText={text => setA1(text)}
              />
            </View>
            
            <View style={{flexDirection:"row", alignItems: 'center', marginTop: '5%'}}>
              <RadioButton style={{justifyContent: 'flex-start',}} value="second" /> 
              <TextInput id="second question" style={{justifyContent: 'flex-end', textAlign: "center"}} placeholder="Enter Answer for Second Option" keyboardType="default"
              onChangeText={text => setA2(text)}
              />
            </View>
            <View style={{flexDirection:"row", alignItems: 'center', marginTop: '5%'}}>
              <RadioButton style={{justifyContent: 'flex-start',}} value="third" /> 
              <TextInput id="third question" style={{justifyContent: 'flex-end', textAlign: "center"}} placeholder="Enter Answer for Third Option" keyboardType="default"
              onChangeText={text => setA3(text)}
              />
            </View>
            <View style={{flexDirection:"row", alignItems: 'center', marginTop: '5%'}}>
              <RadioButton style={{justifyContent: 'flex-start',}} value="fourth" /> 
              <TextInput id="fourth question" style={{justifyContent: 'flex-end', textAlign: "center"}} placeholder="Enter Answer for Fourth Option" keyboardType="default"
              onChangeText={text => setA4(text)}
              />
            </View>
          </RadioButton.Group>
        </View>

          <View style={styles.button_container}>
            <Button title='Next Question' color="white" onPress={()=>{
              saveQuestion()
              /*getElementById('question').reset()
              getElementById('first answer').reset()
              getElementById('second answer').reset()
              getElementById('third answer').reset()
              getElementById('fourth answer').reset()*/
              navigation.navigate("Create Question", {quiz_id: quiz_id, question_number: question_number+1})
            }}/>
          </View>
          <View style={styles.button_container}>
            <Button title='Finish and Save Quiz' color="white" onPress={()=>{
              saveQuestion()
              navigation.navigate('Home Screen')
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
  top_container: {
    height: 73,
    width: "80%",
    borderRadius:57,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    justifyContent: "center",
    marginTop: '5%',
    marginBottom: '5%',
  },
  question_container: {

    width: "80%",
    height: 200,
    // top: 160,
    textAlign: "center",
    justifyContent: "center",

    backgroundColor: '#FFFFFF',
    borderRadius: 57,
    marginBottom: '4%'
    

    /*height: 73,
    width: "80%",
    borderRadius:57,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    justifyContent: "center",
    marginTop: '5%',
    marginBottom: '8%',*/
    
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
  rdButton: {
    width: '100%',
    height: '60%',
    borderRadius: 20,
    borderWidth: 3,  
  },
  individualButton: {
    justifyContent: 'flex-end',
    alignItems:'center',
    width: '100%',
    height: '40%',
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
    marginTop: 10,
  },
});