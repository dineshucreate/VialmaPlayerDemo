import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import LandingScreen from './src/Screens/LandingScreen';
import PlaylistScreen from './src/Screens/PlaylistScreen';
import Playlist from './src/Screens/Playlist';
import LocalMusic from './src/Screens/LocalMusic';

import {nevRef} from './src/RootNavigator';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={nevRef}>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Landing"
            component={LandingScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="PlayerScreen"
            component={PlaylistScreen}
          />
          <Stack.Screen name="Playlist" component={Playlist} />
          <Stack.Screen name="LocalMusic" component={LocalMusic} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
