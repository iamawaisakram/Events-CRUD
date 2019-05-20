import { StyleSheet, Dimensions, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  scrollView: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#fff'
  },
  loading: {
    marginTop: hp('45%')
  },
  calenderView: {
    width: wp('100%'),
    height: hp('60%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  calender: {},
  calenderDone: {
    width: wp('25%'),
    height: hp('6%'),
    backgroundColor: '#209EF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('5%')
  },
  doneText: {
    color: '#fff',
    fontSize: wp('3%')
  },
  topBar: {
    width: wp('100%'),
    height: hp('13%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#209EF5',
    justifyContent: 'space-evenly'
  },
  barText: {
    color: '#fff',
    fontSize: wp('5%'),
    top: hp('1%')
  },
  goBack: {
    position: 'absolute',
    top: hp('4%'),
    left: wp('5%'),
    width: wp('15%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  more: {
    position: 'absolute',
    top: hp('4%'),
    right: wp('5%'),
    width: wp('15%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadImagesView: {
    width: wp('100%'),
    height: hp('25%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderBottomRightRadius: wp('5%'),
    borderBottomLeftRadius: wp('5%'),
    ...Platform.select({
      ios: {
        shadowOffset: { width: 3, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5
      },
      android: {
        elevation: 3
      }
    })
  },
  uploadImages: {
    width: wp('40%'),
    height: hp('22%'),
    margin: 5
  },
  uploadMore: {
    width: wp('40%'),
    height: hp('22%'),
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectCategory: {
    width: wp('95%'),
    height: hp('11%'),
    margin: hp('1%')
  },
  descriptionOverview: {
    width: wp('95%'),
    height: hp('15%'),
    margin: hp('1%'),
    marginBottom: hp('5%')
  },
  submitButtonView: {
    width: wp('95%'),
    height: hp('11%'),
    margin: hp('1%'),
    marginBottom: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryText: {
    color: '#000',
    fontSize: wp('3.5%')
  },
  input: {
    width: wp('93%'),
    height: hp('7%')
  },
  descriptionInput: {
    width: wp('93%'),
    height: hp('12%')
  },
  fieldButton: {
    marginTop: 10,
    width: wp('95%'),
    backgroundColor: '#fff',
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('3%'),
    borderWidth: 1
  },
  descriptionView: {
    marginTop: 10,
    width: wp('95%'),
    backgroundColor: '#fff',
    height: hp('13%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('3%'),
    borderWidth: 1
  },
  submitButton: {
    marginTop: 10,
    width: wp('45%'),
    backgroundColor: '#FF9900',
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('6%')
  },
  optionContainerStyle: {
    backgroundColor: '#fff'
  },
  cancelStyle: {
    backgroundColor: '#209EF5'
  },
  cancelTextStyle: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold'
  },
  sectionTextStyle: {
    color: '#209EF5',
    fontSize: wp('3%')
  },
  categorieChoice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  categorieChoiceIcon: {
    width: wp('20%')
  },
  categorieChoiceText: {
    width: wp('60%')
  },
  overlayStyle: {
    backgroundColor: '#fff',
    width: wp('80%'),
    borderWidth: 0,
    borderColor: 'transparent'
  },
  touchableStyle: {
    borderWidth: 0,
    borderColor: 'transparent'
  },
  selectTextStyle: {
    color: '#000',
    fontSize: wp('3%'),
    fontWeight: 'bold'
  },
  categorieChoice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  categorieChoiceIcon: {
    width: wp('20%')
  },
  categorieChoiceText: {
    width: wp('60%')
  },
  scheduleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: wp('95%'),
    backgroundColor: '#fff',
    height: hp('7%')
  },
  startinput: {
    width: wp('40%'),
    borderWidth: 1,
    height: hp('7%'),
    borderRadius: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  shecduleText: {
    width: wp('10%'),
    fontSize: wp('6%'),
    height: hp('4%'),
    textAlign: 'center',
    color: '#000'
  },
  endinput: {
    width: wp('40%'),
    borderWidth: 1,
    height: hp('7%'),
    borderRadius: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center'
  }
});
