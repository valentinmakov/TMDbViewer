import React from 'react'
import {View, Text} from 'react-native'
import {RouteProp} from '@react-navigation/native'
import {RootStackParamList} from '../../App'

interface IProps {
    route: RouteProp<RootStackParamList, 'Details'>,
}

const ContainerDetails = ({route}: IProps) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Details</Text>
            <Text style={{color: 'white'}}>{route.params.title}</Text>
        </View>
    )
}

export default ContainerDetails
