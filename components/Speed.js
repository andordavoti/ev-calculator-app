import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Input from './Input';
import Dropdown from './Dropdown';
import Button from './Button';

export default class Speed extends Component {
  state = {
    motorPulleyTeeth: '',
    wheelPulleyTeeth: '',
    motorKVRating: '',
    wheelSize: '',
    cellsInSeries: '',
    nominalCellVoltage: '',
    result: null
  };

  calculate = () => {
    const { motorPulleyTeeth, wheelPulleyTeeth, motorKVRating, wheelSize, cellsInSeries, nominalCellVoltage } = this.state;

    let resultMph = nominalCellVoltage * cellsInSeries * motorKVRating * Math.PI * (motorPulleyTeeth / wheelPulleyTeeth) * wheelSize * 0.00003728226;
    let resultKph = resultMph * 1.60934;

    units = this.props.units;

    if (units === 'metric' || units === 'default') {
      if (!isNaN(resultKph)) {
        this.setState({ result: 'Estimated top speed: ' + resultKph.toFixed(2) + ' km/h' });
      }
      else {
        this.setState({ result: 'Please fill out all fields' });
      }
    }
    else {
      if (!isNaN(resultMph)) {
        this.setState({ result: 'Estimated top speed: ' + resultMph.toFixed(2) + ' mi/h' });
      }
      else {
        this.setState({ result: 'Please fill out all fields' });
      }
    }
  }

  onValueChange = (value, type) => {
    this.setState({ [type]: parseFloat(value) });
  }

  render() {
    return (
      <View>
        <Input
          text="Motor Pulley Teeth:"
          onValueChange={this.onValueChange}
          type="motorPulleyTeeth"
        />

        <Input
          text="Wheel Pulley Teeth:"
          onValueChange={this.onValueChange}
          type="wheelPulleyTeeth"
        />

        <Input
          text="Motor KV Rating:"
          onValueChange={this.onValueChange}
          type="motorKVRating"
        />

        <Input
          text="Wheel Size (in mm):"
          onValueChange={this.onValueChange}
          type="wheelSize"
        />

        <Input
          text="Cells in Series:"
          onValueChange={this.onValueChange}
          type="cellsInSeries"
        />

        <Dropdown
          onValueChange={this.onValueChange}
          type="nominalCellVoltage"
          placeholder={{ label: 'Select battery type', value: null, color: '#9EA0A4' }}
          items={[
            {
              label: 'Li-Po (3.7V)',
              value: '3.7',
            },
            {
              label: 'Li-Ion (3.6V)',
              value: '3.6',
            },
            {
              label: 'Li-Fe (3.3V)',
              value: '3.3',
            }
          ]}
        />

        <View style={styles.buttonContainer}>
          <Button
            onPress={this.calculate}
            text="Calculate"
          />
        </View>

        <Text style={styles.result}>{this.state.result}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 50
  },
  result: {
    paddingTop: 50,
    fontSize: 18,
    textAlign: 'center'
  }
});