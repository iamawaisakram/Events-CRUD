import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

//Firebase Configuration
import firebase from '../../components/firebase';

//actions
import { setToken, getEvents } from '../../actions/events';
import { clearUser } from '../../actions/user';

//style
import styles from '../../styles/Home';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
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

  render() {
    return (
      <View style={styles.container}>
        <Text> Home </Text>
        <TouchableOpacity
          onPress={() => {
            this.signOut();
          }}
        >
          <Text>SignOut</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ events, user }) => {
  return {
    token: events.token,
    loading: events.loading,
    user: user.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  getEvents: token => dispatch(getEvents(token)),
  clearUser: () => dispatch(clearUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
