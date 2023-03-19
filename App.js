//https://reactnavigation.org/docs/tab-based-navigation/

import * as React from 'react';
import { Button, Text, View, Image, StatusBar,Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ImageAssets from './src/Helper/ImageAssets';
import NavClass from './src/Helper/Navigation/NavClass'
import SplashScreen from 'react-native-splash-screen';


// import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
  console.disableYellowBox = true;
  SplashScreen.hide()
  
  return (
    <NavigationContainer>
      
    
    <StatusBar
            translucent={true}
            backgroundColor="rgba(0, 0, 0, 0.1)"
            // background={R.color.grey300}
            barStyle={
              Platform &&
              Platform.select({
                android: 'light-content',
                ios: 'light-content',
              })
            }
          />
          <View >
          
          
          </View>
       
        <NavClass />
        
    </NavigationContainer>
  );
}