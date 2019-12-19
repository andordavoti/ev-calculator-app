import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabBarIcon(props) {
    if (props.theme === 'dark') {
        return (
            <MaterialCommunityIcons
                name={props.name}
                size={26}
                style={{ marginBottom: -3 }}
                color={props.focused ? 'white' : 'gray'}
            />
        )
    }
    return (
        <MaterialCommunityIcons
            name={props.name}
            size={26}
            style={{ marginBottom: -3 }}
            color={props.focused ? 'black' : '#ccc'}
        />
    );
}
