import React from 'react';
import { View, StyleSheet } from 'react-native';
import Settings from '../components/Settings';

export default class SettingsScreen extends React.Component {
    render() {
        let theme = this.props.screenProps;
        return (
            <View style={theme === 'dark' ? styles.containerDark : styles.containerLight}>
                <Settings theme={this.props.screenProps} />
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