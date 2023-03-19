
import React, {Component, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  View,
  Alert,
} from 'react-native';
import res from '../../Helper/index';
import Modal from "react-native-modal";


export const ButtonComponent = ({title, name, type, onPressButton}) => (
    <View style={{width:'100%',marginTop:20}}>
      <TouchableOpacity style={styles.btnContainer} onPress={()=>{onPressButton()}}>
             <Text style={styles.btnText}>{title}</Text>
         </TouchableOpacity>
    </View>
  );

  export const PickerInput = ({value, onPressPicker, type, onChange, name, iconColor='black',Height}) => {
    const [backgroundColor,setbackgroundColor]=useState('')
    // <TouchableOpacity onPress={() => {onPressPicker(true)}}>
    //    <View style={{ height:(Height===undefined?40:Height), width:'90%', borderBottomColor: res.color.genralBtnTxtColor , borderBottomWidth:0.8, marginTop:5,flexDirection:'row' , justifyContent:'space-between' , alignItems:'center'}}>
    // <Text style={{alignSelf:'center', fontSize:16, fontWeight:'400', paddingStart:10,color:'#000'}} >{value}</Text>
    // </View>
    // </TouchableOpacity>
    return (
    <TouchableOpacity onPress={() => {onPressPicker(true)}}>
    <View style={styles.container}>
    <Text style={{paddingBottom:10}}>{name}</Text>
    <Text style={[styles.textinputStyle,{width:'90%',borderBottomWidth:1,borderColor:'black'}]} >{value}</Text>
    {/* <TextInput
      style={[styles.textinputStyle,{width:'90%',borderBottomWidth:1,borderColor:backgroundColor}]}
      value={value}
      editable={false}
      onBlur={ () => setbackgroundColor('#000') }
      onFocus={ () => setbackgroundColor(res.color.liteyellow)}
      placeholder={value}
      maxLength={value === res.strings.mobileno ? 8 : null}
      keyboardType={value === res.strings.mobileno ? 'phone-pad' : value === res.strings.firstName ? 'name-phone-pad' : value === res.strings.lastName ? 'name-phone-pad' : 'default'}
      secureTextEntry={value === res.strings.password ? true : value === res.strings.confirmPassword ? true : false}
      onChangeText={(text) => value === res.strings.mobileno ? text === '1' ? '' : text === '2' ? '' : text === '3' ? '' : text === '4' ? '' : text === '0' ? '' : onChange({value, type, text})
      : onChange({value, type, text})}
    /> */}
  </View>
  </TouchableOpacity>
  )
  };


  export const PickerViewComponent = ({isShow, arrShow, onClosePicker, keyShow, onChange, iconColor='black',onSearchPicker,isSearchEnabled=false}) => {
    const [searchText, setSearchText] = React.useState("");

    return(
    console.log('========----',arrShow),
    <Modal
    testID={'modal'}
    isVisible={isShow}
    hasBackdrop={true}
    searchable={true}
    onBackdropPress={()=>{onClosePicker(false)}}
    style={{
     
      alignItems:'center',
      justifyContent:'center'
    }}>
      {/* <TouchableOpacity 
            style={{width:'80%',justifyContent:'center',alignItems:'center' ,backgroundColor:'red'}} 
            activeOpacity={1} 
            onPress={() => {onClosePicker(false)}}
          > */}
     {/* <View style={{
        backgroundColor: 'red',
        maxHeight: '80%',
        Width:'80%',
      }}> */}
                      
                       <View style={{backgroundColor:'white',maxHeight:'80%',width:'80%'}}>
                       {/* <Text style={{}}>Anurag</Text> */}
                      
                       <FlatList 
                       style={{width:'100%'}}
                       data={arrShow}
                      //  renderItem={renderPickerItem}
                       renderItem={({ item, index }) => renderPickerItem(item, index, keyShow, onClosePicker)}
                       keyExtractor={item => item.id}
                       />
                       </View>
  {/* </View> */}
  {/* </TouchableOpacity> */}
  </Modal>
  );}

  const renderPickerItem = ( item, index, keyShow, onClosePicker ) => { 
    const newShow = item[keyShow]
     return (
       <TouchableOpacity onPress={()=>{onClosePicker(false, item)}}>
         <View  numberOfLines={4}>
           <Text style={{fontSize:20,padding:10,color:'#000',fontWeight:'bold',borderBottomWidth:.5}}>{newShow}</Text>
         </View>
         </TouchableOpacity>
     )
   }



  var styles = StyleSheet.create({
    btnContainer: {backgroundColor:res.color.liteblue, borderRadius:7,height:50,alignItems:'center',justifyContent:'center' },
    btnText: {color:'black',  fontSize: 15, textAlign:'center' },
    container: {
      // flexDirection: 'row',
      justifyContent: 'flex-start',
      // alignItems: 'center',
      width:'90%',borderBottomWidth:1,borderColor:'black',
  
      padding:8
    },
    
    
  });