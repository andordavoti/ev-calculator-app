import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'

const TabBarIcon = ({ theme, focused, name }) => {
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

const mapStateToProps = ({ settings }) => ({
    theme: settings.theme,
})

export default connect(mapStateToProps)(TabBarIcon)