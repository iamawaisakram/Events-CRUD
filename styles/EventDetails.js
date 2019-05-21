import { StyleSheet, Dimensions, Platform } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

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
        left: wp('25%'),
        bottom: wp('3%')
      },
      android: {
        left: wp('25%'),
        bottom: hp('3.7%')
      }
    })
  },
  goBack: {
    position: 'absolute',

    ...Platform.select({
      ios: {
        left: wp('5%'),
        bottom: wp('1.2%')
      },
      android: {
        left: wp('5%'),
        bottom: hp('3%')
      }
    })
  },
  update: {
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
  updateText: {
    color: '#fff',
    fontSize: wp('4%')
  },
  eventImage: {
    height: hp('25%'),
    width: wp('100%')
  },
  informationCell: {
    width: wp('95%'),
    borderWidth: 1,
    flexDirection: 'row',
    margin: 5,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center'
  },
  venueCell: {
    width: wp('95%'),
    margin: 5,
    alignItems: 'center'
  },
  cellTitleText: {
    padding: 15,
    color: '#000',
    textAlign: 'left',
    fontSize: wp('4.5%'),
    fontWeight: '300'
  },
  cellText: {
    padding: 15,
    color: '#000',
    textAlign: 'left',
    fontSize: wp('3.5%'),
    fontWeight: '300'
  }
});
