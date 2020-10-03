import React from 'react'
import {FlatList} from 'react-native'
import {Enums} from '../Models/models'
import CarouselItem from './CarouselItem'

export interface ICarouselProps {
    type: Enums.CarouselType,
    itemList: ICarouselItem[],
    onEndReached: () => void,
}

export interface ICarouselItem {
    title: string,
    imageSource: string,
    onPress: () => void,
}

const Carousel: React.FC<ICarouselProps> = ({type, itemList, onEndReached}: ICarouselProps): React.ReactElement<ICarouselProps> => {
    return (
        <FlatList
            horizontal={true}
            data={
                // Regular case
                type === 'Large' || type === 'Small'
                    ? itemList
                    // Loading data case
                    : [{
                        title: '',
                        imageSource: '',
                        onPress: () => null,
                    }]
            }
            renderItem={
                ({item}: {item: ICarouselItem}) => {
                    return (
                        // Regular case
                        type === 'Large' || type === 'Small'
                            ? <CarouselItem
                                type={type === 'Large' ? 'Large' : 'Small'}
                                title={item.title}
                                imageSource={item.imageSource}
                                onPress={item.onPress}
                            />
                            // Loading data case
                            : <CarouselItem
                                type={type === 'LargeShimmer' ? 'LargeShimmer' : 'SmallShimmer'}
                                title={item.title}
                                imageSource={item.imageSource}
                                onPress={item.onPress}
                            />
                    )
                }
            }
            keyExtractor={(item: ICarouselItem) => item.title}
            onEndReached={onEndReached}
        />
    )
}

export default Carousel
