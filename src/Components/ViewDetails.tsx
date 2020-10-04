import React from 'react'
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import {Models} from 'src/Models/models'
import {IDetailsProps} from '../Containers/ContainerDetails'
import * as util from '../Utilities/utilities'

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
): React.ReactElement<View> | null => {
    if (!details || !imageConfig) {
        return null
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.imageContainer}>
                    <FastImage
                        style={styles.image}
                        source={{uri: details.imageUrl ? util.getImageUrl(imageConfig.imageBaseUrl, imageConfig.imageDetailsWidthId, details.imageUrl) : ''}}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{details.title}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{details.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
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
    }: IDetailsProps
): React.ReactElement<View> | null => {
    if (detailsPhase === 'InProgress' || detailsPhase === 'Never') {
        return renderLoader()
    }

    if (detailsPhase === 'Failure' && detailsError) {
        return renderError(detailsError)
    }

    return renderContent(details, imageConfig)
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
        justifyContent: 'center',
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
})

export default ViewDetails
