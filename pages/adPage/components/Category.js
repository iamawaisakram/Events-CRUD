import React from 'react';
import { View, Text } from 'react-native';

//Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

//style
import styles from '../../../styles/UploadAd';

const categories = [
  {
    key: 0,
    label: 'Vehicles',
    component: (
      <View style={styles.categorieChoice}>
        <IonIcon
          name="md-car"
          size={30}
          color="#209EF5"
          style={styles.categorieChoiceIcon}
        />
        <Text style={styles.categorieChoiceText}>Vehicles</Text>
      </View>
    )
  },
  {
    key: 1,
    label: 'Electronics And Computer',
    component: (
      <View style={styles.categorieChoice}>
        <MCIcon
          name="nintendo-switch"
          size={30}
          color="#209EF5"
          style={styles.categorieChoiceIcon}
        />
        <Text style={styles.categorieChoiceText}>Electronics And Computer</Text>
      </View>
    )
  },
  {
    key: 2,
    label: 'Home Garden and Tools',
    component: (
      <View style={styles.categorieChoice}>
        <MIcon
          name="print"
          size={30}
          color="#209EF5"
          style={styles.categorieChoiceIcon}
        />
        <Text style={styles.categorieChoiceText}>Home Garden and Tools</Text>
      </View>
    )
  },
  {
    key: 3,
    label: 'Sports and Outdoor',
    component: (
      <View style={styles.categorieChoice}>
        <IonIcon
          name="md-bicycle"
          size={30}
          color="#209EF5"
          style={styles.categorieChoiceIcon}
        />
        <Text style={styles.categorieChoiceText}>Sports and Outdoor</Text>
      </View>
    )
  },
  {
    key: 4,
    label: 'Property',
    component: (
      <View style={styles.categorieChoice}>
        <Icon
          name="building-o"
          size={30}
          color="#209EF5"
          style={styles.categorieChoiceIcon}
        />
        <Text style={styles.categorieChoiceText}>Property</Text>
      </View>
    )
  },
  {
    key: 5,
    label: 'Fashion and Beauty',
    component: (
      <View style={styles.categorieChoice}>
        <MCIcon
          name="face"
          size={30}
          color="#209EF5"
          style={styles.categorieChoiceIcon}
        />
        <Text style={styles.categorieChoiceText}>Fashion and Beauty</Text>
      </View>
    )
  },
  {
    key: 6,
    label: 'Hobbies and Interest',
    component: (
      <View style={styles.categorieChoice}>
        <MCIcon
          name="puzzle"
          size={30}
          color="#209EF5"
          style={styles.categorieChoiceIcon}
        />
        <Text style={styles.categorieChoiceText}>Hobbies and Interest</Text>
      </View>
    )
  },
  {
    key: 7,
    label: 'Health and Medical',
    component: (
      <View style={styles.categorieChoice}>
        <MCIcon
          name="heart-pulse"
          size={30}
          color="#209EF5"
          style={styles.categorieChoiceIcon}
        />
        <Text style={styles.categorieChoiceText}>Health and Medical</Text>
      </View>
    )
  },
  {
    key: 8,
    label: 'Travel',
    component: (
      <View style={styles.categorieChoice}>
        <IonIcon
          name="md-airplane"
          size={30}
          color="#209EF5"
          style={styles.categorieChoiceIcon}
        />
        <Text style={styles.categorieChoiceText}>Travel</Text>
      </View>
    )
  },
  {
    key: 9,
    label: 'Art',
    component: (
      <View style={styles.categorieChoice}>
        <IonIcon
          name="md-color-palette"
          size={30}
          color="#209EF5"
          style={styles.categorieChoiceIcon}
        />
        <Text style={styles.categorieChoiceText}>Art</Text>
      </View>
    )
  },
  {
    key: 10,
    label: 'Most Popular',
    component: (
      <View style={styles.categorieChoice}>
        <IonIcon
          name="ios-heart"
          size={30}
          color="#209EF5"
          style={styles.categorieChoiceIcon}
        />
        <Text style={styles.categorieChoiceText}>Most Popular</Text>
      </View>
    )
  }
];

export default categories;
