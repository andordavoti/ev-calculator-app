import React, { Component } from 'react'
import { Text, View, StyleSheet, Keyboard } from 'react-native'
import Input from './Input'
import Dropdown from './Dropdown'
import Button from './Button'

export default class Range extends Component {
  state = {
    cellCapacity: '',
    cellVoltage: '',
    whPerMile: '',
    cellsInSeries: '',
    cellsInParallell: '',
    result: null
  }

  calculate = () => {
    Keyboard.dismiss()

    const { cellCapacity, cellVoltage, whPerMile, cellsInSeries, cellsInParallell } = this.state

    const resultMiles = cellsInParallell * cellCapacity * cellVoltage * cellsInSeries / whPerMile
    const resultKm = resultMiles * 1.60934

    units = this.props.units

    if (units === 'metric' || units === 'default' || units === '' || units === undefined) {
      if (!isNaN(resultKm)) {
        this.setState({ result: 'Estimated range: ' + resultKm.toFixed(2) + ' km' })
      }
      else this.setState({ result: 'Please fill out all fields' })
    }
    else {
      if (!isNaN(resultMiles)) {
        this.setState({ result: 'Estimated range: ' + resultMiles.toFixed(2) + ' miles' })
      }
      else this.setState({ result: 'Please fill out all fields' })
    }
  }

  onValueChange = (value, type) => {
    if (!(value === null)) {
      let number = parseFloat(value.replace(",", "."))
      this.setState({ [type]: number })
    }
    else this.setState({ [type]: parseFloat(value) })
  }

  appMode = () => {
    const { theme, appMode } = this.props
    if (appMode === 'advanced') {
      return <View style={styles.container}>
        <Input
          theme={theme}
          text="Max Cell Voltage:"
          onValueChange={this.onValueChange}
          type="cellVoltage"
        />
        <Input
          theme={theme}
          text="Wh per mile:"
          onValueChange={this.onValueChange}
          type="whPerMile"
        />
      </View>
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

      <Dropdown
        theme={theme}
        onValueChange={this.onValueChange}
        type="whPerMile"
        placeholder={{ label: 'Select setup', value: null, color: '#9EA0A4' }}
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
  }

  render() {
    let theme = this.props.theme
    return <View style={styles.container}>

      <View style={styles.InputContainer}>
        <Input
          theme={theme}
          text="Cells in Series:"
          onValueChange={this.onValueChange}
          type="cellsInSeries"
        />

        <Input
          theme={theme}
          text="Cells in Parallell:"
          onValueChange={this.onValueChange}
          type="cellsInParallell"
        />

        <Input
          theme={theme}
          text="Cell Capacity (Ah):"
          onValueChange={this.onValueChange}
          type="cellCapacity"
        />
      </View>

      {this.appMode()}

      <View style={styles.buttonContainer}>
        <Button
          theme={theme}
          onPress={this.calculate}
          text="Calculate"
        />
      </View>

      <View style={styles.resultContainer}>
        <Text style={theme === 'dark' ? styles.resultDark : styles.resultLight}>{this.state.result}</Text>
      </View>
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