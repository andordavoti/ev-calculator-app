import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

export default class Dropdown extends Component {
    state = { selectedValue: '' };

    componentDidUpdate(prevProps) {
        if(this.props.value !== prevProps.value){
            this.setState({ selectedValue: this.props.value });
        }
    }
    
    onValueChange = (value) => {
        this.setState({ selectedValue: value })
        this.props.onValueChange(value, this.props.type);
    };

    render() {
        const items = this.props.items;
        const placeholder = this.props.placeholder;
        return (
            <View style={stylesDark.container}>
                <RNPickerSelect
                    placeholder={placeholder}
                    items={items}
                    onValueChange={this.onValueChange}
                    value={this.state.selectedValue}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: 'yellow' }}
                    Icon={() => { return <Ionicons name="md-arrow-down" size={24} color={this.props.theme === 'dark' ? 'white' : 'gray'} />; }}
                    style={this.props.theme === 'dark' ? {...stylesDark, iconContainer: { top: 10, right: 12 }} : {...stylesLight, iconContainer: { top: 10, right: 12 }}}
                />
            </View>
        );
    }
}

const stylesDark = StyleSheet.create({
    container: {
        marginLeft: 80,
        marginRight: 80,
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
});

const stylesLight = StyleSheet.create({
    container: {
        marginLeft: 80,
        marginRight: 80,
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
});