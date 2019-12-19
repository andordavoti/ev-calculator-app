import React from 'react';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import Speed from '../components/Speed';

export default class SpeedScreen extends React.Component {
    state = {
        appMode: '',
        driveSystem: '',
        units: '',
    };

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            this.getUserSettings();
        });
    }

    getUserSettings = async () => {
        const settingsArray = await AsyncStorage.getItem('settingsArray');
        const data = JSON.parse(settingsArray);

        if (data !== null) {
            this.setState({
                appMode: data.appMode,
                driveSystem: data.driveSystem,
                units: data.units,
            });
        }
        else {
            console.log('data is null');
        }
    }

    render() {
        let theme = this.props.screenProps;
        return (
            <View style={theme === 'dark' ? styles.containerDark : styles.containerLight}>
                <Speed
                    theme={theme}
                    appMode={this.state.appMode}
                    units={this.state.units}
                    driveSystem={this.state.driveSystem}
                />
            </View>
        );
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
});