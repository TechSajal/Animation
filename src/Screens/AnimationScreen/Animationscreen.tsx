import {View, Text, TouchableOpacity, Animated, Button} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './styles';
import { useNavigation } from '@react-navigation/native';
const AnimationScreen = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const [btnclicked, setbtnclicked] = useState(false);
  const navigation = useNavigation()
  const startAnimation = () => {
    Animated.timing(animation,{
      toValue: btnclicked ? 0 : 1,
      duration:500,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {borderRadius:btnclicked?50:0},
          {backgroundColor:btnclicked?"red":"red"},
          {
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100],
                }),
              },
              {
                rotate: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
              {
                translateX:animation.interpolate({
                    inputRange:[0,1],
                    outputRange:[0,150]
                 })
              },
              {
                scale:animation.interpolate({
                    inputRange:[0,1],
                    outputRange:[ 1,0.5]
                 })
              }
            ]
          }
        ]}></Animated.View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setbtnclicked(!btnclicked);
          startAnimation();
        }}>
        <Text style={{color: 'white'}}>Start Animation</Text>
      </TouchableOpacity>
      <Button title='Go To Other Screen' onPress={()=>navigation.navigate('Navigation')} />
    </View>
  );
};

export default AnimationScreen;
