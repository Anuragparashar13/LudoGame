import * as React from 'react';
import { Button, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import LanguageSelection from '../../screen/AppScreens/LanguageSelection'
// import ScrollableModal from '../../screens/FilterScreens/Filter';
import res from '../index';
import SplashScreen from '../../screen/AppScreens/SplashScreen';
import LoginScreen from '../../screen/AppScreens/LoginScreen';
import LudoGamePage from '../../screen/Game/LudoGamePage'
// import OTPScreen from '../../screens/OTPScreen';
// import AddUserMain from '../../screens/AddUserMain';
// import Userlist from '../../screens/Userlist';
// import UserDetails from '../../screens/UserDetails'
// import AddfamilyUser from '../../screens/AddfamilyUser';
// import Dashboard from '../../screens/Dashboard';
// import OTPField from '../../screens/Component/OTPField'
// import Instruction from '../../screens/Instruction';

const Stack = createStackNavigator();

export default function NavClass() {
  // const navigation = useNavigation();
  return(
    
    <Stack.Navigator
    screenOptions={{
      headerBackImage: () => <BackImage />,
      headerBackTitleVisible: false,
      gesturesEnabled: false,
      headerStyle: {backgroundColor: res.color.liteblue}
    }} >
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false}} />
      <Stack.Screen name="LanguageSelection" component={LanguageSelection} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LudoGamePage" component={LudoGamePage} options={{ headerShown: false }} />
      
      {/* <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ headerShown: true, }} />
      <Stack.Screen name="OTPField" component={OTPField} options={{ headerShown: true, }} />
      <Stack.Screen name="AddfamilyUser" component={AddfamilyUser} options={{ headerShown: true}} />
      <Stack.Screen name="AddUserMain" component={AddUserMain} options={{ headerShown: true}} />
      <Stack.Screen name="Userlist" component={Userlist} options={{ headerShown: true, }} />
      <Stack.Screen name="UserDetails" component={UserDetails} options={{ headerShown: true, }} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: true, headerBackImage: () => null, }} />
      
      <Stack.Screen name="Instruction" component={Instruction} options={{ headerShown: false, stackPresentation: 'modal', gestureEnabled: false }}/> */}
      
    </Stack.Navigator>

    

  );
}


export const BackImage = ({isWhite}) => (

  <Image style={{margin:10}} source={ isWhite ? res.ImageAssets.backButtonWhite : res.ImageAssets.backButton} />
);

export const FilterButton = ({onpress}) => (
  <TouchableOpacity onPress = {()=>{onpress}}>
      {/* <Image style={{margin:10}} source={ isWhite ? res.ImageAssets.backButtonWhite : res.ImageAssets.backButton} /> */}
      <Text>Filter</Text>
  </TouchableOpacity>
);
