import {Dimensions} from 'react-native'
import { Enums, Models } from 'src/Models/models'

const baseUrl = 'https://api.themoviedb.org/3'
const apiKey = '3f1d16dca1fe0960f57d1ecd74e243fb'

/**
 * Returns URL for popular movies query
 * @param currentPage 
 */
export const getCallGetPopularMovieListUrl = (currentPage: number): string => {
    const requestPage: number = currentPage + 1

    return `${baseUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${requestPage}`
}

/**
 * Returns URL for popular TV programs query
 * @param currentPage 
 */
export const getCallGetPopularTVProgramListUrl = (currentPage: number): string => {
    const requestPage: number = currentPage + 1

    return `${baseUrl}/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=${requestPage}`
}

/**
 * Returns URL for genres of movies query
 */
export const getCallGetMovieGenreListUrl = (): string => {
    return `${baseUrl}/genre/movie/list?api_key=${apiKey}`
}

/**
 * Returns URL for movies by genre query
 * @param currentPage 
 * @param id 
 */
export const getCallGetMovieByGenreListUrl = (currentPage: number, id: number): string => {
    const requestPage: number = currentPage + 1

    return `${baseUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${requestPage}&with_genres=${id}`
}

/**
 * Returns URL for genres of TV query
 */
export const getCallGetTVProgramGenreListUrl = (): string => {
    return `${baseUrl}/genre/tv/list?api_key=${apiKey}`
}

/**
 * Returns URL for TV programs by genre query
 * @param currentPage 
 * @param id 
 */
export const getCallGetTVProgramsByGenreListUrl = (currentPage: number, id: number): string => {
    const requestPage: number = currentPage + 1

    return `${baseUrl}/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=${requestPage}&with_genres=${id}`
}

/**
 * Returns URL for image configuration query
 */
export const getCallGetImageConfigUrl = (): string => {
    return `${baseUrl}/configuration?api_key=${apiKey}`
}

/**
 * Returns screen width for portrait mode, or screen height for landscape mode
 */
export const getScreenWidth = (): number => {
    const width: number = Dimensions.get('screen').width
    const height: number = Dimensions.get('screen').height

    return Math.min(width, height)
}

/**
 * Returns array of numbers representing available image width
 * @param images
 */
export const getImageWidthList = (images: Models.IImageConfigDataResponse | undefined): number[] => {
    if (!images || !images.poster_sizes || images.poster_sizes.length === 0) {
        return []
    }

    return images.poster_sizes.map((posterSize: string): number => {
        const posterSizeNumeric: number = parseInt(posterSize.replace(/\D/, ''))

        return !isNaN(posterSizeNumeric) ? posterSizeNumeric : 0
    })
}

/**
 * 
 * @param screenWidth 
 * @param imageWidthList 
 * @param images 
 * @param imageSize 
 */
export const getImageWidthId = (
    screenWidth: number,
    imageWidthList: number[],
    images: Models.IImageConfigDataResponse | undefined,
    imageSize: Enums.ImageSizeType,
): string => {
    if (!images || !images.poster_sizes || images.poster_sizes.length === 0) {
        return ''
    }

    // Sets how many images must be contained in a row in portrait mode 
    let imageSizeRaio: number

    switch(imageSize) {
        case 'CarouselBig':
            imageSizeRaio = 2
            break
        case 'CarouselSmall':
            imageSizeRaio = 3
            break
        case 'Details':
        default:
            imageSizeRaio = 1
    }

    // Picking the most suitable image size based on the screen width
    // The assumption is that screen in portrait mode should contain two big carousel images,
    // three small images and one detailed image in a row
    // The image size might be slightly bigger than constraints in order to be of good quality
    // For example of screen width is 414, then big carousel image must have at least 212 width or slightly bigger
    // The ratio is set in imageSizeRaio variable
    // The image size stays the same for the landscape mode
    let isMinWitdthFound = false
    const minImageWidth: number = imageWidthList.reduce((minImageWidth: number, imageWidth: number, index: number): number => {
        if (index === 0) {
            return imageWidth
        } else {
            const sizeDifference: number = screenWidth / imageSizeRaio - imageWidth

            if (sizeDifference <= 0 && !isMinWitdthFound) {
                isMinWitdthFound = true
                return imageWidth
            }

            return minImageWidth
        }
    })

    const imageCarouselLargeWidthId: string | undefined = images.poster_sizes.find((posterSize: string): boolean => posterSize.includes(minImageWidth.toString()))

    return imageCarouselLargeWidthId ? imageCarouselLargeWidthId : ''
}

export const getImageUrl = (imageBaseUrl: string, imageWidthId: string, imageUrl: string): string => {
    return `${imageBaseUrl}${imageWidthId}${imageUrl}`
}
