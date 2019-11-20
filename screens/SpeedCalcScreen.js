import React, { Component } from 'react';

import ESK8Speed from '../components/ESK8Speed';

export default class SpeedCalcScreen extends Component {

  render() {
    return (
      <ESK8Speed />
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