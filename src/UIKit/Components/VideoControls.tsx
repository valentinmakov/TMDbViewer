import React, {useState} from 'react'
import {
    LayoutChangeEvent,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export interface IVideoControlsProps {
    isVisible: boolean,
    isPause: boolean,
    timeElapsed: number,
    timeLeft: number,
    duration: number,
    onPlayOrPause: () => void,
    onBackward: () => void,
    onForward: () => void,
    onClose: () => void,
}

/**
 * Renders layer with video controls buttons
 */
const VideoControls: React.FC<IVideoControlsProps> = (
    {
        isVisible,
        isPause,
        timeElapsed,
        timeLeft,
        duration,
        onPlayOrPause,
        onBackward,
        onForward,
        onClose,
    }: IVideoControlsProps
): React.ReactElement<IVideoControlsProps> => {
    // Indicates phisical length of progress bar
    const [progressBarWidth, setProgressBarWidth] = useState<number>(0)
    // Measures phisical length of progress bar
    const measureProgressBarWidth = (layoutEvent: LayoutChangeEvent): void => {
        setProgressBarWidth(layoutEvent.nativeEvent.layout.width)
    }
    // Calculates ratio if elapsed time to total duration
    const timeElapsedRatio: number = duration === 0
        ? 0
        : Math.round((timeElapsed / duration * 100)) / 100

    return (
        <>
            <View style={[styles.opaqueLayer, isVisible ? styles.opaque : styles.transparent]}/>
            <View style={[styles.container, isVisible ? styles.solid : styles.transparent]}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => onClose()}
                    disabled={!isVisible}
                >
                    <Icon
                        name={'close'}
                        size={30}
                        color={'white'}
                    />
                </TouchableOpacity>
                <View style={styles.playbackControlsContainer}>
                    <TouchableOpacity
                        onPress={onBackward}
                        disabled={!isVisible}
                    >
                        <Icon
                            name={'replay-10'}
                            size={40}
                            color={'white'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPlayOrPause}
                        disabled={!isVisible}
                    >
                        <Icon
                            name={isPause ? 'play-arrow' : 'pause'}
                            size={40}
                            color={'white'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onForward}
                        disabled={!isVisible}
                    >
                        <Icon
                            name={'forward-10'}
                            size={40}
                            color={'white'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.progressBarContainer}>
                    <View style={styles.timestampContainer}>
                        <Text style={styles.timestamp}>{Math.trunc(timeElapsed)}</Text>
                    </View>
                    <View
                        style={styles.sliderContainer}
                        onLayout={measureProgressBarWidth}
                    >
                        <View style={styles.sliderTotalDuration}/>
                        <View style={[styles.sliderElapsedTime, {left: progressBarWidth * timeElapsedRatio}]}/>
                        <View style={[styles.sliderCircle, {left: progressBarWidth * timeElapsedRatio - 5}]}/>
                    </View>
                    <View style={styles.timestampContainer}>
                        <Text style={styles.timestamp}>{Math.trunc(timeLeft)}</Text>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    opaqueLayer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transparent: {
        opacity: 0,
    },
    opaque: {
        opacity: 0.3,
    },
    solid: {
        opacity: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    playbackControlsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    progressBarContainer: {
        position: 'absolute',
        bottom: 70,
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timestampContainer: {
        paddingHorizontal: 10,
    },
    timestamp: {
        color: 'white',
        fontWeight: '800',
    },
    sliderContainer: {
        flex: 1,
    },
    sliderTotalDuration: {
        position: 'absolute',
        width: '100%',
        height: 5,
        backgroundColor: 'white',
        borderRadius: 3,
    },
    sliderElapsedTime: {
        position: 'absolute',
        right: 0,
        height: 5,
        backgroundColor: 'black',
        borderRadius: 3,
        borderColor: 'white',
        borderWidth: 1,
    },
    sliderCircle: {
        position: 'absolute',
        top: -2,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
})

export default VideoControls
