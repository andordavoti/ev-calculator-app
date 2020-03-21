import React, { Component } from 'react'
import { StyleSheet, Dimensions, View, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default class Input extends Component {
    state = { value: '' }

    onValueChange = (value) => this.props.onValueChange(value, this.props.type)

    render() {
        return <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={this.props.theme === 'dark' ? styles.textDark : styles.textLight}>{this.props.text}</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    returnKeyType='done'
                    keyboardType="decimal-pad"
                    style={this.props.theme === 'dark' ? styles.inputDark : styles.inputLight}
                    onChangeText={this.onValueChange}
                    value={this.props.value}
                    textAlign={'center'}
                />
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        paddingBottom: 20,
    },
    textContainer: {
        flex: 1,
        margin: 10
    },
    inputContainer: {
        width: 40,
        height: 40,
        marginRight: Dimensions.get('window').width / 3.5
    },
    inputDark: {
        height: 40,
        width: 40,
        borderColor: 'white',
        borderWidth: 1.5,
        marginLeft: 10,
        borderRadius: 8,
        fontSize: 18,
        color: 'white'
    },
    inputLight: {
        height: 40,
        width: 40,
        borderColor: 'gray',
        borderWidth: 1.5,
        marginLeft: 10,
        borderRadius: 8,
        fontSize: 18,
        color: 'black'
    },
    textDark: {
        fontSize: 16,
        textAlign: 'right',
        color: 'white',
    },
    textLight: {
        fontSize: 16,
        textAlign: 'right',
        color: 'black',
    },
})