import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';

export default class SettingsScreen extends Component {
  state = { appMode: '', driveSystem: '', units: '' };

  async componentWillMount() {
    const settingsArray = await AsyncStorage.getItem('settingsArray');
    const data = JSON.parse(settingsArray);

    this.setState({
      appMode: data.appMode,
      driveSystem: data.driveSystem,
      units: data.units
    });
  }

  saveSettings = () => {
    const { appMode, driveSystem, units } = this.state

    const settingsArray = {
      appMode,
      driveSystem,
      units
    };
    AsyncStorage.setItem('settingsArray', JSON.stringify(settingsArray));
  };

  validateSettings = async () => {
    const settingsArray = await AsyncStorage.getItem('settingsArray');
    const data = JSON.parse(settingsArray);
    console.log('Settings Saved: ');
    console.log('App Mode: ' + data.appMode);
    console.log('Drive System: ' + data.driveSystem);
    console.log('Units: ' + data.units);
  };

  onValueChange = (value, type) => {
    this.setState({ [type]: value });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Select App Mode:</Text>
        <Dropdown
          value={this.state.appMode}
          onValueChange={this.onValueChange}
          type="appMode"
          placeholder={{ label: 'Simple or Advanced Mode', value: 'default', color: '#9EA0A4' }}
          items={[
            {
              label: 'Simple Mode',
              value: 'simple',
            },
            {
              label: 'Advanced Mode',
              value: 'advanced',
            },
          ]}
        />

        <Text style={styles.text}>Select Drive System:</Text>
        <Dropdown
          onValueChange={this.onValueChange}
          type="driveSystem"
          placeholder={{ label: 'Belt Drive or Hub Drive', value: 'default', color: '#9EA0A4' }}
          items={[
            {
              label: 'Belt Drive',
              value: 'belt',
            },
            {
              label: 'Hub Drive',
              value: 'hub',
            },
          ]}
        />

        <Text style={styles.text}>Select Units of Measurement:</Text>
        <Dropdown
          onValueChange={this.onValueChange}
          type="units"
          placeholder={{ label: 'Select Units', value: 'default', color: '#9EA0A4' }}
          items={[
            {
              label: 'Metric',
              value: 'metric',
            },
            {
              label: 'Imperial',
              value: 'imperial',
            },
          ]}
        />

        <View style={styles.buttonContainer}>
          <Button
            text="Save Settings"
            onPress={this.saveSettings}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            text="Validate Settings"
            onPress={this.validateSettings}
          />
        </View>

        <Text style={styles.text}>Version: {Constants.manifest.version}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    padding: 40
  },
  text: {
    padding: 30,
    paddingBottom: 0,
    textAlign: 'center',
    fontSize: 18,
  },
});

SettingsScreen.navigationOptions = {
  title: 'Settings',
  headerTitleStyle: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center'
  }
};