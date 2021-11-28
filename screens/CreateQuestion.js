import { RadioButton } from 'react-native-paper';
import firebase from 'firebase'
import * as React from 'react';
import { Text, View, Button, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';


//Using routing to pass the current state between screens, where question number updates every navigate
export default function App({route}) {
  var {quiz_id, question_number} = route.params
  const [value, setValue] = React.useState(1);
  const [a1, setA1] = React.useState('');
  const [a2, setA2] = React.useState('');
  const [a3, setA3] = React.useState('');
  const [a4, setA4] = React.useState('');
  const [question, setQuestion] = React.useState('');
  const [quizID, setQuizID] = React.useState('0');
  const navigation = useNavigation();

  //Reset the state of the input, whose values match these respective states
  function resetInput(){
    setQuestion('')
    setA1('')
    setA2('')
    setA3('')
    setA4('')
  }


  async function saveQuestion(){
    const db = firebase.firestore();
    
    //Generate quiz id (0-999999) until an open one is found, unless the quiz ID has already been chosen
    //This is very scalable should we need more, though it is not the most efficient
    while(true){
      if(quiz_id == 0){
        quiz_id = String(parseInt(Math.random()*1000000))
        setQuizID(quiz_id)
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
      correct_array: value,
      question_array: question,
      answer_array: [a1,a2,a3,a4]
    }
    db.collection('quizzes').doc(quiz_id).collection('questions').doc(String(question_number)).set(data)
  }

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
         value={question}
         />
      </View>
        <View style={styles.activate}>

        <View style={styles.rdButton}>
          <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <View style={{flexDirection:"row", alignItems: 'center', marginTop: '5%'}}>
              <RadioButton style={{justifyContent: 'flex-start',}} value={1} /> 
              <TextInput id="first answer" style={{justifyContent: 'flex-end', textAlign: "center"}} placeholder="Enter Answer for First Option" keyboardType="default"
              onChangeText={text => setA1(text)}
              value={a1}
              />
            </View>
            
            <View style={{flexDirection:"row", alignItems: 'center', marginTop: '5%'}}>
              <RadioButton style={{justifyContent: 'flex-start',}} value={2} /> 
              <TextInput id="second question" style={{justifyContent: 'flex-end', textAlign: "center"}} placeholder="Enter Answer for Second Option" keyboardType="default"
              onChangeText={text => setA2(text)}
              value={a2}
              />
            </View>
            <View style={{flexDirection:"row", alignItems: 'center', marginTop: '5%'}}>
              <RadioButton style={{justifyContent: 'flex-start',}} value={3} /> 
              <TextInput id="third question" style={{justifyContent: 'flex-end', textAlign: "center"}} placeholder="Enter Answer for Third Option" keyboardType="default"
              onChangeText={text => setA3(text)}
              value={a3}
              />
            </View>
            <View style={{flexDirection:"row", alignItems: 'center', marginTop: '5%'}}>
              <RadioButton style={{justifyContent: 'flex-start',}} value={4} /> 
              <TextInput id="fourth question" style={{justifyContent: 'flex-end', textAlign: "center"}} placeholder="Enter Answer for Fourth Option" keyboardType="default"
              onChangeText={text => setA4(text)} onValueChange
              value={a4}
              />
            </View>
          </RadioButton.Group>
        </View>
          <TouchableOpacity style={styles.button_container} onPress={()=>{
          saveQuestion();
          resetInput();
          navigation.navigate("Create Question", {quiz_id: quiz_id, question_number: question_number+1})
          }}>
            <Text style={styles.button_text}>Next Question</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button_container} onPress={()=>{
          saveQuestion()
          navigation.navigate('Finish Quiz', {quiz_id: quiz_id, question_number: question_number+1})
          }}>
            <Text style={styles.button_text}>Finish and Save Quiz</Text>
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
  button_text: {
    color: "white",
    fontSize: 18
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
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: '#FFFFFF',
    borderRadius: 57,
    marginBottom: '4%',
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
    marginTop: 10,
  },
});