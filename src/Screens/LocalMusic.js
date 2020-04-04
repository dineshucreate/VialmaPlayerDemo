import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
// import MusicFiles from 'react-native-get-music-files';
import Permissions from 'react-native-permissions';

export default class LocalMusic extends Component {
  state = {
    storagePermission: '',
  };

  componentDidMount() {
    // Permissions.request('storage').then(response => {
    //   this.setState({storagePermission: response});
    // });
  }

  _getSongs = () => {
    Alert.alert('seen');
    // MusicFiles.getAll({})
    //   .then(tracks => {
    //     console.log(tracks);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text onPress={this._getSongs}>get songs</Text>
      </View>
    );
  }
}
