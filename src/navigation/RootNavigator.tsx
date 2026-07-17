import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './stacks/HomeStack';

const RootNavigator = () => (
  <NavigationContainer>
    <HomeStack />
  </NavigationContainer>
);

export default RootNavigator;
