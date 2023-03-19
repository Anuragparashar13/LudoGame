/*

Concept: https://dribbble.com/shots/5476562-Forgot-Password-Verification/attachments

*/
import { Animated, Image, SafeAreaView, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import res from '../../Helper/index';
import { ButtonComponent } from './GlobalComponent'
import ApiHelper from '../../Helper/ApiHelper/ApiHelper'


import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useNavigation } from '@react-navigation/native';
import { globalVariables } from '../../Helper/Constant';



const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 6;
const source = {
    uri:
        'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            useNativeDriver: false,
            toValue: isFocused ? 1 : 0,
            duration: 250,
        }),
        Animated.spring(animationsScale[index], {
            useNativeDriver: false,
            toValue: hasValue ? 0 : 1,
            duration: hasValue ? 300 : 250,
        }),
    ]).start();
};


const AnimatedExample = (props) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [propsp, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const navigation = useNavigation()

   function apicallSendOTP(){
    
        var params = {
          "mobile": props.route.params.mobilenumber,
          "otp": value
        };
        console.log(params);
    
        new ApiHelper().serviceCallGet(
          params,
          `${res.api.baseUrl}api/login`,
          (data, err) => {
            if (err) {
              alert(err);
            } else {
                if (data.errors)
                {
                    alert(data.errors)
                }
                else{
                    MoveToHome()
                    console.log('====================',data);
                    globalVariables.token = data.access_token
                }
                console.log(data);
              
            }
          },
        );
      }

      function apicallResendOTP(){
    
        var params = {
          "mobile": props.route.params.mobilenumber,
        };
        console.log(params);
    
        new ApiHelper().serviceCallGet(
          params,
          `${res.api.baseUrl}api/send-otp`,
          (data, err) => {
            if (err) {
              alert(err);
            } else {
                if (data.errors)
                {
                    alert(data.errors)
                }
                else{
                  
                }
                console.log(data);
              
            }
          },
        );
      }


    const renderCell = ({ index, symbol, isFocused }) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                })
                : animationsColor[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        };

        // Run animation on next event loop tik
        // Because we need first return new style prop and then animate this value
        setTimeout(() => {
            animateCell({ hasValue, index, isFocused });
        }, 0);



        return (
            <AnimatedText
                key={index}
                style={[styles.cell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };
    const MoveToHome = () => {
        navigation.navigate('Instruction')
    };


    return (

        <View style={{ alignItems: 'center', width: Dimensions.get('window').width, height: '100%', paddingLeft: 40, paddingRight: 40 }}>
            {/* <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',alignContent:'center',marginTop:'40%'}}> */}
            <Image
                style={{ width: '100%', height: '50%', alignSelf: 'flex-end' }}
                source={res.ImageAssets.loginMain}
                resizeMode='center'
            />
            <Text style={styles.stTitle}>{res.strings.welcome}</Text>
            <Text style={styles.stSubTitle}>{res.strings.mobileNumberInfo}</Text>
         <View >
            <CodeField
                ref={ref}
                {...propsp}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
            />
            </View>
            {/* <View style={{ width: '100%', marginTop: 20 }}>
                <TouchableOpacity style={styles.btnContainer} onPress={MoveToHome}>
                    <Text style={styles.btnText}>verify OTP</Text>
                </TouchableOpacity>
                <></>
            </View> */}
            <ButtonComponent title={res.strings.verifyOTP} onPressButton={apicallSendOTP} />
            <View style={{ width: '100%', height: 40, marginTop: 50, justifyContent: 'center', flexDirection: 'row' }}>
                <Text style={{ fontSize: 14, color: res.color.midGrayColor }}> Didn't recieve OTP ?</Text>
                <TouchableOpacity
                    style={{}}
                    onPress={()=>{apicallResendOTP()}}
                >
                    <Text style={{ fontSize: 14, fontWeight: '700', color: res.color.lightGreenColor }}>Resend</Text>
                </TouchableOpacity>
            </View>
        </View>




    );
};

export default AnimatedExample;


export const CELL_SIZE = 40;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const styles = StyleSheet.create({
    codeFiledRoot: {
        height: CELL_SIZE,
        marginTop: 30,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    cell: {
        marginHorizontal: 8,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 5,
        fontSize: 30,
        textAlign: 'center',
        borderRadius: CELL_BORDER_RADIUS,
        color: '#3759b8',
        backgroundColor: '#fff',

        // IOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        // Android
        elevation: 3,
    },

    // =======================

    root: {
        minHeight: 800,
        padding: 20,
    },
    title: {
        paddingTop: 50,
        color: '#000',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        paddingBottom: 40,
    },
    icon: {
        width: 217 / 2.4,
        height: 158 / 2.4,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    subTitle: {
        paddingTop: 30,
        color: '#000',
        textAlign: 'center',
    },
    nextButton: {
        marginTop: 30,
        borderRadius: 60,
        height: 60,
        backgroundColor: '#3557b7',
        justifyContent: 'center',
        minWidth: 300,
        marginBottom: 100,
    },
    nextButtonText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
    },
    stTitle: { color: res.color.blueColor, fontFamily: res.font.boldFont, fontSize: 20, textAlign: 'center' },
    stSubTitle: { color: res.color.midGrayColor, fontFamily: res.font.ragularFont, fontSize: 15, textAlign: 'center', marginTop: 15 },
    stSkip: { color: res.color.midGrayColor, fontFamily: res.font.ragularFont, fontSize: 17, textAlign: 'center' },
    stCopyRight: { color: res.color.midGrayColor, fontFamily: res.font.ragularFont, fontSize: 10, marginBottom: 30 },
    btnContainer: { backgroundColor: res.color.blueColor, borderRadius: 7, height: 50, alignItems: 'center', justifyContent: 'center' },
    btnText: { color: res.color.whilteColor, fontFamily: res.font.ragularFont, fontSize: 15, textAlign: 'center', },
});