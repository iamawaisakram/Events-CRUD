import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';

//Firebase Configuration
import firebase from '../../../components/firebase';

//Icon
import Icon from 'react-native-vector-icons/FontAwesome';

//style
import styles from '../../../styles/CreateAccount';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <FastImage
        source={require('../../../assets/LoginBg.png')}
        style={styles.loginBgImage}
        resizeMode={FastImage.resizeMode.contain}
      >
        <TouchableOpacity
          style={styles.changeToSignupButton}
          onPress={this.props.showSignup}
        />
        {this.props.loading ? (
          <Progress.CircleSnail color={['red', 'green', 'blue']} />
        ) : (
          <View>
            <TextInput
              style={styles.input}
              value={this.props.email}
              onChangeText={value =>
                this.props.handleTextChange('email', value)
              }
              placeholder="Email Address"
            />
            <TextInput
              style={styles.input}
              value={this.props.password}
              onChangeText={value =>
                this.props.handleTextChange('password', value)
              }
              placeholder="Password"
            />
          </View>
        )}
      </FastImage>
    );
  }
}

export default Login;
