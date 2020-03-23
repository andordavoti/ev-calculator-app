import { SettingsActionTypes } from './settings.types'

const INITIAL_STATE = {
    theme: 'light',
    units: 'metric',
    appMode: 'simple',
    driveSystem: 'belt'
}

const settingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SettingsActionTypes.SET_THEME:
            return {
                ...state,
                theme: action.payload
            }
        case SettingsActionTypes.SET_UNITS:
            return {
                ...state,
                units: action.payload
            }
        case SettingsActionTypes.SET_APP_MODE:
            return {
                ...state,
                appMode: action.payload
            }
        case SettingsActionTypes.SET_DRIVE_SYSTEM:
            return {
                ...state,
                driveSystem: action.payload
            }
        default:
            return state
    }
}

export default settingsReducer