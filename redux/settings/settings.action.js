import { SettingsActionTypes } from './settings.types'

export const setCurrentTheme = theme => {
    return {
        type: SettingsActionTypes.SET_THEME,
        payload: theme
    }
}

export const useSystemTheme = systemTheme => {
    return {
        type: SettingsActionTypes.USE_SYSTEM_THEME,
        payload: systemTheme
    }
}

export const useHaptics = hapticsEnabled => {
    return {
        type: SettingsActionTypes.USE_HAPTICS,
        payload: hapticsEnabled
    }
}

export const setUnits = units => {
    return {
        type: SettingsActionTypes.SET_UNITS,
        payload: units
    }
}

export const setAppMode = appMode => {
    return {
        type: SettingsActionTypes.SET_APP_MODE,
        payload: appMode
    }
}

export const setDriveSystem = driveSystem => {
    return {
        type: SettingsActionTypes.SET_DRIVE_SYSTEM,
        payload: driveSystem
    }
}