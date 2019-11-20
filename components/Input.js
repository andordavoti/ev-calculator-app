import React, { Component } from 'react';
import {
    StyleSheet, Dimensions, View
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Input extends Component {
    state = { value: '' };

    onValueChange = (value) => {
        this.props.onValueChange(value, this.props.type);
    }

    render() {
        return (
            <View style={styles.container}>
            <TextInput
                returnKeyType='done'
                keyboardType="decimal-pad"
                style={styles.textInput}
                onChangeText={this.onValueChange}
                value={this.props.value}
                textAlign={'center'}
            />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        flex: 1,
        minHeight: 40,
        maxWidth: 40,
        borderColor: 'gray',
        borderWidth: 1.5,
        marginLeft: 10,
        borderRadius: 4,
        fontSize: 18,
    },
});