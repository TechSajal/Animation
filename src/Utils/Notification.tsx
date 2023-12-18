import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging"
import notifee, { AndroidStyle } from '@notifee/react-native';
import { Alert } from "react-native";
import { Navigation } from "react-native-navigation";
async function GetFCMToken(){
    let Token = await AsyncStorage.getItem("token")
    console.log(Token,"old Token")
    if(!Token){
        try{
            const Token = await messaging().getToken()
            if(Token){
                console.log(Token,"new Token")
                await AsyncStorage.setItem("token",Token)
            } 
        }catch(error){
          console.log(error,"error in token")
        }
    }
 
}

  const foregroundNotifee = async(body: any,title: any,image:string) =>{
    console.log(image)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      body:body,
      title:title,
      android: {
        channelId,
        style:{
          type:AndroidStyle.BIGPICTURE,picture:image
        },
        
      // smallIcon: 'https://media.glassdoor.com/lst2x/4774749/primathon-1666237454316.png', // optional, defaults to 'ic_launcher'.
        pressAction: {
          id: 'default',
        },
      },
      
    });
  
  }

  export const NotificationListener = () =>{
    GetFCMToken()
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        )
      })
     
  

      messaging().onMessage(async remoteMessage =>{
        Alert.alert("notification on foreground state ...........",JSON.stringify(remoteMessage))
        foregroundNotifee(remoteMessage.notification?.body,remoteMessage.notification?.title,remoteMessage.notification?.android?.imageUrl)
      })
}
  
