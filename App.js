import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import CityList from './CityList';
import WeatherDetailScreen from './WeatherDetailScreen';
import MainPage from './MainPage'

const AppNavigator = createStackNavigator(
  {
    MainPage : MainPage,
    CityList: CityList,
    Detail: WeatherDetailScreen,
  },
  {
    initialRouteName: 'MainPage'
  }
);

export default createAppContainer(AppNavigator);
