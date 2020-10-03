import React from 'react'
import {FlatList} from 'react-native'
import {Enums} from '../Models/models'
import CarouselItem, {ICarouselItemProps} from './CarouselItem'

export interface ICarouselProps {
    type: Enums.CarouselType,
    itemList: ICarouselItem[],
    onEndReached: () => void,
}

export interface ICarouselItem {
    type: Enums.CarouselItemType,
    title: string,
    imageSource: string,
    onPress: () => void,
}

const Carousel: React.FC<ICarouselProps> = ({type, itemList, onEndReached}: ICarouselProps): React.ReactElement<ICarouselProps> => {
    return (
        <FlatList
            horizontal={true}
            data={itemList}
            renderItem={
                ({item}: {item: ICarouselItemProps}) => {
                    return (
                        <CarouselItem
                            type={type === 'Large' ? 'Large' : 'Small'}
                            title={item.title}
                            imageSource={item.imageSource}
                            onPress={item.onPress}
                        />
                    )
                }
            }
            keyExtractor={(item: ICarouselItemProps) => item.title}
            onEndReached={onEndReached}
        />
    )
}

export default Carousel
