import React, {Component} from 'react';
import { Text, View, Button, StyleSheet, Image, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function App({route}){
    var {quiz_id, question_number} = route.params
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <Image source={require("../assets/book_logo.png")} marginTop="15%"/>
        <Text style={styles.welcome_message}>Your Unique Quiz ID is:</Text>
        <Text style={styles.id_text} selectable={true}> {quiz_id} </Text>
        <Text style={styles.help_text}>Make sure you write it down for use later!{'\n'}You can also copy it if you'd like!</Text>
        <TouchableOpacity style={styles.button_container} onPress={()=> navigation.navigate('Home Screen')}>
          <Text style={styles.button_text}>Ok!</Text>
        </TouchableOpacity>  
      </View>
    ) 
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F2F2F2',
  
  },
  welcome_message: {
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    paddingTop: '10%',
  },
  help_text: {
    fontWeight: 'normal',
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: '5%',
    paddingBottom: '15%',
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
  id_text: {
      fontWeight: 'bold',
      fontSize: 55,
      textAlign: 'center',
      justifyContent: 'center',
  },
  button_text: {
    color: "white",
    fontSize: 18
  }
});