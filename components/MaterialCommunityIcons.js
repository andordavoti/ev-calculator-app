import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Colors from '../constants/Colors'

export default function TabBarIcon({ name, focused }) {
  return <MaterialCommunityIcons
    name={name}
    size={26}
    style={{ marginBottom: -3 }}
    color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
}
