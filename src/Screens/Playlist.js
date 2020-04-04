/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import playlistData from '../data/playlist.json';
import Screen from '../components/Screen';
import TrackMiniPlayer from '../components/TrackMiniPlayer';

export default class Playlist extends Screen {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onItemPress = item => {
    const {route: {params: SongsData} = {}} = ({} = this.props);
    this.props.navigation.navigate('PlayerScreen', {
      songs: SongsData,
      trackId: item.id,
    });
    // this.navigateTo('PlayerScreen', {songs: [...[], item], trackId: });
  };
  renderItem = ({item}) => {
    const {title} = item;
    return (
      <TouchableOpacity
        style={{
          width: Dimensions.get('window').width - 20,
          paddingVertical: 20,
          borderBottomWidth: 2,
          borderBottomColor: 'grey',
        }}
        onPress={() => this.onItemPress(item)}>
        <Text style={{fontSize: 16}}>{title}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {route: {params: SongsData} = {}} = ({} = this.props);
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical: 20,
          backgroundColor: '#F5FCFF',
        }}>
        {/* <TouchableOpacity
          onPress={() => this.navigateTo('PlayerScreen', SongsData)}
          style={{
            paddingVertical: 20,
            borderRadius: 5,
            borderWidth: 2,
            paddingHorizontal: 30,
          }}>
          <Text style={{fontSize: 20}}>Play All</Text>
        </TouchableOpacity> */}
        <FlatList
          style={{marginTop: 20}}
          data={SongsData}
          renderItem={this.renderItem}
        />
        <TrackMiniPlayer />
      </View>
    );
  }
}
