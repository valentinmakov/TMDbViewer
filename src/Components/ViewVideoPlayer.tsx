import React, {
    MutableRefObject,
    useEffect,
    useState,
} from 'react'
import {
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import Modal from 'react-native-modal'
import Video, {
    OnLoadData,
    OnProgressData,
} from 'react-native-video'
import {VideoControls} from '../UIKit'

interface IViewVideoPlayerProps {
    isVisible: boolean,
    performModalVideoPlayerHide: () => void,
}

// Local variable for controlling how long video controls should be visible
let controlsVisibleTimeot: number

/**
 * Renders full screen video player
 */
const ViewVideoPlayer: React.FC<IViewVideoPlayerProps> = (
    {
        isVisible,
        performModalVideoPlayerHide
    }: IViewVideoPlayerProps
): React.ReactElement<IViewVideoPlayerProps> => {
    // Object for direct control of video flow
    const videoRef: MutableRefObject<Video | null> = React.useRef(null)
    // Controls visibility of video controls
    const [isControlsVisible, setIsControlsVisible] = useState<boolean>(false)
    // Indicates whether video is paused
    const [isPause, setIsPause] = useState<boolean>(false)
    // Shows how much time elapsed during playback
    const [progressTime, setProgressTime] = useState<number>(0)
    // Returns duration of the video
    const [duration, setDuration] = useState<number>(0)

    // Enables moving of time indicator
    const updateProgressTime = (time: OnProgressData): void => {
        setProgressTime(time.currentTime)
        // Stops playback when end of video reached
        if (Math.trunc(time.currentTime) === Math.trunc(duration)) {
            setIsPause(true)
        }
    }

    // Switches between playback and pause modes
    const playbackOrPause = (): void => {
        // End of video is not reached: continues playback
        if (Math.trunc(progressTime) < Math.trunc(duration)) {
            setIsPause(!isPause)
        } else {
            // End of video is reached: starts playback again 
            if (videoRef.current) {
                videoRef.current.seek(0)
                setProgressTime(0)
                setIsPause(!isPause)
            }
        }
    }

    // Rewinding ten seconds back
    const backward = (): void => {
        if (videoRef.current) {
            const targetTime: number = progressTime - 10
            videoRef.current.seek(targetTime)
            // Does not allow negative timestamp
            setProgressTime(targetTime < 0 ? 0 : targetTime)
            // Restarts timeout for video controls disappearing
            clearTimeout(controlsVisibleTimeot)
            controlsVisibleTimeot = window.setTimeout(() => setIsControlsVisible(false), 3000)
        }
    }

    // Moving ten seconds forward
    const forward = (): void => {
        if (videoRef.current) {
            const targetTime: number = progressTime + 10
            videoRef.current.seek(targetTime)
            // Does not allow timestamp to exceed duration
            // If it timestamp exceeda duration stops playback
            setProgressTime(targetTime > duration ? duration : targetTime)
            if (targetTime > duration) {
                setIsPause(true)
            }
            // Restarts timeout for video controls disappearing
            clearTimeout(controlsVisibleTimeot)
            controlsVisibleTimeot = window.setTimeout(() => setIsControlsVisible(false), 3000)
        }
    }

    // Removes unnecessary timeouts when video controls visibility mode changes
    useEffect(() => {
        if (isControlsVisible) {
            if (controlsVisibleTimeot) {
                clearTimeout(controlsVisibleTimeot)
            }
            controlsVisibleTimeot = window.setTimeout(() => setIsControlsVisible(false), 3000)
        } else {
            if (controlsVisibleTimeot) {
                clearTimeout(controlsVisibleTimeot)
            }
        }
    }, [isControlsVisible])

    // Restarts timeout for video controls disappearing when pause button hit
    useEffect(() => {
        if (controlsVisibleTimeot) {
            clearTimeout(controlsVisibleTimeot)
        }
        controlsVisibleTimeot = window.setTimeout(() => setIsControlsVisible(false), 3000)
    }, [isPause])

    // Ensures that video starts playing from zero timestamp when Modal opens
    useEffect(() => {
        if (isVisible && (progressTime !== 0 || isPause)) {
            if (videoRef.current) {
                videoRef.current.seek(0)
                setProgressTime(0)
                setIsPause(false)
                setIsControlsVisible(false)
            }
        }
    }, [isVisible])

    return (
        <Modal
            isVisible={isVisible}
            useNativeDriver={true}
            style={styles.modal}
            backdropOpacity={1}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    style={styles.touchableContainer}
                    onPress={() => setIsControlsVisible(!isControlsVisible)}
                    disabled={false}
                >
                    <View style={styles.videoContainer}>
                        <Video
                            resizeMode={'contain'}
                            source={require('../Assets/big_buck_bunny.mp4')}
                            paused={isPause}
                            style={styles.video}
                            onLoad={(loadData: OnLoadData): void => setDuration(loadData.duration)}
                            onProgress={updateProgressTime}
                            ref={videoRef}
                        />
                        <VideoControls
                            isVisible={isControlsVisible}
                            isPause={isPause}
                            timeElapsed={progressTime}
                            timeLeft={duration - progressTime}
                            duration={duration}
                            onPlayOrPause={playbackOrPause}
                            onBackward={backward}
                            onForward={forward}
                            onClose={performModalVideoPlayerHide}
                        />
                    </View>
                </TouchableWithoutFeedback>
                
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    container: {
        flex: 1,
    },
    touchableContainer: {
        flex: 1,
    },
    videoContainer: {
        flex: 1,
    },
    video: {
        ...StyleSheet.absoluteFillObject,
    }
})

export default ViewVideoPlayer
