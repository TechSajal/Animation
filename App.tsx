import React, { useEffect } from "react";
import Mystack from "./Stack";
import messaging from "@react-native-firebase/messaging"
import { Navigation } from 'react-native-navigation';
import { StackActions } from "@react-navigation/native";

const handleNotification = (notification,navigation) => {
  // Extract data from the notification payload
  const { screenToOpen } = notification.data;

  // Use navigation to open the desired screen
  if (screenToOpen === 'Navigation') {
    const pushAction = StackActions.push('Navigation');
    navigation.dispatch(pushAction);
  }
};
const App = ({navigation}) =>{
  useEffect(()=>{
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.data,
        );
      }
    });
  },[])

  useEffect(()=>{
    const uns = messaging().onMessage(async remoteMessage =>{
      handleNotification(remoteMessage,navigation)
    })
     return () => uns();
  },[])
  return(
    <Mystack/>
  )
}

export default App;