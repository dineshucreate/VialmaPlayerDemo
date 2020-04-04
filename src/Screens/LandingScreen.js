import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import TrackPlayer, {
  usePlaybackState,
  Capability,
} from 'react-native-track-player';
import images from '@assets/images';
import playlistData from '../data/playlist.json';
import localTrack from '../resources/pure.mp3';
import Screen from '../components/Screen';
import TrackMiniPlayer from '../components/TrackMiniPlayer';

const {width, height} = Dimensions.get('window');

export default class LandingScreen extends Screen {
  static navigationOptions = {
    title: 'React Native Track Player',
  };
  componentDidMount = () => {
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      icon: images['music-white'],
      stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SeekTo,
        Capability.Skip,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.JumpForward,
        Capability.JumpBackward,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      jumpInterval: 15,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Vialma Music Player</Text>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => this.navigateTo('Playlist', playlistData)}>
          <Text style={styles.txtStyle}>Vialma Playlist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() =>
            this.navigateTo('Playlist', [
              {
                id: '33',
                url:
                  'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_p?_=1427744870',
                title: 'bbcmedia...!',
                artist: 'Vialma streaming',
                artwork: 'https://picsum.photos/200',
                isStreaming: true,
              },
              {
                id: '34',
                url:
                  'http://direct.francemusique.fr/live/francemusique-lofi.mp3?_=1441282635&ID=72hsx84kb9',
                title: 'francemusique-lofi...!',
                artist: 'Vialma streaming',
                artwork: 'https://picsum.photos/200',
                isStreaming: true,
              },
              {
                id: '35',
                url:
                  'http://stream.wqxr.org/wqxr?tok=62414452Xr9gLNDMSF8o22a%2FEv7qhdA%2BB99KunF%2BVSZOAAAAAAAAAAAAAAAAAA%3D',
                title: 'stream.wqxr.org...!',
                artist: 'Vialma streaming',
                artwork: 'https://picsum.photos/200',
                isStreaming: true,
              },
            ])
          }>
          <Text style={styles.txtStyle}>Live Streamings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() =>
            this.navigateTo('PlayerScreen', {
              songs: [
                {
                  id: '44',
                  url: localTrack,
                  title: 'mp3 song demo...!',
                  artist: 'MP3 Rockstar...!',
                  artwork: 'https://picsum.photos/200',
                },
              ],
            })
          }>
          <Text style={styles.txtStyle}>Local mp3 song</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => this.navigateTo('LocalMusic')}>
          <Text style={styles.txtStyle}>Local Music</Text>
        </TouchableOpacity> */}
        <View style={{height: 40, width: 40}} />
        <TrackMiniPlayer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    justifyContent: 'space-evenly',
  },
  header: {
    fontSize: 20,
    marginVertical: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnStyle: {
    width: '70%',
    margin: 10,
    padding: 20,
    borderBottomColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
  },
  txtStyle: {
    alignSelf: 'center',
    fontSize: 18,
  },
});
