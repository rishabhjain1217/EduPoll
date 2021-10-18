import firebase from 'firebase'
import * as React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function App({route}) {
  //State variables
  var {quiz_id, question_number, current_score} = route.params
  const [correct, setCorrect] = React.useState(1);
  const [quizSize, setQuizSize] = React.useState(0);
  const [a1, setA1] = React.useState('');
  const [a2, setA2] = React.useState('');
  const [a3, setA3] = React.useState('');
  const [a4, setA4] = React.useState('');
  const [question, setQuestion] = React.useState('');
  const navigation = useNavigation();
  const db = firebase.firestore();

  //Promise that returns the questions collection
  //We should consolidate these to cut down on the number of queries
  db.collection('quizzes').doc(String(quiz_id)).collection('questions').get()
  .then(snap => {
    setQuizSize(snap.size)
  })
  .catch((e) => console.error(e))

  //Promise that will return the document corresponding to the question number
  //Need to add error detection to see if the question is empty or doesn't exist
  db.collection('quizzes').doc(quiz_id).collection('questions').doc(String(question_number)).get()
  .then(documentSnapshot => {
    setQuestion(documentSnapshot.data().question_array)
    setA1(documentSnapshot.data().answer_array[0])
    setA2(documentSnapshot.data().answer_array[1])
    setA3(documentSnapshot.data().answer_array[2])
    setA4(documentSnapshot.data().answer_array[3])
    setCorrect(documentSnapshot.data().correct_array)
  })
  .catch((e) => console.error(e))

  //Handles the input when a button is pressed, see if the number of the button corresponds to the correct answer
  //Pushes user results to the next screen using route and pushes to the database if it is the last question.
  function handleInput(button_num){
    const db = firebase.firestore();
    if(button_num == correct){
      current_score = current_score +1
    }
    if(question_number != quizSize){
      navigation.navigate('Answer Question',{quiz_id: quiz_id, question_number: question_number+1, current_score: current_score})
    }else{
      console.log('Should go back to home screen')
      db.collection('users').doc(String(firebase.auth().currentUser.uid)).collection('quizzes').doc(String(quiz_id)).set({
        score: current_score,
      }).catch((e) => {console.error(e)})
      console.log('should have saved score')
      navigation.navigate('Complete Quiz', {score: current_score, number_of_questions: quizSize})
    }
  }
  
  //View for the questions
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
     <View style={styles.container}>
      <View style={styles.top_container}>
        <Text style={styles.top_message}>Question #{question_number}</Text>
      </View>
      <View style={styles.question_container}>
        <Text style={styles.top_message}>{question}</Text>
      </View>
        <View style={styles.activate}>  
        <TouchableOpacity style={styles.button_container} onPress={()=> handleInput(1)}>
          <Text style={styles.button_text}>{a1}</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.button_container} onPress={()=> handleInput(2)}>
          <Text style={styles.button_text}>{a2}</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.button_container} onPress={()=> handleInput(3)}>
          <Text style={styles.button_text}>{a3}</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.button_container} onPress={()=> handleInput(4)}>
          <Text style={styles.button_text}>{a4}</Text>
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