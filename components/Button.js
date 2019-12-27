import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, text, theme }) => {
    
    return (
        <TouchableOpacity onPress={onPress} style={theme === 'dark' ? styles.buttonDark : styles.buttonLight}>
            <Text 
            style={theme === 'dark' ? styles.textDark : styles.textLight}>{text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textDark: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        padding: 10,
    },
    textLight: {
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
        padding: 10
    },
    buttonDark: {
        justifyContent: 'center',
        backgroundColor: '#1c1c1c',
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: 10,
    },
    buttonLight: {
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderColor: 'gray',
        borderRadius: 10,
    }
};

export default Button;
