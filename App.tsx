import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native'
import {Provider} from 'react-redux'
import {enableScreens} from 'react-native-screens'
import 'react-native-gesture-handler'
import {
    DarkTheme,
    NavigationContainer,
} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import store from './src/Store/store'
import ContainerApp from './src/Containers/ContainerApp'
import ContainerDetails from './src/Containers/ContainerDetails'

export type RootStackParamList = {
    Main: undefined,
    Details: {
        id: number,
        title: string,
    },
}

enableScreens()

const colorScheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        card: '#000',
        border: '#000',
        primary: '#FFF',
    }
}
const Stack = createStackNavigator<RootStackParamList>()

const App: React.FC = (): React.ReactElement => {
    return (
        <Provider store={store}>
            <SafeAreaView style={styles.safeArea}>
                <NavigationContainer theme={colorScheme}>
                    <Stack.Navigator
                        initialRouteName={'Main'}
                        screenOptions={{
                            headerBackTitleVisible: false,
                        }}
                    >
                        <Stack.Screen
                            name={'Main'}
                            component={ContainerApp}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name={'Details'}
                            component={ContainerDetails}
                            options={{title: ''}}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </Provider>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#000',
        flex: 1,
    },
})

export default App
