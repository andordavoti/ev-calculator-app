import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, text }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} style={Styles.buttonStyle}>
            <Text 
            style={Styles.textStyle}>{text}
            </Text>
        </TouchableOpacity>
    );
};

const Styles = {
    textStyle: {
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1.5,
        borderColor: 'gray',
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 10,
        minHeight: 45,
    }
};

export default Button;
