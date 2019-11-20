import React, { Component } from 'react';

import ESK8Range from '../components/ESK8Range';

export default class RangeCalcScreen extends Component {

  render() {
    return (
      <ESK8Range />
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