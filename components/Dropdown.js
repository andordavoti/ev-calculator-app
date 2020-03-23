import React from 'react'
import { StyleSheet, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'

const Dropdown = ({ items, placeholder, value, onValueChange, theme, type }) => {
    return <View style={stylesDark.container}>
        <RNPickerSelect
            Icon={() => { return <Ionicons name='md-arrow-down' size={24} color={theme === 'dark' ? 'white' : 'gray'} /> }}
            style={theme === 'dark' ? { ...stylesDark, iconContainer: { top: 10, right: 12 } } : { ...stylesLight, iconContainer: { top: 10, right: 12 } }}
            useNativeAndroidPickerStyle={false}
            placeholder={placeholder}
            items={items}
            value={value}
            onValueChange={(value) => {
                if (value !== null) {
                    onValueChange(type, value)
                }
            }}
        />
    </View>
}

const stylesDark = StyleSheet.create({
    container: {
        paddingBottom: 20
    },
    inputIOS: {
        textAlign: 'center',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: 10,
        color: 'white',
        paddingRight: 30,
    },
    inputAndroid: {
        textAlign: 'center',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: 10,
        color: 'white',
        paddingRight: 30,
    },
})

const stylesLight = StyleSheet.create({
    container: {
        paddingBottom: 20
    },
    inputIOS: {
        textAlign: 'center',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1.5,
        borderColor: 'gray',
        borderRadius: 10,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        textAlign: 'center',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1.5,
        borderColor: 'gray',
        borderRadius: 10,
        color: 'black',
        paddingRight: 30,
    },
})

const mapStateToProps = ({ settings }) => ({
    theme: settings.theme,
})

export default connect(mapStateToProps)(Dropdown)