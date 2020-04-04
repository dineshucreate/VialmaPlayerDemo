import React, {memo} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useProgress} from 'react-native-track-player';
import {formatDuration} from '@helpers';

const {width} = Dimensions.get('window');
const ProgressDuration = () => {
  const {position, duration} = useProgress();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatDuration(position)}</Text>
      <Text style={styles.text}>{formatDuration(duration)}</Text>
    </View>
  );
};

export default memo(ProgressDuration);

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    width: 50,
    fontSize: 19,
    color: '#000',
    fontWeight: 'bold',
  },
});
