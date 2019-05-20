import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

//Firebase
import firebase from '../../components/firebase';

//Actions
import { setUser, clearUser } from '../../actions/user';

//style
import styles from '../../styles/SplashScreen';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0)
    };
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        // this.props.navigation.navigate('TabBar');
      } else {
        this.props.navigation.navigate('CreateAccount');
        this.props.clearUser();
      }
    });
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: -250,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  render() {
    const animationStyles = {
      transform: [
        {
          translateY: this.state.animation
        }
      ]
    };
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.image, animationStyles]}>
          <FastImage
            source={require('../../assets/event.png')}
            style={[styles.image]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Animated.View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  clearUser: () => dispatch(clearUser()),
  setUser: user => dispatch(setUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(SplashScreen);
