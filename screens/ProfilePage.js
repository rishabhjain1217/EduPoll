import React from 'react';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, SectionList, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import firebase from 'firebase'


export default function App(){
  const [user_class, setUserClass] = React.useState('');
  const [nickname, setUserNickname] = React.useState('');
  const [quiz_array, setQuizArray] = React.useState([])

  const navigation = useNavigation();
  user = firebase.auth().currentUser
  email = user.email
  const db = firebase.firestore();
  db.collection('users').doc(String(user.uid)).get().then(function(doc) {
    if (doc.exists) {
        setUserClass(doc.get("user_class"))
        setUserNickname(doc.get("user_nickname"))
        //setQuizArray(doc.get('quizzes'))
        console.log("success", user_class)
    } else {
        console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.subtext_bold}>Nickname: </Text>
        <Text style={styles.subtext}>{nickname}</Text>
        <Text style={styles.subtext_bold}>Email: </Text>
        <Text style={styles.subtext}>{email}</Text>
        <Text style={styles.subtext_bold}>User Type: </Text>
        <Text style={styles.subtext}>{user_class == 'student' ? 'Student' : 'Teacher'}</Text>
        <Text style={styles.subtext_bold}>Grades:</Text>
        <SectionList
          style={styles.scroll_screen}
          sections={[
            {data: quiz_array}
          ]}
          renderItem={({item}) => <Text style={styles.subtext}>{item}</Text>}
          keyExtractor={(item, index) => index}
        />
        <TouchableOpacity style={styles.button_container} onPress={()=>{firebase.auth().signOut(); navigation.navigate("Landing")}}>
          <Text style={styles.button_text}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_container} onPress={()=>{}}>
          <Text style={styles.button_text}>Export Student Data</Text>
        </TouchableOpacity>        
      </View>
    ) 
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems:'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F2F2F2',
  
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    alignSelf: 'flex-start',
    paddingTop: '7%',
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
  },
  scroll_screen:{
    alignSelf: "flex-start",
    width: "100%",
  }
});
