import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import ESK8Range from '../components/ESK8Range';

export default class RangeCalcScreen extends Component {
  state = { appMode: '', driveSystem: '', units: '' };

  componentWillMount() {
    this.getUserSettings();
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this.getUserSettings();
    });
  }

  getUserSettings = async () => {
    const settingsArray = await AsyncStorage.getItem('settingsArray');
    const data = JSON.parse(settingsArray);

    this.setState({
      appMode: data.appMode,
      driveSystem: data.driveSystem,
      units: data.units
    });
  }

  render() {
    return (
      <ESK8Range
      appMode={this.state.appMode}
      driveSystem={this.state.driveSystem}
      units={this.state.units}
      />
    );
  }
}

RangeCalcScreen.navigationOptions = {
  title: 'Range Calculator',
  headerTitleStyle: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center'
  },
};