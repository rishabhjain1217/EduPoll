// You can import from local files
//import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card, RadioButton } from 'react-native-paper';
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


import * as React from 'react';
import { Text, View, Button, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';

import Constants from 'expo-constants';

export default function App() {
  const [checked, setChecked] = React.useState('first');
  const [value, setValue] = React.useState('first');


  return (
    

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
     <View style={styles.container}>
      <View style={styles.top_container}>
        <Text style={styles.top_message}>Quiz Creation</Text>
      </View>
      <View style={styles.question_container}>
        <TextInput style={styles.top_message} placeholder="Enter Question"></TextInput>
      </View>
        <View style={styles.activate}>

        <View style={styles.rdButton}>
          <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <View style={{flexDirection:"row", alignItems: 'center', marginTop: '5%'}}>
              <RadioButton style={{justifyContent: 'flex-start',}} value="first" /> 
              <TextInput style={{justifyContent: 'flex-end', textAlign: "center"}} placeholder="Enter Answer for First Option" keyboardType="default"/>
            </View>
            
            <View style={{flexDirection:"row", alignItems: 'center', marginTop: '5%'}}>
              <RadioButton style={{justifyContent: 'flex-start',}} value="second" /> 
              <TextInput style={{justifyContent: 'flex-end', textAlign: "center"}} placeholder="Enter Answer for Second Option" keyboardType="default"/>
            </View>
            <View style={{flexDirection:"row", alignItems: 'center', marginTop: '5%'}}>
              <RadioButton style={{justifyContent: 'flex-start',}} value="third" /> 
              <TextInput style={{justifyContent: 'flex-end', textAlign: "center"}} placeholder="Enter Answer for Third Option" keyboardType="default"/>
            </View>
            <View style={{flexDirection:"row", alignItems: 'center', marginTop: '5%'}}>
              <RadioButton style={{justifyContent: 'flex-start',}} value="fourth" /> 
              <TextInput style={{justifyContent: 'flex-end', textAlign: "center"}} placeholder="Enter Answer for Fourth Option" keyboardType="default"/>
            </View>
          </RadioButton.Group>
        </View>

          <View style={styles.button_container}>
            <Button title='Next Question' color="white"/>
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
    marginBottom: '8%',
  },
  question_container: {

    width: "80%",
    height: 251,
    // top: 160,
    textAlign: "center",
    justifyContent: "center",

    backgroundColor: '#FFFFFF',
    borderRadius: 57,
    marginBottom: '8%'
    

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
    height: "50%",
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
    marginTop: 20,
  },
});

{/*<RadioButton
            value="first"
            uncheckedColor="#897988"
            color="#123412"
            status={ checked === 'first' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('first')}
          />
          <RadioButton
            value="second"
            status={ checked === 'second' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('second')}
          />
          <RadioButton
            value="third"
            status={ checked === 'third' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('third')}
          />
          <RadioButton
            value="fourth"
            status={ checked === 'fourth' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('fourth')}
          /> 
          <Text style={{justifyContent: 'flex-end', textAlign: "center"}}>Second</Text>

          */}

       {/*<TextInput style={styles.text_box} placeholder="student@email.com" keyboardType="email-address"/>
          <TextInput style={styles.text_box} placeholder="student@email.com" keyboardType="email-address"/>
          <TextInput style={styles.text_box} placeholder="student@email.com" keyboardType="email-address"/>
          <TextInput style={styles.text_box} placeholder="student@email.com" keyboardType="email-address"/> */}
  
