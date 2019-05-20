import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';

//Firebase Configuration
import firebase from '../../components/firebase';

//actions
import { getEvents } from '../../actions/events';
import { clearUser } from '../../actions/user';

//style
import styles from '../../styles/Home';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRef: firebase
        .database()
        .ref('users')
        .child(firebase.auth().currentUser.uid)
    };
  }

  componentDidMount() {
    this.state.userRef.once('value').then(async data => {
      if (data.val() !== null) {
        console.log('called to check the user data.......', data.val().token);
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

  render() {
    return (
      <View style={styles.container}>
        {this.props.loading ? (
          <Progress.CircleSnail color={['red', 'green', 'blue']} />
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.signOut();
            }}
          >
            <Text>SignOut</Text>
          </TouchableOpacity>
        )}
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
  getEvents: (page, token) => dispatch(getEvents(page, token)),
  clearUser: () => dispatch(clearUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
