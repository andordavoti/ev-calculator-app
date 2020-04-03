import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import AppNavigator from './components/AppNavigator'
import stores from './redux/store'

const { store, persistor } = stores()

const App = () => {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppNavigator />
    </PersistGate>
  </Provider>
}

export default App