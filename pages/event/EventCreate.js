import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';

//Firebase
import firebase from '../../components/firebase';

//icons
import Icon from 'react-native-vector-icons/AntDesign';

//style
import styles from '../../styles/EventDetails';

class EventCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      eventRef: firebase.database().ref('events'),
      storageRef: firebase.storage().ref('images'),
      key: firebase
        .database()
        .ref('events')
        .push().key,
      name: '',
      description: '',
      date_debut: moment(new Date()).format('L'),
      date_fin: moment(new Date()).format('L'),
      debut_registration: moment(new Date()).format('L'),
      fin_registration: moment(new Date()).format('L'),
      placeName: '',
      placeAddress: '',
      placeContact: '',
      date_debut_moment: new Date(),
      date_fin_moment: new Date(),
      debut_registration_moment: new Date(),
      fin_registration_moment: new Date(),
      image: null,
      imageUrl: ''
    };
  }

  setValue(key, value) {
    this.setState({ [key]: value });
  }

  setDate(key, key2, value) {
    this.setState({ [key]: moment(value).format('L'), [key2]: value });
  }

  pickSingle() {
    ImagePicker.openPicker({
      waitAnimationEnd: true,
      includeExif: true,
      forceJpg: true
    })
      .then(image => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          }
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  async uploadImage() {
    const { storageRef, image, key } = this.state;
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    const imagePath = image.uri;
    let uploadBlob = null;
    let mime = 'image/jpg';

    const imageRef = storageRef.child(key);

    fs.readFile(imagePath, 'base64')
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then(async blob => {
        uploadBlob = blob;
        return await imageRef.put(blob, { contentType: mime });
      })
      .then(async () => {
        uploadBlob.close();
        return await imageRef.getDownloadURL();
      })
      .then(async url => {
        await this.state.eventRef
          .child(key)
          .child('event')
          .update({
            pic: url
          });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        adRef.remove();
        Alert.alert(
          'Failure',
          'There seems to be an error while uploading the image!',
          [
            {
              text: 'Cancel',
              // onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            { text: 'OK' }
          ],
          { cancelable: false }
        );
      });
  }

  formValidation() {
    const {
      name,
      description,
      date_debut,
      date_fin,
      debut_registration,
      fin_registration,
      placeName,
      placeAddress,
      placeContact
    } = this.state;

    return name &&
      description &&
      date_debut &&
      date_fin &&
      debut_registration &&
      fin_registration &&
      placeName &&
      placeAddress &&
      placeContact
      ? true
      : false;
  }

  async updateEvent() {
    const {
      name,
      description,
      date_debut,
      date_fin,
      debut_registration,
      fin_registration,
      placeName,
      placeAddress,
      placeContact,
      image,
      key
    } = this.state;

    await this.setState({ loading: true });

    if (image.uri !== undefined) {
      await this.uploadImage();
    }

    if (this.formValidation()) {
      await this.state.eventRef
        .child(key)
        .child('event')
        .update({
          name: name,
          description: description,
          date_debut: date_debut,
          date_fin: date_fin,
          debut_registration: debut_registration,
          fin_registration: fin_registration,
          place: {
            name: placeName,
            addresse: placeAddress,
            tel: placeContact
          }
        })
        .then(() => {
          let timeout = setTimeout(() => {
            this.props.navigation.navigate('Home');
          }, 8000);
        })
        .catch(async err => {
          if (err !== null) {
            alert(err.message);
            await this.setState({ loading: false });
            return false;
          }
        });
    } else {
      alert('Kindly Fill in all values!');
      this.setState({ loading: false });
    }
  }

  async navigateBack() {
    await this.state.eventRef.child(this.state.key).remove();
    this.props.navigation.navigate('Home');
  }

  render() {
    const {
      name,
      description,
      date_debut,
      date_fin,
      debut_registration,
      fin_registration,
      date_debut_moment,
      date_fin_moment,
      debut_registration_moment,
      fin_registration_moment,
      placeName,
      placeAddress,
      placeContact,
      image
    } = this.state;
    return (
      <View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
        >
          <View style={styles.topBar}>
            <Text style={styles.barTitle}>Create Event</Text>
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => this.navigateBack()}
            >
              <Icon name="home" size={40} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.update}
              onPress={() => this.navigateBack()}
            >
              <Text style={styles.updateText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          {this.state.loading ? (
            <Progress.CircleSnail
              style={styles.loading}
              color={['red', 'green', 'blue']}
            />
          ) : (
            <View style={styles.cardListing}>
              {image && (
                <FastImage
                  style={styles.eventImage}
                  source={{
                    uri: image.uri
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              )}
              {!image && (
                <View style={styles.eventImage}>
                  <TouchableOpacity
                    style={styles.changePicture}
                    onPress={() => this.pickSingle()}
                  >
                    <Text>Update Image</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.venueCell}>
                <Text style={styles.cellTitleText}>Title</Text>
                <TextInput
                  style={styles.cellTitleText}
                  value={name}
                  onChangeText={value => this.setValue('name', value)}
                />
              </View>
              <View style={styles.informationCell}>
                <Text style={styles.cellTitleText}>Starting Date:</Text>
                <Text style={styles.cellText}>{date_debut}</Text>
              </View>
              <View style={styles.venueCell}>
                <DatePicker
                  style={styles.cellTitleText}
                  date={date_debut_moment}
                  mode="date"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={date => {
                    this.setDate('date_debut', 'date_debut_moment', date);
                  }}
                />
              </View>

              <View style={styles.informationCell}>
                <Text style={styles.cellTitleText}>Ending Date:</Text>
                <Text style={styles.cellText}>{date_fin}</Text>
              </View>
              <View style={styles.venueCell}>
                <DatePicker
                  style={styles.cellTitleText}
                  date={date_fin_moment}
                  mode="date"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={date => {
                    this.setDate('date_fin', 'date_fin_moment', date);
                  }}
                />
              </View>

              <View style={styles.informationCell}>
                <Text style={styles.cellTitleText}>
                  Registration Opening Date:
                </Text>
                <Text style={styles.cellText}>{debut_registration}</Text>
              </View>
              <View style={styles.venueCell}>
                <DatePicker
                  style={styles.cellTitleText}
                  date={debut_registration_moment}
                  mode="date"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={date => {
                    this.setDate(
                      'debut_registration',
                      'debut_registration_moment',
                      date
                    );
                  }}
                />
              </View>

              <View style={styles.informationCell}>
                <Text style={styles.cellTitleText}>
                  Registration Ending Date:
                </Text>
                <Text style={styles.cellText}>{fin_registration}</Text>
              </View>
              <View style={styles.venueCell}>
                <DatePicker
                  style={styles.cellTitleText}
                  date={fin_registration_moment}
                  mode="date"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={date => {
                    this.setDate(
                      'fin_registration',
                      'fin_registration_moment',
                      date
                    );
                  }}
                />
              </View>

              <View style={styles.venueCell}>
                <Text style={styles.cellTitleText}>Description</Text>
                <View style={styles.informationCell}>
                  <TextInput
                    style={styles.cellText}
                    value={description}
                    multiline={true}
                    onChangeText={value => this.setValue('description', value)}
                  />
                </View>
              </View>
              <View style={[styles.venueCell, { marginBottom: '8%' }]}>
                <Text style={styles.cellTitleText}>Venue</Text>
                <View style={styles.informationCell}>
                  <Text style={styles.cellTitleText}>Name:</Text>
                  <TextInput
                    style={styles.cellText}
                    value={placeName}
                    onChangeText={value => this.setValue('placeName', value)}
                  />
                </View>
                <View style={styles.informationCell}>
                  <Text style={styles.cellTitleText}>Address:</Text>
                  <TextInput
                    style={styles.cellText}
                    value={placeAddress}
                    onChangeText={value => this.setValue('placeAddress', value)}
                  />
                </View>
                <View style={styles.informationCell}>
                  <Text style={styles.cellTitleText}>Contact:</Text>
                  <TextInput
                    style={styles.cellText}
                    value={placeContact}
                    onChangeText={value => this.setValue('placeContact', value)}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => {
                  this.updateEvent();
                }}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default EventCreate;
