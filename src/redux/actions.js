export const SELECT_SONG_DATA = 'SELECTED_SONG_OBJ';
export const SELECT_CURRENT_SONG = 'SELECT_CURRENT_SONG';

export const setSelectedSongObj = payload => ({
  type: SELECT_SONG_DATA,
  payload,
});
export const setCurrentSong = payload => ({
  type: SELECT_CURRENT_SONG,
  payload,
});
