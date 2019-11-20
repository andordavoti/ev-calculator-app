import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

export default class Dropdown extends Component {
    state = { selectedValue: '' };

    onValueChange = (value) => {
        this.setState({ selectedValue: value })
        this.props.onValueChange(value, this.props.type);
    }

    render() {
        const items = this.props.items;
        const placeholder = this.props.placeholder;

        return (
            <View style={styles.container}>
                <RNPickerSelect
                    placeholder={placeholder}
                    items={items}
                    onValueChange={this.onValueChange}
                    value={this.state.selectedValue}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: 'yellow' }}
                    Icon={() => { return <Ionicons name="md-arrow-down" size={24} color="gray" />; }}
                    style={{
                        ...styles,
                        iconContainer: {
                            top: 10,
                            right: 12,
                        },
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 37,
        paddingLeft: 67,
        paddingRight: 67
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
        paddingRight: 30, // to ensure the text is never behind the icon
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
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
