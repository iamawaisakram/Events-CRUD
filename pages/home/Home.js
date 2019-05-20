import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {}

  render() {
    return (
      <View>
        <Text> Home </Text>
      </View>
    );
  }
}

export default Home;
