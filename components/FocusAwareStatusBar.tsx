import * as React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { StatusBarProps } from 'expo-status-bar';

const FocusAwareStatusBar = (props: StatusBarProps) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

export default FocusAwareStatusBar