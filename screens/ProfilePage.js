import React from 'react';
import * as Sharing from 'expo-sharing'
import XLSX from 'xlsx'
import * as FileSystem from 'expo-file-system'
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
        console.log("success", user_class)
    } else {
        console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

  db.collection('users').doc(String(user.uid)).collection('quizzes').get().then(function(snap) {
    snap.docs.forEach((doc) => {
      str = String(doc.id + ':       '+doc.data().score)
      if(!quiz_array.includes(str)){
        var current_doc  = quiz_array.slice()
        current_doc.push(str)
        setQuizArray(current_doc)
        console.log('Shouldve added '+str)
      }
    })
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
  async function export_student_data(){
    var teacher_query = db.collection("quizzes").where("owner", "==", user.uid);
    var export_list = [];
    var stud_obj_list = [];
    var doc_list = [];
    try{
      var teacher_snapshot = await teacher_query.get()
      var quiz_snapshot = await db.collection("users").where("user_class", "==", "student").get()
      for(var student of quiz_snapshot.docs){
        var student_obj = {'Name' : student.id};
        var quizzes = await student.ref.collection('quizzes').get()
        for(var quiz of quizzes.docs) {
          student_obj[quiz.id] = quiz.data()["score"]
        }
        stud_obj_list.push(student_obj)
      }
      
      teacher_quiz_ids = [];
      for(var quiz of teacher_snapshot.docs){
        teacher_quiz_ids.push(quiz.id)
        for(var student of stud_obj_list){
          if(!Object.keys(student).includes(quiz.id)){
            student[quiz.id] = 'N/A'
          }
        }
      }
      for(var student of stud_obj_list){
        for(var attr of Object.keys(student)){
          if(attr != 'Name' && !teacher_quiz_ids.includes(attr)){
            console.log('Should have deleted: '+attr+" from "+student.Name)
            delete student[attr];
          }
        }
      }
      console.log(stud_obj_list)
    }catch{

    }
    var worksheet = XLSX.utils.json_to_sheet(stud_obj_list)
    var workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grades")

    const workbook_out = XLSX.write(workbook, {
      type: 'base64',
      bookType: 'xlsx'
    })
    const uri = FileSystem.cacheDirectory + email + '_grades.xlsx'
    await FileSystem.writeAsStringAsync(uri, workbook_out, {
      encoding: FileSystem.EncodingType.Base64
    })
    await Sharing.shareAsync(uri)
  }
  
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
            {data: (user_class == "student" ? quiz_array : ["Teachers Cannot Take Quizzes"])}
          ]}
          renderItem={({item}) => <Text style={styles.subtext}>{item}</Text>}
          keyExtractor={(item, index) => index}
        />
        <TouchableOpacity style={styles.button_container} onPress={()=>{firebase.auth().signOut(); navigation.navigate("Landing")}}>
          <Text style={styles.button_text}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_container} onPress={()=>{
          if(user_class == "teacher"){
            export_student_data();
          }
        }}>
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
