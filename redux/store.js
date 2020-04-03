import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger'

import rootReducer from './root-reducer'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const middelwares = []

if (process.env.NODE_ENV === 'development') middelwares.push(logger)

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(...middelwares))
    let persistor = persistStore(store)
    return { store, persistor }
}