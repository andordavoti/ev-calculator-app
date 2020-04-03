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

    onValueChange = (type, value) => this.setState({ [type]: value })

    calculate = () => {
        Keyboard.dismiss()
        const { units, driveSystem } = this.props
        const { motorPulleyTeeth, wheelPulleyTeeth, motorKVRating, wheelSize, cellsInSeries, cellVoltage } = this.state

        const mpt = parseFloat(motorPulleyTeeth),
            wpt = parseFloat(wheelPulleyTeeth),
            mkr = parseFloat(motorKVRating),
            ws = parseFloat(wheelSize),
            cis = parseFloat(cellsInSeries),
            cv = parseFloat(cellVoltage)

        let gearRatio
        if (driveSystem === 'hub') gearRatio = 1
        else gearRatio = (wpt / mpt)

        const resultKph = ((mkr * cis * cv) / (gearRatio)) / ws
        const resultMph = resultKph / 1.6

        if (units === 'metric') {
            if (!isNaN(resultKph)) {
                if (Platform.OS === 'ios') Haptics.notificationAsync('success')
                this.setState({ result: 'Estimated top speed: ' + resultKph.toFixed(2) + ' km/h' })
            } else {
                if (Platform.OS === 'ios') Haptics.notificationAsync('error')
                this.setState({ result: 'Please fill out all fields' })
            }
        }

        else {
            if (!isNaN(resultMph)) {
                if (Platform.OS === 'ios') Haptics.notificationAsync('success')
                this.setState({ result: 'Estimated top speed: ' + resultMph.toFixed(2) + ' mi/h' })
            } else {
                if (Platform.OS === 'ios') Haptics.notificationAsync('error')
                this.setState({ result: 'Please fill out all fields' })
            }
        }
    }

    appMode = () => {
        const { appMode } = this.props
        const { cellVoltage } = this.state

        if (appMode === 'advanced') {
            return <Input
                value={cellVoltage}
                text='Max Cell Voltage:'
                onValueChange={this.onValueChange}
                type='cellVoltage'
            />
        }
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
        </View>
    }

    driveSystem = () => {
        const { driveSystem } = this.props
        const { motorPulleyTeeth, wheelPulleyTeeth } = this.state

        if (driveSystem === 'hub') return <View></View>
        else {
            return <View style={styles.container}>
                <Input
                    value={motorPulleyTeeth}
                    text='Motor Pulley Teeth:'
                    onValueChange={this.onValueChange}
                    type='motorPulleyTeeth'
                />
                <Input
                    value={wheelPulleyTeeth}
                    text='Wheel Pulley Teeth:'
                    onValueChange={this.onValueChange}
                    type='wheelPulleyTeeth'
                />
            </View>
        }
    }

    render() {
        const { theme } = this.props
        const { motorKVRating, wheelSize, cellsInSeries } = this.state

        return <View style={theme === 'dark' ? styles.containerDark : styles.containerLight}>
            <View style={styles.container}>
                {this.driveSystem()}
                <Input
                    value={motorKVRating}
                    text='Motor KV Rating:'
                    onValueChange={this.onValueChange}
                    type='motorKVRating'
                />
                <Input
                    value={wheelSize}
                    text='Wheel Size (mm):'
                    onValueChange={this.onValueChange}
                    type='wheelSize'
                />
                <Input
                    value={cellsInSeries}
                    text='Cells in Series:'
                    onValueChange={this.onValueChange}
                    type='cellsInSeries'
                />
                {this.appMode()}
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.calculate}
                        text='Calculate'
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

const mapStateToProps = ({ settings: { theme, units, appMode, driveSystem } }) => ({
    theme,
    units,
    appMode,
    driveSystem
})

export default connect(mapStateToProps)(SpeedScreen)