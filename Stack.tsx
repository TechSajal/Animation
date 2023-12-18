import React from "react";
import {NavigationContainer} from '@react-navigation/native'
import AnimationScreen from "./src/Screens/AnimationScreen/Animationscreen";
import NavigationScreen from "./src/Screens/NavigationScreen/NavigationScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const stack = createNativeStackNavigator()
const Mystack = () =>{
    return(
        <NavigationContainer>
            <stack.Navigator>
           <stack.Screen
             name ="Animation"
             component={AnimationScreen}
           />
           <stack.Screen
             name ="Navigation"
             component={NavigationScreen}
           />
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Mystack;