import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Slider, Dimensions, View, Text} from 'react-native';
import RNTrackPlayer, {useProgress} from 'react-native-track-player';
import {NativeViewGestureHandler, State, TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

const VoulmeBar = () => {
  const [currentVolume, setPosition] = useState(5);
  const isSlidingRef = useRef(false);
  const isSliding = isSlidingRef.current;

  useEffect(() => {
    if (!isSliding) {
      setPosition(currentVolume);
    }
  }, [isSliding, currentVolume]);

  const onTouchStart = useCallback(() => (isSlidingRef.current = true), []);

  const onValueChange = useCallback(value => {
    console.log('onValueChange', value);
    isSlidingRef.current = true;
  }, []);

  const onSlidingComplete = useCallback(async value => {
    setPosition(value);
    await RNTrackPlayer.setVolume(value);
    setTimeout(() => {
      isSlidingRef.current = false;
    }, 1000);
  }, []);

  const hsc = e => {
    // if (e.nativeEvent.state === State.ACTIVE) {
    onTouchStart();
    // }
  };

  return (
    <View style={{width: width / 2, marginLeft: 20}}>
      <NativeViewGestureHandler
        disallowInterruption
        shouldActivateOnStart
        onHandlerStateChange={hsc}
        onGestureEvent={hsc}
        shouldCancelWhenOutside={false}>
        <Slider
          thumbTintColor={'red'}
          minimumTrackTintColor={'red'}
          maximumTrackTintColor={'white'}
          maximumValue={10}
          minimumValue={0}
          value={currentVolume}
          onTouchStart={onTouchStart}
          onValueChange={onValueChange}
          onSlidingComplete={onSlidingComplete}
        />
      </NativeViewGestureHandler>
    </View>
  );
};

export default memo(VoulmeBar);
