import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

export default class InputContainer extends Component {

    render() {
        return (
            <View style={styles.InputContainer}>
                <Text style={styles.text}>{this.props.text}</Text>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        flex: 1,
        width: 350,
        fontSize: 18,
        textAlign: 'right',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    InputContainer: {
        flexDirection: 'row',
        paddingTop: 30,
        width: Dimensions.get('window').width,
        paddingLeft: Dimensions.get('window').width / 5,
    },
});