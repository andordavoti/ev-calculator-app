import React from 'react'
import { Text, View, StyleSheet, Keyboard } from 'react-native'
import * as Haptics from 'expo-haptics'

import Input from '../components/Input'
import Dropdown from '../components/Dropdown'
import Button from '../components/Button'
import { connect } from 'react-redux'

class RangeScreen extends React.Component {

    state = {
        cellCapacity: null,
        cellVoltage: null,
        whPerMile: null,
        cellsInSeries: null,
        cellsInParallell: null,
        result: ''
    }

    calculate = () => {
        Keyboard.dismiss()

        const { cellCapacity, cellVoltage, whPerMile, cellsInSeries, cellsInParallell } = this.state
        const { units } = this.props

        const resultMiles = cellsInParallell * cellCapacity * cellVoltage * cellsInSeries / whPerMile
        const resultKm = resultMiles * 1.60934

        if (units === 'metric') {
            if (!isNaN(resultKm) && cellVoltage !== null && whPerMile !== null) {
                if (Platform.OS === 'ios') Haptics.notificationAsync('success')
                this.setState({ result: 'Estimated range: ' + resultKm.toFixed(2) + ' km' })
            }
            else {
                if (Platform.OS === 'ios') Haptics.notificationAsync('error')
                this.setState({ result: 'Please fill out all fields' })
            }
        }
        else {
            if (!isNaN(resultMiles)) {
                if (Platform.OS === 'ios') Haptics.notificationAsync('success')
                this.setState({ result: 'Estimated range: ' + resultMiles.toFixed(2) + ' miles' })
            }
            else {
                if (Platform.OS === 'ios') Haptics.notificationAsync('error')
                this.setState({ result: 'Please fill out all fields' })
            }
        }
    }

    onValueChange = (value, type) => {
        if (isNaN(value)) {
            const number = parseFloat(value.replace(",", "."))
            this.setState({ [type]: number })
        }
        else this.setState({ [type]: value })
    }

    appMode = () => {
        const { appMode } = this.props

        if (appMode === 'advanced') {
            return <View style={styles.container}>
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
        }
        else if (appMode === 'simple') {

            return <View style={styles.container}>
                <Dropdown
                    onValueChange={this.onValueChange}
                    type="cellVoltage"
                    placeholder={{ label: 'Battery type', value: null, color: '#9EA0A4' }}
                    items={[
                        {
                            label: 'Li-Po/Li-Ion (4.2V)',
                            value: 4.2,
                        },
                        {
                            label: 'Li-Fe (3.6V)',
                            value: 3.6,
                        }
                    ]}
                />

                <Dropdown
                    onValueChange={this.onValueChange}
                    type="whPerMile"
                    placeholder={{ label: 'Select setup', value: null, color: '#9EA0A4' }}
                    items={[
                        {
                            label: 'Single Motor (15Wh/mi)',
                            value: 15,
                        },
                        {
                            label: 'Dual Motor (25Wh/mi)',
                            value: 25,
                        },
                        {
                            label: 'Single Hub Motor (25Wh/mi)',
                            value: 30,
                        },
                        {
                            label: 'Dual Hub Motor (35Wh/mi)',
                            value: 35,
                        }
                    ]}
                />
            </View>
        }
    }

    render() {
        const { theme } = this.props

        return <View style={theme === 'dark' ? styles.containerDark : styles.containerLight}>
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
                        text="Cell Capacity (Ah):"
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
                    <Text style={theme === 'dark' ? styles.resultDark : styles.resultLight}>{this.state.result}</Text>
                </View>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    containerLight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    containerDark: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1c1c1c'
    },
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

const mapStateToProps = ({ settings }) => ({
    theme: settings.theme,
    units: settings.units,
    appMode: settings.appMode,
})

export default connect(mapStateToProps)(RangeScreen)