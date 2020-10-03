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
                // Regular and error cases
                type === 'Large' || type === 'Small' || type === 'LargeError' || type === 'SmallError'
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
                            : type === 'LargeShimmer' || type === 'SmallShimmer'
                                ? <CarouselItem
                                    type={type === 'LargeShimmer' ? 'LargeShimmer' : 'SmallShimmer'}
                                    title={item.title}
                                    imageSource={item.imageSource}
                                    onPress={item.onPress}
                                />
                                // Error case
                                : <CarouselItem
                                    type={type === 'LargeError' ? 'LargeError' : 'SmallError'}
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
