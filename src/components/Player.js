/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  State,
  Event,
  useProgress,
} from 'react-native-track-player';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  ActivityIndicator,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import images from '@assets/images';
import ProgressDuration from './ProgressDuration';
import ProgressBar from './ProgressBar';
import VolumeBar from './VolumeBar';
import {connect} from 'react-redux';
import {setCurrentSong} from '../redux/actions';
import {next, prev, isPlaying} from '@helpers';

const {width, height} = Dimensions.get('window');

function ControlButton({title, onPress, image, size}) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Image
        source={image}
        style={[styles.buttonImage, {width: 55, height: 55}]}
      />
      <Text style={styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

ControlButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

function Player(props) {
  const {currentSong, onTogglePlayback, currentSongObj} = props;
  const {title = '', artwork = '', isStreaming = false} = currentSong;
  const spinValue = new Animated.Value(0);
  const playing = isPlaying(usePlaybackState());

  useEffect(() => {
    if (playing) {
      runAnimation();
    }
  }, [spinValue]);

  const runAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        const track = await TrackPlayer.getTrack(event.nextTrack);
        if (track) {
          props.setCurrentSongAction(track);
        }
        break;

      //       case Event.PlaybackQueueEnded:
      //         await TrackPlayer.reset();
      //         await TrackPlayer.add([...currentSongObj]);
      //         await TrackPlayer.setupPlayer();
      //         break;
    }
  });

  const playOrPauseImage = () => {
    const playbackState = usePlaybackState();
    return images[
      playbackState === State.Playing ? 'pause-circle' : 'play-circle'
    ];
  };
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={[styles.card]}>
      {usePlaybackState() === State.Buffering ? (
        <ActivityIndicator
          color={'black'}
          style={{height: height / 5, alignSelf: 'center'}}
        />
      ) : (
        <View
          style={{
            height: height / 5,
            width: width / 1.5,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text style={styles.artist}>{title}</Text>
          <Text style={styles.title}>{artwork}</Text>
          <Animated.Image
            style={{
              width: width / 6,
              height: width / 6,
              alignSelf: 'center',
              transform: [{rotate: spin}],
            }}
            source={images.music}
          />
        </View>
      )}
      {!isStreaming && (
        <>
          <View style={{width: width - 40}}>
            <ProgressBar />
          </View>
          <ProgressDuration />
        </>
      )}
      <View style={styles.controls}>
        <ControlButton onPress={prev} image={images['skip-back']} />
        <ControlButton onPress={onTogglePlayback} image={playOrPauseImage()} />
        <ControlButton onPress={next} image={images['skip-forward']} />
      </View>
      <View
        style={{
          width: width - 100,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image style={{height: 30, width: 30}} source={images.speaker} />
        <View style={{width: width / 2, marginLeft: 20}}>
          <VolumeBar />
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = ({songReducer}) => ({
  currentSongObj: songReducer.currentSongObj,
  currentSong: songReducer.currentSong,
});
const mapDispatchToProps = dispatch => ({
  setCurrentSongAction: payload => dispatch(setCurrentSong(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);

Player.propTypes = {
  style: ViewPropTypes.style,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onTogglePlayback: PropTypes.func.isRequired,
};

Player.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  card: {
    width: width,
    margin: 100,
    alignItems: 'center',
    shadowColor: 'black',
    backgroundColor: 'pink',
  },
  cover: {
    width: 140,
    height: 140,
    marginTop: 20,
    backgroundColor: 'grey',
  },
  progress: {
    height: 1,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
  title: {
    width: width / 2.5,
    paddingVertical: 10,
  },
  artist: {
    fontWeight: 'bold',
    fontSize: 20,
    width: width / 2.5,
    paddingTop: 10,
  },
  controls: {
    marginVertical: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButtonContainer: {
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonImage: {
    aspectRatio: 1,
    tintColor: '#000',
  },
});
