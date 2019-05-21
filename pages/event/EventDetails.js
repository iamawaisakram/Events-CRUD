import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';

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

  componentDidMount() {}

  render() {
    return (
      <View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
        >
          {this.state.loading ? (
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
                <TouchableOpacity style={styles.signOutButton}>
                  <Text style={styles.signoutText}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default EventDetails;
