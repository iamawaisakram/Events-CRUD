import { StyleSheet, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    height: hp('103%'),
    width: wp('100%'),
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  bgImage: {
    width: wp('100%'),
    ...Platform.select({
      ios: {
        height: hp('100%')
      },
      android: {
        height: hp('104%')
      }
    })
  },
  accountContainer: {
    width: wp('100%'),
    height: hp('65%'),
    position: 'absolute',
    top: hp('20%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginBgImage: {
    width: wp('100%'),
    height: hp('65%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: wp('65%'),
    borderBottomWidth: 1,
    borderColor: 'grey',
    margin: 10
  },
  button: {
    zIndex: 111111,
    width: wp('30%'),
    height: hp('8.5%'),
    borderRadius: wp('5%')
  },
  loginBtn: {
    width: wp('30%'),
    height: hp('12%'),
    position: 'absolute',
    top: hp('58%'),
    zIndex: 11111,
    alignItems: 'center'
  },
  changeToSignupButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: hp('8%'),
    right: wp('8%'),
    width: wp('35%'),
    height: hp('13%'),
    borderBottomLeftRadius: wp('40%')
  },
  changeToLoginButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: hp('10%'),
    left: wp('8%'),
    width: wp('35%'),
    height: hp('10%'),
    borderBottomLeftRadius: wp('40%')
  }
});
