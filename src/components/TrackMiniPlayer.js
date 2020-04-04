/* eslint-disable react-hooks/rules-of-hooks */
import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import RNTrackPlayer, {
  usePlaybackState,
  State,
} from 'react-native-track-player';
import TrackProgressLine from '../components/ProgressBar';
import ControlButton from './ControlButton';
import images from '@assets/images';
// import {TrackFile} from '@reducers/audioPlayerReducer';
import {isPlaying, next, prev} from '@helpers';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {navigate} from '../RootNavigator';

const {width} = Dimensions.get('window');

const TrackMiniPlayer = ({track}) => {
  const currentState = usePlaybackState();
  const playing = isPlaying(currentState);
  const renderCurrentTrack = useCallback(() => {
    if (track) {
      return (
        <View style={styles.track}>
          <View style={styles.trackArtwork} />
          <View style={styles.trackInfoContainer}>
            <Text numberOfLines={1} style={styles.trackTitle}>
              {track.title}
            </Text>
            <Text numberOfLines={1} style={styles.trackArtist}>
              {track.artist}
            </Text>
          </View>
        </View>
      );
    }
    return null;
  }, [track]);

  const playOrPause = useCallback(() => {
    if (playing) {
      return RNTrackPlayer.pause();
    } else {
      return RNTrackPlayer.play();
    }
  }, [playing]);

  const playOrPauseImage = () =>
    images[playing ? 'pause-circle' : 'play-circle'];

  return (
    <>
      {playing || currentState === State.Paused ? (
        <View style={[styles.container]}>
          <View style={{alignSelf: 'center', alignItems: 'center'}}>
            <View style={{width: width - 80}}>
              <TrackProgressLine />
            </View>
            <View style={styles.player}>
              {/* <View style={styles.trackContainer}>{renderCurrentTrack()}</View> */}
              <ControlButton onPress={prev} image={images['rewind-left']} />
              <ControlButton onPress={playOrPause} image={playOrPauseImage()} />
              <ControlButton onPress={next} image={images['rewind-right']} />
            </View>
          </View>
          <TouchableOpacity
            style={{
              transform: [{rotate: '180deg'}],
              alignItems: 'center',
              width: 80,
            }}
            onPress={() => navigate('PlayerScreen')}>
            <Image
              source={images['arrowhead-down']}
              style={[styles.buttonImage, {width: 55, height: 55}]}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};

export default memo(TrackMiniPlayer);
export const MiniPlayerHeight = 56;

const styles = StyleSheet.create({
  container: {
    width: 420,
    backgroundColor: 'pink',
    paddingTop: 5,
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  player: {
    height: 40,
    width: width / 1.8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trackContainer: {
    flex: 1,
  },
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  trackTitle: {
    fontSize: 14,
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: {height: 1, width: 1},
    textShadowRadius: 1,
  },
  trackArtist: {
    fontSize: 12,
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: {height: 1, width: 1},
    textShadowRadius: 1,
  },
  trackArtwork: {
    height: 48,
    width: 48,
    borderRadius: 4,
    marginLeft: 2.5,
    marginRight: 8,
  },
  trackInfoContainer: {
    flex: 1,
  },
});
