import React from 'react';
import { View, StyleSheet } from 'react-native';
import Settings from '../components/Settings';

export default SettingsScreen = () => {
    return (
      <View style={styles.container}>
        <Settings />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

SettingsScreen.navigationOptions = {
  title: 'Settings',
  headerTitleStyle: {
    flex: 1,
    textAlign: 'center'
  },
};