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

//Firebase Configuration
import firebase from '../../components/firebase';

//actions
import { getEvents } from '../../actions/events';
import { clearUser } from '../../actions/user';

//icons
import Icon from 'react-native-vector-icons/AntDesign';

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
      eventsRef: firebase.database().ref('events')
    };
  }

  componentDidMount() {
    this.state.userRef.once('value').then(async data => {
      if (data.val() !== null) {
        await this.props.getEvents(2, data.val().token);
      }
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

  DisplayEvents(events) {
    const url = 'http://buzzevents.co/public/uploads/';
    return (
      events &&
      events.map((event, i) => {
        return (
          <TouchableOpacity key={i} style={styles.card}>
            <View style={styles.cardBar}>
              <FastImage
                style={styles.cardLogo}
                source={{ uri: url + event.logo }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View>
                <Text style={styles.cardName}>{event.name}</Text>
                <Text style={styles.cardDate}>{event.date_debut}</Text>
              </View>
            </View>
            <FastImage
              style={styles.cardImage}
              source={{ uri: url + event.pic }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.cardDescription}>
              <Text style={styles.cardDescriptionText}>
                {event.description.substring(0, 100)}...
              </Text>
            </View>
          </TouchableOpacity>
        );
      })
    );
  }
  render() {
    return (
      <View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
        >
          {this.props.loading ? (
            <Progress.CircleSnail
              style={styles.loading}
              color={['red', 'green', 'blue']}
            />
          ) : (
            <View style={styles.cardListing}>
              <View style={styles.topBar}>
                <Text style={styles.barTitle}>Events</Text>
                <TouchableOpacity style={styles.addEvent}>
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
              {this.DisplayEvents(this.props.events)}
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
    events: events.events
  };
};

const mapDispatchToProps = dispatch => ({
  getEvents: (page, token) => dispatch(getEvents(page, token)),
  clearUser: () => dispatch(clearUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
