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
        paddingTop: 10,
        paddingBottom: 10,
    },
    textLight: {
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonDark: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#1c1c1c',
        borderWidth: 1.5,
        borderColor: 'white',
        marginLeft: 135,
        marginRight: 135,
        borderRadius: 10,
        height: 45,
    },
    buttonLight: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderColor: 'gray',
        marginLeft: 135,
        marginRight: 135,
        borderRadius: 10,
        height: 45,
    }
};

export default Button;
