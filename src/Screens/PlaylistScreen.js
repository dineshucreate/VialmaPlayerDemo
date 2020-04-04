/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import Player from '../components/Player';
import {connect} from 'react-redux';
import {setSelectedSongObj} from '../redux/actions';
import {isPlaying} from '@helpers';
import Images from '@assets/images';

const {width} = Dimensions.get('window');

function PlaylistScreen({
  route,
  setCurrentSongAction,
  currentSongObj,
  navigation,
}) {
  let {params: {songs, trackId} = {}} = ({} = route);
  const currentState = usePlaybackState();
  const playing = isPlaying(currentState);

  useEffect(() => {
    if (songs) {
      setCurrentSongAction(songs);
      initSongs();
    } else {
      TrackPlayer.add([...currentSongObj]);
      togglePlayback();
    }
  }, []);

  const initSongs = async () => {
    await TrackPlayer.stop();
    await TrackPlayer.reset();
    await TrackPlayer.add([...songs]);
    if (trackId) {
      await TrackPlayer.skip(trackId);
      TrackPlayer.play();
    } else {
      TrackPlayer.play();
    }
  };
  const togglePlayback = useCallback(() => {
    if (playing) {
      return TrackPlayer.pause();
    } else {
      return TrackPlayer.play();
    }
  }, [playing]);
  async function stop() {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack) {
      await TrackPlayer.stop();
    }
  }
  const onCrossPress = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onCrossPress}
          style={{
            width: width / 4,
            height: width / 4,
            alignSelf: 'flex-start',
            justifyContent: 'center',
          }}>
          <Image
            style={{height: 40, width: 40, alignSelf: 'center'}}
            source={Images.cross}
          />
        </TouchableOpacity>
        <Image
          style={{width: width / 3, height: width / 3, alignSelf: 'center'}}
          source={Images.composer}
        />
        <Player
          style={styles.player}
          onTogglePlayback={togglePlayback}
          onStop={stop}
        />
      </View>
    </SafeAreaView>
  );
}
const mapStateToProps = ({songReducer}) => ({
  currentSongObj: songReducer.currentSongObj,
});
const mapDispatchToProps = dispatch => ({
  setCurrentSongAction: payload => dispatch(setSelectedSongObj(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistScreen);
PlaylistScreen.navigationOptions = {
  title: 'Playlist Example',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'pink',
    justifyContent: 'center',
  },
  description: {
    width: '80%',
    marginTop: 20,
    textAlign: 'center',
  },
  player: {
    marginTop: 10,
  },
  state: {
    marginTop: 20,
  },
});
