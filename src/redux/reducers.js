import React from 'react';
import {SELECT_SONG_DATA, SELECT_CURRENT_SONG} from './actions';

const INITIAL_STATE = {
  currentSongObj: {},
  currentSong: {
    title: '',
    artwork: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_SONG_DATA:
      return {
        ...state,
        currentSongObj: action.payload,
      };
    case SELECT_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload,
      };

    default:
      return state;
  }
};
