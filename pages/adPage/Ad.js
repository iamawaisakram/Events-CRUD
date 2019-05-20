import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';

//Components
import categories from './components/Category';
import TimeModal from './components/TimeModal';

//Firebase
import firebase from '../../components/firebase';

//icons
import AIcon from 'react-native-vector-icons/AntDesign';
import FeIcon from 'react-native-vector-icons/Feather';

//style
import styles from '../../styles/UploadAd';

class Ad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {
        key: 0,
        label: 'Vehicles'
      },
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      modal: false,
      setDate: '',
      totalFiles: 0,
      selected: [],
      hasPermission: false,
      title: '',
      price: '',
      description: '',
      image: null,
      images: [],
      databaseRef: firebase.database().ref('ads'),
      storageRef: firebase.storage().ref('ads'),
      loading: false,
      errors: []
    };
  }

  setCategory = (key, label) => {
    this.setState({ category: { key: key, label: label } });
  };

  setDate = value => {
    this.state.setDate === 'startDate'
      ? this.setState({ startDate: value })
      : this.setState({ endDate: value });
  };

  openModal = dateToSet => {
    this.setState({ modal: true, setDate: dateToSet });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  saveValues(key, value) {
    this.setState({ [key]: value });
  }

  async pickMultiple() {
    await ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      maxFiles: 8
    })
      .then(images => {
        images.map(i => {
          console.log('received image', i);
          if (this.state.images.length < 8) {
            this.setState({
              images: [
                ...this.state.images,
                {
                  uri: i.path,
                  width: i.width,
                  height: i.height,
                  mime: i.mime
                }
              ]
            });
          } else {
            //Show Alert of only 8 images allowed
            Alert.alert(
              'Images Limit',
              'Maximum 8 images are allowed!',
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
          }
        });
      })
      .catch(e => console.log('Error', e));
  }

  adPosted() {
    Alert.alert(
      'Ad Posted',
      'Congratulations! Your Ad has been Posted',
      [
        {
          text: 'Cancel',
          onPress: () => this.props.navigation.goBack(),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.props.navigation.goBack() }
      ],
      { cancelable: false }
    );
  }

  formEmpty() {
    const { title, price, description, images } = this.state;
    if (
      title.length > 5 &&
      price.length > 1 &&
      description.length > 5 &&
      images.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  async submit() {
    const {
      title,
      price,
      description,
      startDate,
      endDate,
      databaseRef
    } = this.state;

    if (this.formEmpty()) {
      this.setState({ loading: true });
      const key = await databaseRef
        .child(firebase.auth().currentUser.uid)
        .push().key;
      const adRef = await databaseRef
        .child(firebase.auth().currentUser.uid)
        .child(key);

      await adRef.update({
        title: title,
        price: price,
        description: description,
        startDate: startDate,
        endDate: endDate
      });

      await this.uploadImages(adRef);
    } else {
      Alert.alert(
        'Failure',
        'Kindly fill all the provided fields as well as upload images!',
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
    }
  }

  async uploadImages(adRef) {
    const { storageRef, images } = this.state;
    this.setState({ loading: true });
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    await adRef.update({ images: [] });
    let imagesNumber = 0;
    await images.map((image, i) => {
      console.log('received image', i);

      const imagePath = image.uri;
      let uploadBlob = null;
      let mime = 'image/jpg';
      const imageRef = storageRef.child(
        `${firebase.auth().currentUser.uid}:` + `${i}`
      );

      fs.readFile(imagePath, 'base64')
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then(async url => {
          let adImages = {};
          adImages[i] = url;
          adRef.child('images').update({ ...adImages });
          imagesNumber += 1;
          if (imagesNumber === images.length) {
            this.adPosted();
            this.props.navigation.navigate('TabBar');
          }
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
    });
  }

  render() {
    const {
      title,
      price,
      description,
      images,
      startDate,
      endDate,
      modal,
      setDate,
      loading
    } = this.state;
    return (
      <View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
        >
          {loading ? (
            <Progress.CircleSnail
              color={'#209EF5'}
              size={60}
              style={styles.loading}
              indeterminate={true}
            />
          ) : (
            <View>
              <View style={styles.topBar}>
                <TouchableOpacity style={styles.goBack}>
                  <AIcon name={'left'} color="#fff" size={30} />
                </TouchableOpacity>
                <View>
                  <Text style={styles.barText}>Create Ad</Text>
                </View>
                <TouchableOpacity style={styles.more}>
                  <FeIcon name="more-vertical" color="#fff" size={30} />
                </TouchableOpacity>
              </View>
              <View style={styles.uploadImagesView}>
                {images.length === 0 && (
                  <TouchableOpacity
                    style={styles.uploadMore}
                    onPress={() => this.pickMultiple()}
                  >
                    <AIcon name="pluscircle" color="#209EF5" size={50} />
                  </TouchableOpacity>
                )}
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  // contentContainerStyle={styles.uploadImagesView}
                >
                  {images.length > 0 &&
                    images.map((image, i) => (
                      <FastImage
                        key={i}
                        source={{ uri: image.uri }}
                        style={styles.uploadImages}
                        // resizeMode={FastImage.resizeMode.contain}
                      />
                    ))}
                  {images.length > 0 && images.length < 8 && (
                    <TouchableOpacity
                      style={styles.uploadMore}
                      onPress={() => this.pickMultiple()}
                    >
                      <AIcon name="pluscircle" color="#209EF5" size={50} />
                    </TouchableOpacity>
                  )}
                </ScrollView>
              </View>
              <View style={styles.selectCategory}>
                <Text style={styles.categoryText}>Select Category</Text>
                <View style={styles.fieldButton}>
                  <ModalSelector
                    data={categories}
                    cancelStyle={styles.cancelStyle}
                    cancelTextStyle={styles.cancelTextStyle}
                    optionContainerStyle={styles.optionContainerStyle}
                    initValueTextStyle={styles.sectionTextStyle}
                    childrenContainerStyle={styles.overlayStyle}
                    selectStyle={styles.touchableStyle}
                    selectTextStyle={styles.selectTextStyle}
                    initValue="Select Category!"
                    cancelText="CANCEL"
                    onChange={option => {
                      this.setCategory(option.key, option.label);
                    }}
                  />
                </View>
              </View>
              <View style={styles.selectCategory}>
                <Text style={styles.categoryText}>Title</Text>
                <View style={styles.fieldButton}>
                  <TextInput
                    value={title}
                    style={styles.input}
                    onChangeText={value => this.saveValues('title', value)}
                  />
                </View>
              </View>
              <View style={styles.selectCategory}>
                <Text style={styles.categoryText}>Price</Text>
                <View style={styles.fieldButton}>
                  <TextInput
                    value={price}
                    style={styles.input}
                    onChangeText={value => this.saveValues('price', value)}
                  />
                </View>
              </View>
              <View style={styles.selectCategory}>
                <Text style={styles.categoryText}>Schedule</Text>
                <View style={styles.scheduleView}>
                  {/* <TextInput style={styles.startinput} /> */}
                  <TouchableOpacity
                    style={styles.startinput}
                    onPress={() => this.openModal('startDate')}
                  >
                    <Text>{moment(startDate).format('L')}</Text>
                  </TouchableOpacity>

                  <Text style={styles.shecduleText}>To</Text>
                  <TouchableOpacity
                    style={styles.startinput}
                    onPress={() => this.openModal('endDate')}
                  >
                    <Text>{moment(endDate).format('L')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.descriptionOverview}>
                <Text style={styles.categoryText}>Description</Text>
                <View style={styles.descriptionView}>
                  <TextInput
                    value={description}
                    style={styles.descriptionInput}
                    multiline={true}
                    onChangeText={value =>
                      this.saveValues('description', value)
                    }
                  />
                </View>
              </View>
              <View style={styles.submitButtonView}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => this.submit()}
                >
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
        <TimeModal
          modal={modal}
          closeModal={this.closeModal}
          setDate={setDate}
          startDate={startDate}
          endDate={endDate}
          _setDate={this.setDate}
        />
      </View>
    );
  }
}

export default Ad;
