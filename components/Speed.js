import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard
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
    Keyboard.dismiss();

    const { motorPulleyTeeth, wheelPulleyTeeth, motorKVRating, wheelSize, cellsInSeries, nominalCellVoltage } = this.state;

    var gearRatio;

    if (this.props.driveSystem === 'hub') {
      gearRatio = 1;
    }
    else {
      gearRatio = (motorPulleyTeeth / wheelPulleyTeeth);
    }

    let resultMph = nominalCellVoltage * cellsInSeries * motorKVRating * Math.PI * gearRatio * wheelSize * 0.00003728226;
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
  };

  onValueChange = (value, type) => {
    if (!(value === null)) {
      let number = parseFloat(value.replace(",", "."));
      this.setState({ [type]: number });
    }
    else {
      this.setState({ [type]: parseFloat(value) });
    }
  }

  appMode = () => {
    let theme = this.props.theme;
    if (this.props.appMode === 'advanced') {
      return (
        <Input
          theme={theme}
          text="Nominal Cell Voltage:"
          onValueChange={this.onValueChange}
          type="nominalCellVoltage"
        />
      );
    }
    return (
      <Dropdown
        theme={theme}
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
    );
  };

  driveSystem = () => {
    let theme = this.props.theme;
    if (this.props.driveSystem === 'hub') {
      return <View></View>;
    }
    else {
      return (
        <View>
          <Input
            theme={theme}
            text="Motor Pulley Teeth:"
            onValueChange={this.onValueChange}
            type="motorPulleyTeeth"
          />

          <Input
            theme={theme}
            text="Wheel Pulley Teeth:"
            onValueChange={this.onValueChange}
            type="wheelPulleyTeeth"
          />
        </View>
      );
    }
  };

  render() {
    let theme = this.props.theme;
    return (
      <View>
        {this.driveSystem()}
        <Input
          theme={theme}
          text="Motor KV Rating:"
          onValueChange={this.onValueChange}
          type="motorKVRating"
        />
        <Input
          theme={theme}
          text="Wheel Size (in mm):"
          onValueChange={this.onValueChange}
          type="wheelSize"
        />
        <Input
          theme={theme}
          text="Cells in Series:"
          onValueChange={this.onValueChange}
          type="cellsInSeries"
        />
        {this.appMode()}
        <View style={styles.buttonContainer}>
          <Button
            theme={theme}
            onPress={this.calculate}
            text="Calculate"
          />
        </View>
        <Text style={theme === 'dark' ? styles.resultDark : styles.resultLight}>{this.state.result}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 50
  },
  resultLight: {
    paddingTop: 50,
    fontSize: 18,
    textAlign: 'center',
    color: 'black'
  },
  resultDark: {
    paddingTop: 50,
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  }
});