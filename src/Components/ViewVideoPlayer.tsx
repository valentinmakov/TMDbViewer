import React from 'react'
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import Modal from 'react-native-modal'

interface IViewVideoPlayerProps {
    isVisible: boolean,
    performModalVideoPlayerHide: () => void,
}

const ViewVideoPlayer: React.FC<IViewVideoPlayerProps> = ({isVisible, performModalVideoPlayerHide}: IViewVideoPlayerProps): React.ReactElement<IViewVideoPlayerProps> => {
    return (
        <Modal
            isVisible={isVisible}
            animationIn={'bounceIn'}
            animationOut={'bounceOut'}
            useNativeDriver={true}
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => performModalVideoPlayerHide()}>
                    <Text style={{color: 'white'}}>Modal</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default ViewVideoPlayer
