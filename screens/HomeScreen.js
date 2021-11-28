import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//This is just the view containing the homescreen.
export default function App() {
  const navigation = useNavigation();
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
          <TouchableOpacity style={styles.button_container} onPress={()=> navigation.navigate('Create Question', {quiz_id: 0, question_number: 1})}>
            <Text style={styles.button_text}>Make Quiz</Text>
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
    marginTop: 20,
  },
});
