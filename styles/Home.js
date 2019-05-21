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
  cardListing: {
    alignItems: 'center'
  },
  topBar: {
    height: hp('12%'),
    width: wp('100%'),
    backgroundColor: '#D2A94E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  barTitle: {
    color: '#fff',
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    position: 'absolute',

    ...Platform.select({
      ios: {
        left: wp('5%'),
        bottom: wp('3%')
      },
      android: {
        left: wp('5%'),
        bottom: hp('3.5%')
      }
    })
  },
  refereshEvents: {
    position: 'absolute',

    ...Platform.select({
      ios: {
        right: wp('45%'),
        bottom: wp('1.2%')
      },
      android: {
        right: wp('45%'),
        bottom: hp('3%')
      }
    })
  },
  addEvent: {
    position: 'absolute',

    ...Platform.select({
      ios: {
        right: wp('32%'),
        bottom: wp('1.2%')
      },
      android: {
        right: wp('32%'),
        bottom: hp('3%')
      }
    })
  },
  signOutButton: {
    width: wp('25%'),
    height: hp('5%'),
    backgroundColor: '#46381C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('3%'),
    position: 'absolute',

    ...Platform.select({
      ios: {
        right: wp('5%'),
        bottom: wp('2%')
      },
      android: {
        right: wp('5%'),
        bottom: hp('3.5%')
      }
    })
  },
  signoutText: {
    color: '#fff',
    fontSize: wp('4%')
  },
  card: {
    width: wp('90%'),
    height: hp('48%'),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    marginTop: hp('3%'),
    marginBottom: hp('3%')
  },
  cardBar: {
    height: hp('8%'),
    width: wp('90%'),
    alignItems: 'center',
    flexDirection: 'row'
  },
  cardLogo: {
    height: hp('6%'),
    width: hp('6%'),
    borderRadius: hp('3%'),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    marginLeft: wp('3%')
  },
  cardName: {
    color: '#D2A94E',
    fontSize: wp('4%'),
    marginLeft: wp('5%'),
    fontWeight: 'bold'
  },
  cardDate: {
    color: '#B4AEB5',
    fontSize: wp('3%'),
    marginLeft: wp('5%')
  },
  cardImage: {
    height: hp('27%'),
    width: wp('90%'),
    justifyContent: 'center'
  },
  cardDescription: {
    height: hp('13%'),
    width: wp('90%'),
    justifyContent: 'center'
  },
  cardDescriptionText: {
    color: '#000',
    fontSize: wp('3%'),
    marginLeft: wp('5%'),
    textAlign: 'left',
    width: wp('80%')
  }
});
