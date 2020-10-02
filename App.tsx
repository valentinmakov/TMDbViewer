import React from 'react'
import {Provider} from 'react-redux'
import store from './src/Store/store'
import ContainerApp from './src/Containers/ContainerApp'

const App: React.FC = (): React.ReactElement => {
    return (
        <Provider store={store}>
            <ContainerApp/>
        </Provider>
    )
}

export default App
