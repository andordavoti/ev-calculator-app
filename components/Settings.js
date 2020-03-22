import React, { Component } from 'react'
import { View, Text, AsyncStorage, StyleSheet } from 'react-native'
import * as Haptics from 'expo-haptics'

import Constants from 'expo-constants'
import Dropdown from '../components/Dropdown'
import Button from '../components/Button'

export default class Settings extends Component {
    state = { appMode: '', driveSystem: '', units: '' }

    componentDidMount() {
        this.getUserSettings()
    }

    getUserSettings = async () => {
        const settingsArray = await AsyncStorage.getItem('settingsArray')
        const data = JSON.parse(settingsArray)

        if (data !== null) {
            this.setState({
                appMode: data.appMode,
                driveSystem: data.driveSystem,
                units: data.units,
            })
        }
        else console.log('data is null')
    }

    saveSettings = () => {
        if (Platform.OS === 'ios') Haptics.notificationAsync('success')

        const { appMode, driveSystem, units } = this.state

        const settingsArray = {
            appMode,
            driveSystem,
            units
        }
        AsyncStorage.setItem('settingsArray', JSON.stringify(settingsArray))
    }

    onValueChange = (value, type) => this.setState({ [type]: value })

    render() {
        let theme = this.props.theme
        return <View style={styles.container}>
            <Text style={theme === 'dark' ? styles.textDark : styles.textLight}>Select App Mode:</Text>
            <Dropdown
                theme={theme}
                value={this.state.appMode}
                onValueChange={this.onValueChange}
                type="appMode"
                placeholder={{ label: 'Simple or Advanced Mode', value: 'default', color: '#9EA0A4' }}
                items={[
                    {
                        label: 'Simple Mode',
                        value: 'simple',
                    },
                    {
                        label: 'Advanced Mode',
                        value: 'advanced',
                    },
                ]}
            />

            <Text style={theme === 'dark' ? styles.textDark : styles.textLight}>Select Drive System:</Text>
            <Dropdown
                theme={theme}
                value={this.state.driveSystem}
                onValueChange={this.onValueChange}
                type="driveSystem"
                placeholder={{ label: 'Belt Drive or Hub Drive', value: 'default', color: '#9EA0A4' }}
                items={[
                    {
                        label: 'Belt Drive',
                        value: 'belt',
                    },
                    {
                        label: 'Hub Drive',
                        value: 'hub',
                    },
                ]}
            />

            <Text style={theme === 'dark' ? styles.textDark : styles.textLight}>Select Units of Measurement:</Text>
            <Dropdown
                theme={theme}
                value={this.state.units}
                onValueChange={this.onValueChange}
                type="units"
                placeholder={{ label: 'Select Units', value: 'default', color: '#9EA0A4' }}
                items={[
                    {
                        label: 'Metric',
                        value: 'metric',
                    },
                    {
                        label: 'Imperial',
                        value: 'imperial',
                    },
                ]}
            />

            <View style={styles.buttonContainer}>
                <Button
                    theme={theme}
                    text="Save Settings"
                    onPress={this.saveSettings}
                />
            </View>

            <Text style={theme === 'dark' ? styles.textVersionDark : styles.textVersionLight}>Version: {Constants.manifest.version}</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    buttonContainer: {
        paddingTop: 10,
        alignItems: 'center',
    },
    textDark: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        paddingBottom: 10
    },
    textVersionDark: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 10
    },
    textLight: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        paddingBottom: 10
    },
    textVersionLight: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 10
    },
})