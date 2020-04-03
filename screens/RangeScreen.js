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

    onValueChange = (type, value) => this.setState({ [type]: value })

    calculate = () => {
        Keyboard.dismiss()
        const { units, hapticsEnabled } = this.props
        const { cellCapacity, cellVoltage, whPerMile, cellsInSeries, cellsInParallell } = this.state

        const cc = parseFloat(cellCapacity),
            cv = parseFloat(cellVoltage),
            wpm = parseFloat(whPerMile),
            cis = parseFloat(cellsInSeries),
            cip = parseFloat(cellsInParallell)

        const resultMiles = cip * cis * cc * cv / wpm
        const resultKm = resultMiles * 1.60934

        if (units === 'metric') {
            if (!isNaN(resultKm)) {
                if (Platform.OS === 'ios' && hapticsEnabled) Haptics.notificationAsync('success')
                this.setState({ result: 'Estimated range: ' + resultKm.toFixed(2) + ' km' })
            } else {
                if (Platform.OS === 'ios' && hapticsEnabled) Haptics.notificationAsync('error')
                this.setState({ result: 'Please fill out all fields' })
            }
        }
        else {
            if (!isNaN(resultMiles)) {
                if (Platform.OS === 'ios' && hapticsEnabled) Haptics.notificationAsync('success')
                this.setState({ result: 'Estimated range: ' + resultMiles.toFixed(2) + ' miles' })
            } else {
                if (Platform.OS === 'ios' && hapticsEnabled) Haptics.notificationAsync('error')
                this.setState({ result: 'Please fill out all fields' })
            }
        }
    }

    appMode = () => {
        const { appMode } = this.props
        const { cellVoltage, whPerMile } = this.state

        if (appMode === 'advanced') {
            return <View style={styles.container}>
                <Input
                    value={cellVoltage}
                    text='Max Cell Voltage:'
                    onValueChange={this.onValueChange}
                    type='cellVoltage'
                />
                <Input
                    value={whPerMile}
                    text='Wh per mile:'
                    onValueChange={this.onValueChange}
                    type='whPerMile'
                />
            </View>
        }
        else if (appMode === 'simple') {

            return <View style={styles.container}>
                <Dropdown
                    value={cellVoltage}
                    onValueChange={this.onValueChange}
                    type='cellVoltage'
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
                    value={whPerMile}
                    onValueChange={this.onValueChange}
                    type='whPerMile'
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
        const { cellCapacity, cellsInSeries, cellsInParallell } = this.state

        return <View style={theme === 'dark' ? styles.containerDark : styles.containerLight}>
            <View style={styles.container}>
                <View style={styles.InputContainer}>
                    <Input
                        value={cellsInSeries}
                        text='Cells in Series:'
                        onValueChange={this.onValueChange}
                        type='cellsInSeries'
                    />

                    <Input
                        value={cellsInParallell}
                        text='Cells in Parallell:'
                        onValueChange={this.onValueChange}
                        type='cellsInParallell'
                    />

                    <Input
                        value={cellCapacity}
                        text='Cell Capacity (Ah):'
                        onValueChange={this.onValueChange}
                        type='cellCapacity'
                    />
                </View>

                {this.appMode()}

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.calculate}
                        text='Calculate'
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

const mapStateToProps = ({ settings: { theme, units, appMode, hapticsEnabled } }) => ({
    theme,
    units,
    appMode,
    hapticsEnabled
})

export default connect(mapStateToProps)(RangeScreen)