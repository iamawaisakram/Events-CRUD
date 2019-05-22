import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';

//Firebase Configuration
import firebase from '../../components/firebase';

//actions
import { getEvents, setCurrentEvent } from '../../actions/events';
import { clearUser } from '../../actions/user';

//icons
import Icon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

//style
import styles from '../../styles/Home';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRef: firebase
        .database()
        .ref('users')
        .child(firebase.auth().currentUser.uid),
      eventsRef: firebase.database().ref('events'),
      page: 1,
      events: [],
      loading: true
    };
    this.loadEvents();
  }

  componentWillUnmount() {
    this.state.eventsRef.off('child_added');
  }

  async loadEvents() {
    // const email = await AsyncStorage.getItem('email');
    // const password = await AsyncStorage.getItem('password');
    // const userId = await AsyncStorage.getItem('uid');

    // console.log('called......', email, password, userId);

    // this.state.userRef.once('value').then(async data => {
    //   if (data.val() !== null) {
    //     await this.props.getEvents(this.state.page, data.val().token);
    //   }
    // });
    let loadedEvents = [];
    this.state.eventsRef.on('child_added', snap => {
      loadedEvents.push(snap.val());
      this.setState({ events: loadedEvents, loading: false });
    });
  }

  async signOut() {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Signed Out');
      });
    this.props.navigation.navigate('CreateAccount');
  }

  // nextPage() {
  //   this.state.userRef.once('value').then(async data => {
  //     if (data.val() !== null) {
  //       await this.props.getEvents(this.state.page + 1, data.val().token);
  //       await this.setState({ page: this.state.page + 1 });
  //     }
  //   });
  // }

  DisplayEvents(events) {
    const url = 'http://buzzevents.co/public/uploads/';

    return (
      events &&
      events.map((event, i) => {
        const eventValue = event.event;
        const regex = 'appspot.com';
        const urlValue = eventValue.pic.includes(regex);
        return (
          <TouchableOpacity
            key={i}
            style={styles.card}
            onPress={async () => {
              await this.props.setCurrentEvent(eventValue);
              this.props.navigation.navigate('EventDetails');
            }}
          >
            <View style={styles.cardBar}>
              <FastImage
                style={styles.cardLogo}
                source={{ uri: url + eventValue.logo }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View>
                <Text style={styles.cardName}>
                  {eventValue.name.substring(0, 25)}
                </Text>
                <Text style={styles.cardDate}>{eventValue.date_debut}</Text>
              </View>
            </View>
            <FastImage
              style={styles.cardImage}
              source={
                urlValue
                  ? { uri: eventValue.pic }
                  : { uri: url + eventValue.pic }
              }
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.cardDescription}>
              <Text style={styles.cardDescriptionText}>
                {eventValue.description.substring(0, 100)}...
              </Text>
            </View>
          </TouchableOpacity>
        );
      })
    );
  }
  render() {
    // const { currentPage, lastPage } = this.props;
    // let loadMore = false;
    // if (currentPage && lastPage) {
    //   loadMore = this.props.currentPage < this.props.lastPage;
    // }
    return (
      <View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
        >
          <View style={styles.topBar}>
            <Text style={styles.barTitle}>Events</Text>
            {/* <TouchableOpacity
              style={styles.refereshEvents}
              onPress={() => this.referesh()}
            >
              {this.state.loading ? (
                <Progress.CircleSnail
                  // style={styles.loading}
                  color={['white']}
                />
              ) : (
                <IonIcon name="ios-refresh" size={40} color="#fff" />
              )}
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.addEvent}
              onPress={() => this.props.navigation.navigate('EventCreate')}
            >
              <Icon name="plussquare" size={40} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={() => {
                this.signOut();
              }}
            >
              <Text style={styles.signoutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
          {this.state.loading ? (
            <Progress.CircleSnail
              style={styles.loading}
              color={['red', 'green', 'blue']}
            />
          ) : (
            <View style={styles.cardListing}>
              {this.state.events[0] && this.DisplayEvents(this.state.events)}
              {/* {loadMore && (
                <TouchableOpacity
                  style={styles.loadMoreButton}
                  onPress={() => this.nextPage()}
                >
                  <Text style={styles.loadMoreText}>Load More</Text>
                </TouchableOpacity>
              )} */}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ events, user }) => {
  return {
    token: events.token,
    loading: events.loading,
    user: user.currentUser,
    events: events.events,
    currentPage: events.currentPage,
    lastPage: events.lastPage
  };
};

const mapDispatchToProps = dispatch => ({
  getEvents: (page, token) => dispatch(getEvents(page, token)),
  clearUser: () => dispatch(clearUser()),
  setCurrentEvent: event => dispatch(setCurrentEvent(event))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
