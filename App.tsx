
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import {
  StatusBar, useColorScheme
} from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import API from './src/api/API';
import { actionCreator } from './src/redux';
import { store } from './src/redux/store';
import HomeScreen, { fetchData } from './src/screens/Home';
import ImageDetailScreen from './src/screens/ImageDetailScreen';
import { RootStackParamType } from './src/types/RootStackParamType';

const Stack = createNativeStackNavigator<RootStackParamType>();
const initialUrl = "/v1/images/search?limit=30&size=med&mime_type=jpg,png"

const App = () => {

  return (
      <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home">
                <Stack.Screen
                 options={{
                   title: 'Aplacekitten',
                 }}
                 name="home" component={HomeScreen} />
                <Stack.Screen 
                  options={{
                    title: '',
                  }}
                name="imageDetail" component={ImageDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
};



export default App;
