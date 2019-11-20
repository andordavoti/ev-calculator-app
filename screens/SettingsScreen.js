import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';

export default class SettingsScreen extends Component {
  state = {
    simpleMode: '',
    beltDrive: ''
  };

  async componentWillMount() {
    const settingsArray = await AsyncStorage.getItem('settingsArray');
    const data = JSON.parse(settingsArray);

    this.setState({
      simpleMode: data.simpleMode,
      beltDrive: data.beltDrive
    });
  }

  saveSettings = () => {
    const { simpleMode, beltDrive } = this.state

    const settingsArray = {
      simpleMode,
      beltDrive
    };
    AsyncStorage.setItem('settingsArray', JSON.stringify(settingsArray));
  };

  validateSettings = async () => {
    const settingsArray = await AsyncStorage.getItem('settingsArray');
    const data = JSON.parse(settingsArray);
    console.log('Settings Saved: ');
    console.log('Simple Mode: ' + data.simpleMode);
    console.log('Belt Drive: ' + data.beltDrive);
  };

  onValueChange = (value, type) => {
    this.setState({ [type]: value });
  }

  render() {

    return (
      <View>
        <Dropdown
          value={this.state.simpleMode}
          onValueChange={this.onValueChange}
          type="simpleMode"
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

        <Dropdown
          onValueChange={this.onValueChange}
          type="beltDrive"
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 30
  },
});

SettingsScreen.navigationOptions = {
  title: 'Settings',
  headerTitleStyle: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center'
  },
};
