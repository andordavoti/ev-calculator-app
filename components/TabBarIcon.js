import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function TabBarIcon({ theme, focused, name }) {
    if (theme === 'dark') {
        return <MaterialCommunityIcons
            name={name}
            size={26}
            style={{ marginBottom: -3 }}
            color={focused ? 'white' : 'gray'}
        />
    }
    return <MaterialCommunityIcons
        name={name}
        size={26}
        style={{ marginBottom: -3 }}
        color={focused ? 'black' : '#ccc'}
    />
}
