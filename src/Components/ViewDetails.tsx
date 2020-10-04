import React from 'react'
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import {Models} from 'src/Models/models'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {IDetailsProps} from '../Containers/ContainerDetails'
import * as util from '../Utilities/utilities'
import ViewVideoPlayer from './ViewVideoPlayer'

const imageHeightRatio = 1.5

const renderLoader = (): React.ReactElement<View> => {
    return (
        <View style={styles.containerEmpty}>
            <ActivityIndicator color={'#FFF'}/>
        </View>
    )
}

const renderError = (error: Models.IError): React.ReactElement<View> => {
    return (
        <View style={styles.containerEmpty}>
            <View style={styles.errorMessageContainer}>
                <Text style={styles.errorMessage}>{util.getErrorMessage(error)}</Text>
            </View>
        </View>
    )
}

const renderContent = (
    details: Models.IDetails | null,
    imageConfig: Models.IImageConfig | null,
    isModalVideoPlayerVisible: boolean,
    performModalVideoPlayerShow: () => void,
    performModalVideoPlayerHide: () => void,
): React.ReactElement<View> | null => {
    if (!details || !imageConfig) {
        return null
    }

    return (
        <>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.container}>
                    <View style={styles.imageContainer}>
                        <FastImage
                            style={styles.image}
                            source={{uri: details.imageUrl ? util.getImageUrl(imageConfig.imageBaseUrl, imageConfig.imageDetailsWidthId, details.imageUrl) : ''}}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <TouchableOpacity
                            style={styles.playButton}
                            onPress={() => performModalVideoPlayerShow()}
                        >
                            <Icon
                                name={'play-arrow'}
                                size={60}
                                color={'#FFF'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleContainer} pointerEvents={'none'}>
                        <Text style={styles.title}>{details.title}</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{details.description}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        <ViewVideoPlayer
        isVisible={isModalVideoPlayerVisible}
        performModalVideoPlayerHide={performModalVideoPlayerHide}
    />
    </>
    )
}

/**
 * Renders screen with details about movie or TV show
 */
const ViewDetails: React.FC<IDetailsProps> = (
    {
        details,
        detailsPhase,
        detailsError,
        imageConfig,
        isModalVideoPlayerVisible,
        performModalVideoPlayerShow,
        performModalVideoPlayerHide,
    }: IDetailsProps
): React.ReactElement<View> | null => {
    if (detailsPhase === 'InProgress' || detailsPhase === 'Never') {
        return renderLoader()
    }

    if (detailsPhase === 'Failure' && detailsError) {
        return renderError(detailsError)
    }

    return renderContent(
        details,
        imageConfig,
        isModalVideoPlayerVisible,
        performModalVideoPlayerShow,
        performModalVideoPlayerHide,
    )
}

const styles = StyleSheet.create({
    containerEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessageContainer: {
        marginHorizontal: 25,
    },
    errorMessage: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: '700',
    },
    container: {
        flex: 1,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: util.getScreenWidth(),
        height: util.getScreenWidth() * imageHeightRatio,
    },
    titleContainer: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '700',
    },
    descriptionContainer: {
        paddingHorizontal: 10,
        paddingBottom: 15,
    },
    description: {
        color: '#FFF',
        fontSize: 17,
    },
    safeArea: {
        backgroundColor: '#000',
        flex: 1,
    },
    playButton: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: -40,
        right: 60,
    },
})

export default ViewDetails
