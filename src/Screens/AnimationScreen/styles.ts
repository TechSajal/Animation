import { StyleSheet} from 'react-native'
export const styles = StyleSheet.create({
   container:{
    display:"flex",
     flex:1 ,
     justifyContent:"center",
     alignItems:"center"
   },
   box:{
     width:100,
     height:100,
     backgroundColor:"orange"
   },
   button:{
     marginBottom:50,
     marginTop:50,
     width:200,
     height:50,
     backgroundColor:"black",
     justifyContent:"center",
     alignItems:"center",
     color:"white",
     borderRadius:10
   }
})