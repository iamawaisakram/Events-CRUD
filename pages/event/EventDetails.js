import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

//icons
import Icon from 'react-native-vector-icons/AntDesign';

//style
import styles from '../../styles/EventDetails';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    if (this.props.currentEvent !== null) {
      this.setState({ loading: false });
    }
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
            <Text style={styles.barTitle}>
              {currentEvent ? currentEvent.name.substring(0, 25) : 'Event'}
            </Text>
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrowleft" size={40} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.update}>
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
    currentEvent: events.currentEvent
  };
};

export default connect(
  mapStateToProps,
  null
)(EventDetails);
