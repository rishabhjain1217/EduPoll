import React, {Component} from 'react';
import { Text, View, Button, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import firebase from 'firebase'


export default function App(){
  const navigation = useNavigation();
  user = firebase.auth().currentUser
  email = user.email
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.subtext_bold}>User Email: </Text>
        <Text style={styles.subtext}>{email}</Text>
        <Text style={styles.subtext_bold}>User Classes: </Text>
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
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    alignSelf: 'flex-start',
    paddingTop: '10%',
    paddingLeft: '5%',
  },
  subtext:{
    fontSize: 18,
    alignSelf: 'flex-start',
    paddingTop: '1%',
    paddingLeft: '5%',
  },
  subtext_bold:{
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'flex-start',
    paddingTop: '5%',
    paddingLeft: '5%',
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
    height: "8%",
    width: "80%",
    borderRadius:20,
    backgroundColor: "#399675",
    textAlign: "center",
    justifyContent: "center",
    alignItems: 'center',
    margin: 5,
  },
  button_text: {
    color: "white",
    fontSize: 18
  }
});
