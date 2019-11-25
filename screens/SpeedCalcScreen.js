import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import Speed from '../components/Speed';

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
      <View style={styles.container}>
      <Speed
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

SpeedCalcScreen.navigationOptions = {
  title: 'Speed Calculator',
  headerTitleStyle: {
    flex: 1,
    textAlign: 'center'
  },
};