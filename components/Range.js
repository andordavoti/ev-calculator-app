import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Input from './Input';
import Dropdown from './Dropdown';
import Button from './Button';

export default class Range extends Component {
  state = {
    cellCapacity: '',
    cellVoltage: '',
    whPerMile: '',
    cellsInSeries: '',
    cellsInParallell: '',
    result: null
  };

  calculate = () => {
    const { cellCapacity, cellVoltage, whPerMile, cellsInSeries, cellsInParallell } = this.state;

    let resultMiles = cellsInParallell * cellCapacity * cellVoltage * cellsInSeries / whPerMile;
    let resultKm = resultMiles * 1.60934;

    units = this.props.units;

    if (units === 'metric') {
      if (!isNaN(resultKm)) {
        this.setState({ result: 'Estimated range: ' + resultKm.toFixed(2) + ' km' });
      }
      else {
        this.setState({ result: 'Please fill out all fields' });
      }
    }
    else {
      if (!isNaN(resultKm)) {
        this.setState({ result: 'Estimated range: ' + resultMiles.toFixed(2) + ' miles' });
      }
      else {
        this.setState({ result: 'Please fill out all fields' });
      }
    }
  }

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
    if (this.props.appMode === 'advanced') {
      return (
        <View>
          <Input
            text="Max Cell Voltage:"
            onValueChange={this.onValueChange}
            type="cellVoltage"
          />

          <Input
            text="Wh per mile:"
            onValueChange={this.onValueChange}
            type="whPerMile"
          />
        </View>
      );
    }
    return (
      <View>
        <Dropdown
          onValueChange={this.onValueChange}
          type="cellVoltage"
          placeholder={{ label: 'Select battery type', value: null, color: '#9EA0A4' }}
          items={[
            {
              label: 'Li-Po/Li-Ion (4.2V)',
              value: '4.2',
            },
            {
              label: 'Li-Fe (3.6V)',
              value: '3.6',
            }
          ]}
        />

        <Dropdown
          onValueChange={this.onValueChange}
          type="whPerMile"
          placeholder={{ label: 'Select setup (Wh per mile)', value: null, color: '#9EA0A4' }}
          items={[
            {
              label: 'Single Motor (15Wh/mi)',
              value: '15',
            },
            {
              label: 'Dual Motor (25Wh/mi)',
              value: '25',
            },
            {
              label: 'Single Hub Motor (25Wh/mi)',
              value: '30',
            },
            {
              label: 'Dual Hub Motor (35Wh/mi)',
              value: '35',
            }
          ]}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.InputContainer}>
          <Input
            text="Cells in Series:"
            onValueChange={this.onValueChange}
            type="cellsInSeries"
          />

          <Input
            text="Cells in Parallell:"
            onValueChange={this.onValueChange}
            type="cellsInParallell"
          />

          <Input
            text="Cell Capacity (in Ah):"
            onValueChange={this.onValueChange}
            type="cellCapacity"
          />
        </View>

        {this.appMode()}

        <View style={styles.buttonContainer}>
          <Button
            onPress={this.calculate}
            text="Calculate"
          />
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.result}>{this.state.result}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 50
  },
  result: {
    padding: 50,
    fontSize: 18,
    textAlign: 'center'
  }
});