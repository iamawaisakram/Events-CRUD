import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import md5 from 'md5';
import AsyncStorage from '@react-native-community/async-storage';

//Component
import Login from './components/Login';
import Signup from './components/Signup';

//Firebase Configuration
import firebase from '../../components/firebase';

//action
import { setToken, setRegisterToken } from '../../actions/events';
import { setUser } from '../../actions/user';

//style
import styles from '../../styles/CreateAccount';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: true,
      signupModal: false,
      email: '',
      password: '',
      confirmPassword: '',
      errors: [],
      loading: false,
      usersRef: firebase.database().ref('users')
    };
  }

  showSignup = () =>
    this.setState({
      email: '',
      password: '',
      confirmPassword: '',
      signupModal: true,
      loginModal: false
    });

  showLogin = () =>
    this.setState({
      email: '',
      password: '',
      confirmPassword: '',
      signupModal: false,
      loginModal: true
    });

  isFormValidLogin = (email, password) => email && password;

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: 'Fill in All Fields' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: 'Password is not valid!' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      //Form Valid
      return true;
    }
  };

  isPasswordValid = ({ password, confirmPassword }) => {
    if (password.length < 6 || confirmPassword.length < 6) {
      return false;
    } else if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ email, password, confirmPassword }) => {
    return !email.length || !password.length || !confirmPassword.length;
  };

  handleLoginSubmit = async () => {
    const { email, password } = this.state;
    if (this.isFormValidLogin(email, password)) {
      this.setState({ errors: [], loading: true });
      try {
        await AsyncStorage.setItem('email', `${email}`);
        await AsyncStorage.setItem('password', `${password}`);
      } catch (e) {
        // saving error
      }

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async signedInUSer => {
          await this.props.setUser(signedInUSer);
          await this.props.setToken(
            `${email}`,
            `${password}`,
            signedInUSer.user.uid
          );
          if (this.props.token !== null) {
            this.props.navigation.navigate('Home');
          }
        })

        .catch(err => {
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    } else {
      alert('Kindly Fill in all the fields!');
    }
  };

  handleSignupSubmit = async () => {
    const { email, password } = this.state;
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      try {
        await AsyncStorage.setItem('email', `${email}`);
        await AsyncStorage.setItem('password', `${password}`);
      } catch (e) {
        // saving error
      }
      await this.props.setRegisterToken(`${email}`, `${password}`);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          createdUser.user
            .updateProfile({
              displayName: this.state.email.split('@')[0],
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?=identicon`
            })
            .then(() => {
              this.saveUser(createdUser).then(async () => {
                await this.props.setUser(firebase.auth().currentUser);
                this.setState({ loading: false });
                this.props.navigation.navigate('Home');
              });
            })
            .catch(err => {
              console.log(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
            });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    } else {
      alert('Kindly Fill in all the fields!');
    }
  };

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
      token: this.props.token
    });
  };

  updateToken() {
    this.state.user.child(firebase.auth().currentUser.uid).update({
      token: this.props.token
    });
  }

  handleTextChange = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    const {
      loginModal,
      signupModal,
      email,
      password,
      confirmPassword,
      loading
    } = this.state;
    return (
      <View style={styles.container}>
        <FastImage
          source={require('../../assets/bgImage.png')}
          style={styles.bgImage}
          resizeMode={FastImage.resizeMode.cover}
        >
          {loginModal && (
            <View style={styles.accountContainer}>
              <Login
                showSignup={this.showSignup}
                handleTextChange={this.handleTextChange}
                email={email}
                password={password}
                loading={loading}
              />
              {!loading && (
                <FastImage
                  source={require('../../assets/loginBtn.png')}
                  style={styles.loginBtn}
                  resizeMode={FastImage.resizeMode.contain}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleLoginSubmit}
                  />
                </FastImage>
              )}
            </View>
          )}
          {signupModal && (
            <View style={styles.accountContainer}>
              <Signup
                showLogin={this.showLogin}
                handleTextChange={this.handleTextChange}
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                loading={loading}
              />

              {!loading && (
                <FastImage
                  source={require('../../assets/signUpBtn.png')}
                  style={styles.loginBtn}
                  resizeMode={FastImage.resizeMode.contain}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleSignupSubmit}
                    loading={loading}
                  />
                </FastImage>
              )}
            </View>
          )}
        </FastImage>
      </View>
    );
  }
}

const mapStateToProps = ({ events, user }) => {
  return {
    token: events.token,
    user: user.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setToken: (email, password, userId) =>
    dispatch(setToken(email, password, userId)),
  setRegisterToken: (email, password) =>
    dispatch(setRegisterToken(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccount);
