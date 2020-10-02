import React from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
} from 'react-native'

const App: React.FC = (): React.ReactElement => {
    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <SafeAreaView style={{backgroundColor: '#000', flex: 1}}>
                <View style={{backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#FFF'}}>Test</Text>
                </View>
            </SafeAreaView>
        </>
    )
}

export default App