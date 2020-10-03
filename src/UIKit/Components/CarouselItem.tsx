import React from 'react'
import {
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

const IMAGE_MARGIN = 14
const IMAGE_HEIGHT_RATIO = 1.5

const getImageWidth = (imageType: Enums.CarouselItemType): number => {
    const width: number = Dimensions.get('screen').width
    const height: number = Dimensions.get('screen').height
    const minWidth: number = Math.min(width, height)
    let numberOfImagesInRow: number

    switch (imageType) {
        case 'Large':
            numberOfImagesInRow = 2
            break
        case 'Small':
            numberOfImagesInRow = 3
            break
        default:
            numberOfImagesInRow = 1
            break
    }

    return Math.round(((minWidth - IMAGE_MARGIN * numberOfImagesInRow * 2) / numberOfImagesInRow) * 10) / 10
}

const CarouselItem: React.FC<ICarouselItemProps> = ({type, title, imageSource, onPress}: ICarouselItemProps): React.ReactElement<ICarouselItemProps> => {
    return (
        <TouchableOpacity
            style={type === 'Large' ? styles.imageContainerLarge : styles.imageContainerSmall}
            activeOpacity={1}
        >
            <FastImage
                style={[styles.image, type === 'Large' ? styles.imageLargeDimensions : styles.imageSmallDimensions]}
                source={{uri: imageSource}}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageContainerLarge: {
        width: getImageWidth('Large'),
        margin: IMAGE_MARGIN,
    },
    imageContainerSmall: {
        width: getImageWidth('Small'),
        margin: IMAGE_MARGIN,
    },
    image: {
        borderRadius: 14,
    },
    imageLargeDimensions: {
        width: getImageWidth('Large'),
        height: getImageWidth('Large') * IMAGE_HEIGHT_RATIO
    },
    imageSmallDimensions: {
        width: getImageWidth('Small'),
        height: getImageWidth('Small') * IMAGE_HEIGHT_RATIO,
    },
    titleContainer: {
        paddingTop: 10,
    },
    title: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
    },
})

export default CarouselItem
