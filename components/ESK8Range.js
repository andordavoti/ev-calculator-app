import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import InputContainer from '../components/InputContainer';
import Button from '../components/Button';

export default class ESK8Range extends Component {
  state = {
    cellCapacity: '',
    cellVoltage: '',
    whPerMile: '',
    cellsInSeries: '',
    cellsInParallell: '',
    result: null
  };

  calculate = () => {
    const {cellCapacity, cellVoltage, whPerMile, cellsInSeries, cellsInParallell} = this.state;

    let resultMiles = cellsInParallell*cellCapacity*cellVoltage*cellsInSeries /whPerMile;
    let resultKm = (resultMiles * 1.60934).toFixed(2);

    if(!isNaN(resultKm)){
      this.setState({ result: resultKm + ' km' });
    }
    else{
      this.setState({ result: 'Please fill out all fields' });
    }
  }

  onValueChange = (value, type) => {
    this.setState({ [type]: parseFloat(value) });
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.InputContainer}>
          <InputContainer text="Cells in Series:">
            <Input
              onValueChange={this.onValueChange}
              type="cellsInSeries"
            />
          </InputContainer>

          <InputContainer text="Cells in Parallell:">
            <Input
              onValueChange={this.onValueChange}
              type="cellsInParallell"
            />
          </InputContainer>

          <InputContainer text="Cell Capacity (in Ah):">
            <Input
              onValueChange={this.onValueChange}
              type="cellCapacity"
            />
          </InputContainer>
        </View>

        <Dropdown
          onValueChange={this.onValueChange}
          type="cellVoltage"
          placeholder={{label:'Select battery type', value: null, color: '#9EA0A4'}}
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
          placeholder={{label:'Select setup (Wh per mile)', value: null, color: '#9EA0A4'}}
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
              value: '30',
          }
        ]}
        />

        <View style={styles.buttonContainer}>
          <Button
            onPress={this.calculate}
            text="Calculate"
            style={styles.buttonStyle}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    padding: 30
  },
  result: {
    padding: 30,
    fontSize: 22,
    textAlign: 'center'
  }
});