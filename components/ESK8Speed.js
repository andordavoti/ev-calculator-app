import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import InputContainer from '../components/InputContainer';
import Button from '../components/Button';

export default class ESK8Speed extends Component {
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
    const {motorPulleyTeeth, wheelPulleyTeeth, motorKVRating, wheelSize, cellsInSeries, nominalCellVoltage} = this.state;

    let resultMph = nominalCellVoltage*cellsInSeries*motorKVRating*Math.PI*(motorPulleyTeeth/wheelPulleyTeeth)*wheelSize*0.00003728226;
    let resultKph = (resultMph * 1.60934).toFixed(2);

    if(!isNaN(resultKph)){
      this.setState({ result: 'Estimated top speed: ' + resultKph + ' km/h' });
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
        <InputContainer text="Motor Pulley Teeth:">
          <Input
            onValueChange={this.onValueChange}
            type="motorPulleyTeeth"
          />
        </InputContainer>

        <InputContainer text="Wheel Pulley Teeth:">
          <Input
            onValueChange={this.onValueChange}
            type="wheelPulleyTeeth"
          />
        </InputContainer>

        <InputContainer text="Motor KV Rating:">
          <Input
            onValueChange={this.onValueChange}
            type="motorKVRating"
          />
        </InputContainer>

        <InputContainer text="Wheel Size (in mm):">
          <Input
            onValueChange={this.onValueChange}
            type="wheelSize"
          />
        </InputContainer>

        <InputContainer text="Cells in Series:">
          <Input
            onValueChange={this.onValueChange}
            type="cellsInSeries"
          />
        </InputContainer>
        </View>

        <Dropdown
          onValueChange={this.onValueChange}
          type="nominalCellVoltage"
          placeholder={{label:'Select battery type', value: null, color: '#9EA0A4'}}
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
          style={styles.buttonStyle}
        />
        </View>

          <Text style={styles.result}>{this.state.result}</Text>
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
    padding: 50,
    fontSize: 18,
    textAlign: 'center'
  }
});