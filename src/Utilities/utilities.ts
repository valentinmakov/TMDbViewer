import {Dimensions} from 'react-native'
import { Enums, Models } from 'src/Models/models'

/* START Constants */
const baseUrl = 'https://api.themoviedb.org/3'
const apiKey = '3f1d16dca1fe0960f57d1ecd74e243fb'
const carouselLargeImageWidth = 200
const carouselSmallImageWidth = 120
/* END Constants */

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
    imageWidthList: number[],
    images: Models.IImageConfigDataResponse | undefined,
    imageSize: Enums.ImageSizeType,
): string => {
    if (!images || !images.poster_sizes || images.poster_sizes.length === 0) {
        return ''
    }

    // Sets referential width for carousel and details screen images 
    let maxImageSize: number

    switch (imageSize) {
        case 'CarouselLarge':
            maxImageSize = carouselLargeImageWidth
            break
        case 'CarouselSmall':
            maxImageSize = carouselSmallImageWidth
            break
        case 'Details':
        default:
            maxImageSize = getScreenWidth()
    }

    // Picking the most suitable download image size based on screen image type (carousels or details screen)
    // The assumption is that downloaded image should be a bit larger than its phisical dimentions on screen
    // (otherwise its screen quality might go bad)
    // The image size is the same for both portrait and landscape modes
    let isMinWitdthFound = false
    const minImageWidth: number = imageWidthList.reduce((minImageWidth: number, imageWidth: number, index: number): number => {
        if (index === 0) {
            return imageWidth
        } else {
            const sizeDifference: number = maxImageSize - imageWidth

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

/**
 * Returns URL for a single image
 * @param imageBaseUrl 
 * @param imageWidthId 
 * @param imageUrl 
 */
export const getImageUrl = (imageBaseUrl: string, imageWidthId: string, imageUrl: string): string => {
    return `${imageBaseUrl}${imageWidthId}${imageUrl}`
}

/**
 * Returns object representing Family genre
 * @param genreList
 */
export const getFamilyGenreId = (genreList: Models.IGenreList | null): Models.IGenre | undefined => {
    if (!genreList || !genreList.data || genreList.data.length === 0) {
        return undefined
    }

    return genreList.data.find((genre: Models.IGenre): boolean => genre.genre.toLowerCase() === 'family')
}

/**
 * Returns object representing Documentary genre
 * @param genreList
 */
export const getDocumentaryGenreId = (genreList: Models.IGenreList | null): Models.IGenre | undefined => {
    if (!genreList || !genreList.data || genreList.data.length === 0) {
        return undefined
    }

    return genreList.data.find((genre: Models.IGenre): boolean => genre.genre.toLowerCase() === 'documentary')
}
