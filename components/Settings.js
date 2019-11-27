import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';

export default class Settings extends Component {
    state = { appMode: '', driveSystem: '', units: '' };

    componentWillMount() {
        this.getUserSettings();
    }

    getUserSettings = async () => {
        const settingsArray = await AsyncStorage.getItem('settingsArray');
        const data = JSON.parse(settingsArray);
    
        if(!data === null){
            this.setState({
              appMode: data.appMode,
              driveSystem: data.driveSystem,
              units: data.units,
            });
          }
      }

    saveSettings = () => {
        const { appMode, driveSystem, units } = this.state

        const settingsArray = {
            appMode,
            driveSystem,
            units
        };
        AsyncStorage.setItem('settingsArray', JSON.stringify(settingsArray));
    };

    onValueChange = (value, type) => {
        this.setState({ [type]: value });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Select App Mode:</Text>
                <Dropdown
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

                <Text style={styles.text}>Select Drive System:</Text>
                <Dropdown
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

                <Text style={styles.text}>Select Units of Measurement:</Text>
                <Dropdown
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
                        text="Save Settings"
                        onPress={this.saveSettings}
                    />
                </View>

                <Text style={styles.textVersion}>Version: {Constants.manifest.version}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        paddingTop: 50
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        paddingBottom: 10
    },
    textVersion: {
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 10
    },
});