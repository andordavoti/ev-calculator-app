import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import ESK8Speed from '../components/ESK8Speed';

export default class SpeedCalcScreen extends Component {
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
      <ESK8Speed
        appMode={this.state.appMode}
        driveSystem={this.state.driveSystem}
        units={this.state.units}
      />
    );
  }
}

SpeedCalcScreen.navigationOptions = {
  title: 'Speed Calculator',
  headerTitleStyle: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center'
  },
};