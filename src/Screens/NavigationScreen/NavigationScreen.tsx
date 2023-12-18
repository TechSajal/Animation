import {View, Text, TextInput, Button, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import {NotificationListener} from '../../Utils/Notification'
const AddData = (email: string,password: string) => {
  firestore().collection('Users').doc(email).set({
    Email:email,
    Password:password
  }).then(()=>{
    console.log('User added!!')
  })
}
 
const NavigationScreen = () => {
  useEffect(()=>{
    NotificationListener()
  },[])

  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  //
  const Auth = (email:string,password:string) => {
    auth()
    .createUserWithEmailAndPassword(email,password)
    .then(() => {
      console.log('User account created & signed in!');
      AddData(email,password)
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    });
  }
  const storeMultiData = async (name: String, companyName: String) => {
    let nameArray = ['name', name];
    let companyNameArray = ['companyName', companyName];
    try {
      await AsyncStorage.multiSet([nameArray, companyNameArray]);
      console.log('Data stored successfully.');
    } catch (error) {
      console.log('Failed to store data:', error);
    }
  };
 

  const retrieveData = async (key1: string,key2: string,) => {
    try {
      const value = await AsyncStorage.multiGet([key1,key2])
      if (value !== null) {
        console.log('Retrieved data:', value);
      } else {
        console.log('Data not found.');
      }
    } catch (error) {
      console.log('Failed to retrieve data:', error);
    }
  };
  // Removing data
  const removeData = async (key: string) => {
    try {
      await AsyncStorage.multiRemove([key]);
      console.log('Data removed successfully.');
    } catch (error) {
      console.log('Failed to remove data:', error);
    }
  };
  return (
    <View>
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        style={{
          margin: 30,
          borderColor: 'grey',
          borderWidth: 0.5,
          color: 'black',
        }}
        placeholder="Write your Email"
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        style={{
          margin: 30,
          borderColor: 'grey',
          borderWidth: 0.5,
          color: 'black',
        }}
        placeholder="Write your password"
      />
      <TouchableOpacity style={{marginHorizontal: 30}}>
        <Button
          color="orange"
          title="Save Information"
          onPress={() => {
           storeMultiData(email,password)
          }}></Button>
      </TouchableOpacity>

      <TouchableOpacity style={{marginHorizontal: 30, marginTop: 30}}>
        <Button
          color="blue"
          onPress={() => retrieveData("name","companyName")}
          title="Get Information"></Button>
      </TouchableOpacity>

      <TouchableOpacity style={{marginTop: 30, marginHorizontal: 30}}>
        <Button
          color="green"
          title="Auth"
          onPress={() => Auth(email,password)}></Button>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationScreen;
