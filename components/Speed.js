import React, { Component } from 'react'
import { StyleSheet, Text, View, Keyboard } from 'react-native'
import Input from './Input'
import Dropdown from './Dropdown'
import Button from './Button'

export default class Speed extends Component {
  state = {
    motorPulleyTeeth: '',
    wheelPulleyTeeth: '',
    motorKVRating: '',
    wheelSize: '',
    cellsInSeries: '',
    cellVoltage: '',
    result: ''
  }

  calculate = () => {
    Keyboard.dismiss()

    const { motorPulleyTeeth, wheelPulleyTeeth, motorKVRating, wheelSize, cellsInSeries, cellVoltage } = this.state

    let gearRatio
    if (this.props.driveSystem === 'hub') gearRatio = 1
    else gearRatio = (motorPulleyTeeth / wheelPulleyTeeth)

    const resultKph = ((motorKVRating * cellsInSeries * cellVoltage) / (wheelPulleyTeeth / motorPulleyTeeth)) / wheelSize
    const resultMph = resultKph / 1.6

    units = this.props.units

    console.log('Units: ' + units)

    console.log(motorPulleyTeeth, wheelPulleyTeeth, motorKVRating, wheelSize, cellsInSeries, cellVoltage)

    console.log(((motorKVRating * cellsInSeries * cellVoltage) / (wheelPulleyTeeth / motorPulleyTeeth)) / wheelSize)


    if (units === 'metric' || units === 'default' || units === '' || units === undefined) {
      if (!isNaN(resultKph)) {
        this.setState({ result: 'Estimated top speed: ' + resultKph.toFixed(2) + ' km/h' })
      }
      else this.setState({ result: 'Please fill out all fields' })
    }
    else {
      if (!isNaN(resultMph)) {
        this.setState({ result: 'Estimated top speed: ' + resultMph.toFixed(2) + ' mi/h' })
      }
      else this.setState({ result: 'Please fill out all fields' })
    }
  }

  onValueChange = (value, type) => {
    if (value !== null) {
      const number = parseFloat(value.replace(",", "."))
      this.setState({ [type]: number })
    }
    else this.setState({ [type]: parseFloat(value) })
  }

  appMode = () => {
    const { theme, appMode } = this.props
    if (appMode === 'advanced') {
      return <Input
        theme={theme}
        text="Max Cell Voltage:"
        onValueChange={this.onValueChange}
        type="cellVoltage"
      />
    }
    return <View style={styles.container}>
      <Dropdown
        theme={theme}
        onValueChange={this.onValueChange}
        type="cellVoltage"
        placeholder={{ label: 'Battery type', value: null, color: '#9EA0A4' }}
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
    </View>
  }

  driveSystem = () => {
    const { theme, driveSystem } = this.props
    if (driveSystem === 'hub') return <View></View>
    else {
      return <View style={styles.container}>
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
    }
  }

  render() {
    let theme = this.props.theme
    return <View style={styles.container}>
      {this.driveSystem()}
      <Input
        theme={theme}
        text="Motor KV Rating:"
        onValueChange={this.onValueChange}
        type="motorKVRating"
      />
      <Input
        theme={theme}
        text="Wheel Size (mm):"
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
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  buttonContainer: {
    paddingTop: 10,
    alignItems: 'center',
  },
  resultLight: {
    paddingTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'black'
  },
  resultDark: {
    paddingTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  }
})