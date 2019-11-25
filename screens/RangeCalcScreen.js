import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import Range from '../components/Range';

export default class RangeCalcScreen extends Component {
  state = { appMode: '', driveSystem: '', units: '' };

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
    <View style={styles.container}>
      <Range
      appMode={this.state.appMode}
      driveSystem={this.state.driveSystem}
      units={this.state.units}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
  }
});

RangeCalcScreen.navigationOptions = {
  title: 'Range Calculator',
  headerTitleStyle: {
    flex: 1,
    textAlign: 'center'
  },
};