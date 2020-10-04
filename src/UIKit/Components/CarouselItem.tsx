import React from 'react'
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import {Enums} from '../Models/models'

export interface ICarouselItemProps {
    type: Enums.CarouselItemType,
    title: string,
    imageSource: string,
    onPress: () => void,
}

// Constants and calculable referntial dimensions
const imageMargin = 14
const titleMaxHeight = 70
const imageHeightRatio = 1.5
const screenWidth: number = Dimensions.get('screen').width
const screenHeight: number = Dimensions.get('screen').height
const imageCarouselLargeMaxWidth: number = Math.min(180, screenWidth - imageMargin * 2)
const imageCarouselLargeMaxHeight: number = Math.min(180 * imageHeightRatio, screenHeight - imageMargin * 2 - titleMaxHeight)
const imageCarouselSmallMaxWidth = 110

/**
 * Gets image width based on carousel type and screen mode (portraite or landscape)
 * @param imageType 
 */
const getImageWidth = (imageType: Enums.CarouselItemType): number => {
    const isPortraiteMode: boolean = screenHeight > screenWidth

    switch (imageType) {
        case 'Large':
            return isPortraiteMode ? imageCarouselLargeMaxWidth : Math.round(imageCarouselLargeMaxHeight / imageHeightRatio * 10) / 10
        case 'Small':
            return imageCarouselSmallMaxWidth
        default:
            return 0
    }
}

/**
 * Renders image and title
 */
const renderRegularItem: React.FC<ICarouselItemProps> = ({type, title, imageSource}: ICarouselItemProps): React.ReactElement<React.ReactFragment> => {
    return (
        <>
            <FastImage
                style={[styles.image, type === 'Large' ? styles.imageLargeDimensions : styles.imageSmallDimensions]}
                source={{uri: imageSource}}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.titleContainer}>
                <Text
                    style={styles.title}
                    numberOfLines={3}
                    ellipsizeMode={'tail'}
                >
                    {title}
                </Text>
            </View>
        </>
    )
}

/**
 * Renders either activity indicator, or error message
 */
const renderShimmerOrError: React.FC<ICarouselItemProps> = ({type, title}: ICarouselItemProps): React.ReactElement<View> => {
    return (
        <View style={type === 'LargeShimmer' ? styles.shimmerLarge : styles.shimmerSmall}>
            {
                type === 'LargeShimmer' || type === 'SmallShimmer'
                    ? <ActivityIndicator color={'white'}/>
                    : <Text style={styles.title}>{title}</Text>
            }
        </View>
    )
}

/**
 * Renders element of Movie or TV carousel
 */
const CarouselItem: React.FC<ICarouselItemProps> = ({type, title, imageSource, onPress}: ICarouselItemProps): React.ReactElement<ICarouselItemProps> => {
    return (
        <TouchableOpacity
            style={
                type === 'Large'
                    ? styles.imageContainerLarge
                    : type === 'Small'
                        ? styles.imageContainerSmall
                        : undefined
            }
            activeOpacity={1}
            onPress={onPress}
            disabled={type !== 'Large' && type !== 'Small'}
        >
            {
                type === 'Large' || type === 'Small'
                    ? renderRegularItem({type, title, imageSource, onPress})
                    : renderShimmerOrError({type, title, imageSource, onPress})
            }
        </TouchableOpacity>
    )
}

const imageWidthLarge: number = getImageWidth('Large')
const imageWidthSmall: number = getImageWidth('Small')

const styles = StyleSheet.create({
    imageContainerLarge: {
        width: imageWidthLarge,
        height: imageWidthLarge * imageHeightRatio + imageHeightRatio * 2 + titleMaxHeight,
        margin: imageMargin,
    },
    imageContainerSmall: {
        width: imageWidthSmall,
        height: imageWidthSmall * imageHeightRatio + imageHeightRatio * 2 + titleMaxHeight,
        margin: imageMargin,
    },
    image: {
        borderRadius: 14,
    },
    imageLargeDimensions: {
        width: imageWidthLarge,
        height: imageWidthLarge * imageHeightRatio
    },
    imageSmallDimensions: {
        width: imageWidthSmall,
        height: imageWidthSmall * imageHeightRatio,
    },
    titleContainer: {
        paddingTop: 10,
        height: titleMaxHeight,
        marginBottom: 20,
    },
    title: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '400',
    },
    shimmerLarge: {
        width: screenWidth,
        height: imageWidthLarge * imageHeightRatio + imageHeightRatio * 2 + titleMaxHeight,
        marginVertical: imageMargin,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shimmerSmall: {
        width: screenWidth,
        height: imageWidthSmall * imageHeightRatio + imageHeightRatio * 2 + titleMaxHeight,
        marginVertical: imageMargin,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default CarouselItem
