import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, FlatList, SafeAreaView, Dimensions,TextInput } from 'react-native';
import res from '../../Helper/index';
import { ButtonComponent } from '../Component/GlobalComponent'
import ApiHelper from '../../Helper/ApiHelper/ApiHelper';
import Icon from 'react-native-vector-icons/FontAwesome';




//https://builderx.io/login
export default class LoginScreen extends React.Component {

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    // SplashScreen.hide();

  }

  constructor(props) {
    super(props);
    this.state={
      mobilenumber: '',
      isSelect:false,
    }

  }

  apicallSendOTP(){

    if (this.state.mobilenumber.length!=10){
      alert(res.strings.invalidMobileNumber)
    } else if (this.state.isSelect==false){
      alert(res.strings.termsAndConditionNotSelected)
    } else {
    
    var params = {
      "mobile":this.state.mobilenumber
    };
    console.log(params);

    new ApiHelper().serviceCallGet(
      params,
      `${res.api.baseUrl}api/send-otp`,
      // `${res.api.baseUrl}api/new-user`,
      (data, err) => {
        if (err) {
          alert(err);
        } else {
          console.log('==================',data);
          {this.onClickLogin()}
        }
      },
    );
    }
  }

  onClickLogin() {
    this.props.navigation.navigate('LudoGamePage');
  }
  onCheckClick(){
    this.setState({isSelect: !this.state.isSelect})
  }

  render() {

    return (
      <SafeAreaView>
        <View style={{ alignItems: 'center', width: Dimensions.get('window').width, height: '100%', paddingLeft: 40, paddingRight: 40 }}>
          {/* <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',alignContent:'center',marginTop:'40%'}}> */}
          <Image
            style={{ width: '100%', height: '50%', alignSelf: 'flex-end' }}
            source={res.ImageAssets.loginMain}
            resizeMode='center'
          />
          <Text style={styles.stTitle}>{res.strings.welcome}</Text>
          <Text style={styles.stSubTitle}>{res.strings.mobileNumberInfo}</Text>
          <View style={{ borderRadius: 10, borderColor: res.color.midGrayColor, height: 50, borderWidth: 0.5, width: '100%', marginTop: 40, alignItems:'flex-start', justifyContent:'center' }}>
            <TextInput style={{marginStart:5}} placeholder='Enter Mobile Number' onChangeText={(text)=>{this.setState({mobilenumber:text})}}>
            </TextInput>
          </View>
          <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', padding:18, }}>
            <TouchableOpacity
              style={{height:30,width:30,backgroundColor:res.color.lighGrayColor,}}
              onPress={()=>{this.onCheckClick()}}
            >
              {this.state.isSelect === false ? <Icon name="check-circle-o" size={25} color={res.color.lightGrayColor} /> :
              <Icon name="check-circle" size={25} color={res.color.greenColor} />}
            </TouchableOpacity>
            
            <Text>I agree to Term & Conditions.</Text>
          </View>


          {/* </View> */}
          {/* <Text style={styles.stCopyRight}>Copyright 2021 USP Medicare All Right Reserveds</Text> */}
          <ButtonComponent title={res.strings.sendOTP} onPressButton={() => { this.onClickLogin() }} />
        </View>

      </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  stTitle: { color: res.color.blueColor, fontFamily: res.font.boldFont, fontSize: 20, textAlign: 'center' },
  stSubTitle: { color: res.color.midGrayColor, fontFamily: res.font.ragularFont, fontSize: 15, textAlign: 'center', marginTop: 15 },
  stSkip: { color: res.color.midGrayColor, fontFamily: res.font.ragularFont, fontSize: 17, textAlign: 'center' },
  stCopyRight: { color: res.color.midGrayColor, fontFamily: res.font.ragularFont, fontSize: 10, marginBottom: 30 }
});