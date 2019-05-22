import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

//Firebase
import firebase from '../../components/firebase';

//icons
import Icon from 'react-native-vector-icons/AntDesign';

//style
import styles from '../../styles/EventDetails';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      eventRef: firebase.database().ref('events')
    };
  }

  componentDidMount() {
    if (this.props.currentEvent !== null) {
      this.setState({ loading: false });
    }
  }

  async deleteEvent() {
    await this.setState({ loading: true });
    await this.state.eventRef
      .child(this.props.currentEvent.id)
      .remove(async err => {
        if (err !== null) {
          alert(err.message);
          await this.setState({ loading: false });
          return false;
        }
      });
    this.props.navigation.navigate('Home');
  }

  render() {
    const { currentEvent } = this.props;
    const url = 'http://buzzevents.co/public/uploads/';
    return (
      <View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
        >
          <View style={styles.topBar}>
            <Text style={styles.barTitle} />
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => this.props.navigation.navigate('Home')}
            >
              <Icon name="home" size={40} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.update}
              onPress={() => this.props.navigation.navigate('EventUpdate')}
            >
              <Text style={styles.updateText}>Update</Text>
            </TouchableOpacity>
          </View>
          {this.state.loading ? (
            <Progress.CircleSnail
              style={styles.loading}
              color={['red', 'green', 'blue']}
            />
          ) : (
            <View style={styles.cardListing}>
              <FastImage
                style={styles.eventImage}
                source={{ uri: url + currentEvent.pic }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={styles.venueCell}>
                <Text style={styles.cellTitleText}>Title</Text>
                <Text style={styles.cellTitleText}>{currentEvent.name}</Text>
              </View>
              <View style={styles.informationCell}>
                <Text style={styles.cellTitleText}>Starting Date:</Text>
                <Text style={styles.cellText}>{currentEvent.date_debut}</Text>
              </View>
              <View style={styles.informationCell}>
                <Text style={styles.cellTitleText}>Ending Date:</Text>
                <Text style={styles.cellText}>{currentEvent.date_fin}</Text>
              </View>
              <View style={styles.informationCell}>
                <Text style={styles.cellTitleText}>
                  Registration Opening Date:
                </Text>
                <Text style={styles.cellText}>
                  {currentEvent.debut_registration}
                </Text>
              </View>
              <View style={styles.informationCell}>
                <Text style={styles.cellTitleText}>
                  Registration Ending Date:
                </Text>
                <Text style={styles.cellText}>
                  {currentEvent.fin_registration}
                </Text>
              </View>
              <View style={styles.venueCell}>
                <Text style={styles.cellTitleText}>Description</Text>
                <View style={styles.informationCell}>
                  <Text style={styles.cellText}>
                    {currentEvent.description}
                  </Text>
                </View>
              </View>
              <View style={[styles.venueCell, { marginBottom: '8%' }]}>
                <Text style={styles.cellTitleText}>Venue</Text>
                <View style={styles.informationCell}>
                  <Text style={styles.cellTitleText}>Name:</Text>
                  <Text style={styles.cellText}>{currentEvent.place.name}</Text>
                </View>
                <View style={styles.informationCell}>
                  <Text style={styles.cellTitleText}>Address:</Text>
                  <Text style={styles.cellText}>
                    {currentEvent.place.addresse}
                  </Text>
                </View>
                <View style={styles.informationCell}>
                  <Text style={styles.cellTitleText}>Contact:</Text>
                  <Text style={styles.cellText}>{currentEvent.place.tel}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  this.deleteEvent();
                }}
              >
                <Text style={styles.buttonText}>DELETE</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ events, user }) => {
  return {
    user: user.currentUser,
    currentEvent: events.currentEvent
  };
};

export default connect(
  mapStateToProps,
  null
)(EventDetails);
