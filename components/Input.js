import React, { Component } from 'react';
import {
    StyleSheet, Dimensions, View, Text
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
                <Text style={styles.text}>{this.props.text}</Text>
            <View style={styles.inputContainer}>
            <TextInput
                returnKeyType='done'
                keyboardType="decimal-pad"
                style={styles.input}
                onChangeText={this.onValueChange}
                value={this.props.value}
                textAlign={'center'}
            />
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        paddingLeft: Dimensions.get('window').width / 5,
        paddingBottom: 20
    },
    inputContainer: {
        flex: 0.5,
    },
    input: {
        minHeight: 40,
        maxWidth: 40,
        borderColor: 'gray',
        borderWidth: 1.5,
        marginLeft: 10,
        borderRadius: 8,
        fontSize: 18,
    },
    text: {
        flex: 0.6,
        width: 350,
        fontSize: 18,
        textAlign: 'right',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
});