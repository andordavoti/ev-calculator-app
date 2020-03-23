import React from 'react'
import { StyleSheet, Text, View, Keyboard } from 'react-native'
import * as Haptics from 'expo-haptics'
import { connect } from 'react-redux'

import Input from '../components/Input'
import Dropdown from '../components/Dropdown'
import Button from '../components/Button'

class SpeedScreen extends React.Component {

    state = {
        motorPulleyTeeth: null,
        wheelPulleyTeeth: null,
        motorKVRating: null,
        wheelSize: null,
        cellsInSeries: null,
        cellVoltage: null,
        result: ''
    }

    calculate = () => {
        Keyboard.dismiss()

        const { motorPulleyTeeth, wheelPulleyTeeth, motorKVRating, wheelSize, cellsInSeries, cellVoltage } = this.state
        const { units, driveSystem } = this.props

        let gearRatio
        if (driveSystem === 'hub') gearRatio = 1
        else gearRatio = (wheelPulleyTeeth / motorPulleyTeeth)

        const resultKph = ((motorKVRating * cellsInSeries * cellVoltage) / (gearRatio)) / wheelSize
        const resultMph = resultKph / 1.6

        if (units === 'metric') {
            if (!isNaN(resultKph) && cellVoltage !== null) {
                if (Platform.OS === 'ios') Haptics.notificationAsync('success')
                this.setState({ result: 'Estimated top speed: ' + resultKph.toFixed(2) + ' km/h' })
            }
            else {
                if (Platform.OS === 'ios') Haptics.notificationAsync('error')
                this.setState({ result: 'Please fill out all fields' })
            }
        }
        else {
            if (!isNaN(resultMph) && cellVoltage !== null) {
                if (Platform.OS === 'ios') Haptics.notificationAsync('success')
                this.setState({ result: 'Estimated top speed: ' + resultMph.toFixed(2) + ' mi/h' })
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
            return <Input
                text="Max Cell Voltage:"
                onValueChange={this.onValueChange}
                type="cellVoltage"
            />
        }
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
        </View>
    }

    driveSystem = () => {
        const { driveSystem } = this.props
        if (driveSystem === 'hub') return <View></View>
        else {
            return <View style={styles.container}>
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
            </View>
        }
    }

    render() {
        let theme = 'dark'
        return <View style={theme === 'dark' ? styles.containerDark : styles.containerLight}>
            <View style={styles.container}>
                {this.driveSystem()}
                <Input
                    text="Motor KV Rating:"
                    onValueChange={this.onValueChange}
                    type="motorKVRating"
                />
                <Input
                    text="Wheel Size (mm):"
                    onValueChange={this.onValueChange}
                    type="wheelSize"
                />
                <Input
                    text="Cells in Series:"
                    onValueChange={this.onValueChange}
                    type="cellsInSeries"
                />
                {this.appMode()}
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.calculate}
                        text="Calculate"
                    />
                </View>
                <Text style={theme === 'dark' ? styles.resultDark : styles.resultLight}>{this.state.result}</Text>
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
    driveSystem: settings.driveSystem
})

export default connect(mapStateToProps)(SpeedScreen)