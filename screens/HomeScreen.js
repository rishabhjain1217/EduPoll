import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, Button} from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase';

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect } from 'react'

//This is just the view containing the homescreen.
export default function App() {
  const [classSet, setClassSet] = React.useState(new Set());
  const [update, setUpdate] = React.useState(0);

  const navigation = useNavigation();

  async function foo() {
    console.log("start")
    const db = firebase.firestore();
    var currUser = firebase.auth().currentUser.uid
    console.log(currUser)

    var quizClasses = new Set();

    var quiz = db.collection("quizzes").where("owner", "==", currUser);
    try {
        var allQuizSnapShot = await quiz.get();
        allQuizSnapShot.forEach(doc => {
            console.log(doc.id, '----=>', doc.get("class"));
            quizClasses.add(doc.get("class"));
            console.log("for Each run", quizClasses)
            //setClassSet(quizClasses => [...quizClasses, doc.get("class")]);
        });
        setClassSet(classSet => [...classSet, quizClasses]);
        //useEffect(() => console.log(classSet), [classSet])
        console.log("endinnnngggg")
        //return
    }
    catch (err) {
        console.log('Error getting documents', err);
    }
    setUpdate(1)
    //useEffect(() => {if(classSet) setUpdate(1), [classSet]})
    return
  }

  async function handleChange(){
    await foo()
 
  }

  useEffect(() => {if(update == 1) navigation.navigate('HS3', {arr: classSet}), [update, classSet]})


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.top_container}>
          <Text style={styles.top_message}>EDUPOLL HOME</Text>
        </View>
        <Image source={require("../assets/home.png")} />
        <View style={styles.activate}>
          <Text style={styles.welcome_message}>Welcome to our App!</Text>
          <TouchableOpacity style={styles.button_container} onPress={()=> navigation.navigate('Poll ID')}>
            <Text style={styles.button_text}>Take Quiz</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.button_container} onPress={() => handleChange()}>
            <Text style={styles.button_text}>Classes</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.button_container} onPress={()=> navigation.navigate('Create Question', {quiz_id: 0, question_number: 1, className: "General"})}>
            <Text style={styles.button_text}>Make Quiz</Text>
          </TouchableOpacity>
        </View>   
      </View>
    </TouchableWithoutFeedback> 
  )
}



const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
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
    height: "50%",
    marginTop: 10,
    width: "100%",
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
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
