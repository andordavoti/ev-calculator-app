import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import * as Haptics from 'expo-haptics'
import Constants from 'expo-constants'
import { connect } from 'react-redux'
import { Switch } from 'react-native-paper';

import { setUnits, setAppMode, setDriveSystem, useSystemTheme, setCurrentTheme, useHaptics } from '../redux/settings/settings.action'

import Dropdown from '../components/Dropdown'

class SettingsScreen extends React.Component {

    state = { selectedTheme: 'system' }

    componentDidMount() {
        const { systemTheme, theme } = this.props

        if (systemTheme) this.setState({ selectedTheme: 'system' })
        else this.setState({ selectedTheme: theme })

    }


    onValueChange = (type, value) => {
        if (Platform.OS === 'ios') Haptics.selectionAsync()

        const { setUnits, setAppMode, setDriveSystem, useSystemTheme, setCurrentTheme } = this.props

        switch (type) {
            case 'setAppMode':
                setAppMode(value)
                break
            case 'setDriveSystem':
                setDriveSystem(value)
                break
            case 'setUnits':
                setUnits(value)
                break
            case 'theme':
                if (value === 'system') {
                    useSystemTheme(true)
                    this.setState({ selectedTheme: 'system' })
                }
                if (value === 'light' || value === 'dark') {
                    this.setState({ selectedTheme: value })
                    setCurrentTheme(value)
                    useSystemTheme(false)
                }
                break
            default:
                break
        }
    }

    render() {
        const { theme, appMode, driveSystem, units, hapticsEnabled, useHaptics } = this.props
        return <View style={theme === 'dark' ? styles.containerDark : styles.containerLight}>
            <View style={styles.container}>
                <Text style={theme === 'dark' ? styles.textDark : styles.textLight}>Select App Mode:</Text>
                <Dropdown
                    value={appMode}
                    onValueChange={this.onValueChange}
                    type='setAppMode'
                    placeholder={{ label: 'Simple or Advanced Mode', value: null, color: '#9EA0A4' }}
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
                    value={driveSystem}
                    onValueChange={this.onValueChange}
                    type='setDriveSystem'
                    placeholder={{ label: 'Belt Drive or Hub Drive', value: null, color: '#9EA0A4' }}
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

                <Text style={theme === 'dark' ? styles.textDark : styles.textLight}>Select Unit of Measurement:</Text>
                <Dropdown
                    value={units}
                    onValueChange={this.onValueChange}
                    type='setUnits'
                    placeholder={{ label: 'Select Units', value: null, color: '#9EA0A4' }}
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

                <Text style={theme === 'dark' ? styles.textDark : styles.textLight}>App theme:</Text>
                <Dropdown
                    value={this.state.selectedTheme}
                    onValueChange={this.onValueChange}
                    type='theme'
                    placeholder={{ label: 'Select Theme', value: null, color: '#9EA0A4' }}
                    items={[
                        {
                            label: 'System',
                            value: 'system',
                        },
                        {
                            label: 'Light',
                            value: 'light',
                        },
                        {
                            label: 'Dark',
                            value: 'dark',
                        }
                    ]}
                />

                {
                    Platform.OS === 'ios' ?
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={theme === 'dark' ? styles.textDark : styles.textLight}>Haptics: </Text>
                            <Switch
                                color='grey'
                                value={hapticsEnabled}
                                onValueChange={() => useHaptics(!hapticsEnabled)
                                }
                            />
                        </View>
                        : null
                }

                <Text style={theme === 'dark' ? styles.textVersionDark : styles.textVersionLight}>Version: {Constants.manifest.version}</Text>
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

const mapStateToProps = ({ settings }) => ({
    theme: settings.theme,
    systemTheme: settings.systemTheme,
    hapticsEnabled: settings.hapticsEnabled,
    units: settings.units,
    appMode: settings.appMode,
    driveSystem: settings.driveSystem
})

export default connect(mapStateToProps, { setUnits, setAppMode, setDriveSystem, useSystemTheme, setCurrentTheme, useHaptics })(SettingsScreen)