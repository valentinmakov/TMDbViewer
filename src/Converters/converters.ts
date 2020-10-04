import {Models} from '../Models/models'
import * as util from '../Utilities/utilities'

/**
 * Converts result of popular movies request to the app's internal model
 * If convertation fails error is thrown
 * @param response 
 */
export const convertPopularMovieListResponse = (response: Models.IMovieListResponse): Models.IMovieList => {
    if (
        (typeof response.page !== 'number') ||
        (typeof response.total_pages !== 'number') ||
        (!response.results || !Array.isArray(response.results)) ||
        (response.results && Array.isArray(response.results) && response.results.some((resultsItem: Models.IMovieResponse): boolean => {
            return (
                (resultsItem.poster_path && typeof resultsItem.poster_path !== 'string') ||
                (!resultsItem.id || typeof resultsItem.id !== 'number') ||
                (!resultsItem.title || typeof resultsItem.title !== 'string')
            )
        }))
    ) {
        throw new Error('Converter error')
    }

    const result: Models.IMovieList = {
        currentPage: response.page,
        totalPages: response.total_pages,
        movieList: response.results.map((resultItem: Models.IMovieResponse): Models.IMovie => ({
            id: resultItem.id as number,
            title: resultItem.title as string,
            imageUrl: resultItem.poster_path ? resultItem.poster_path : null,
        }))
    }

    return result
}

/**
 * Converts result of popular TV programs request to the app's internal model
 * If convertation fails error is thrown
 * @param response 
 */
export const convertPopularTVProgramListResponse = (response: Models.ITVProgramListResponse): Models.ITVProgramList => {
    if (
        (typeof response.page !== 'number') ||
        (typeof response.total_pages !== 'number') ||
        (!response.results || !Array.isArray(response.results)) ||
        (response.results && Array.isArray(response.results) && response.results.some((resultsItem: Models.ITVProgramResponse): boolean => {
            return (
                (typeof resultsItem.poster_path !== 'string' && resultsItem.poster_path !== null) ||
                (!resultsItem.id || typeof resultsItem.id !== 'number') ||
                (!resultsItem.name || typeof resultsItem.name !== 'string')
            )
        }))
    ) {
        throw new Error('Converter error')
    }

    const result: Models.ITVProgramList = {
        currentPage: response.page,
        totalPages: response.total_pages,
        tvList: response.results.map((resultItem: Models.ITVProgramResponse): Models.ITV => ({
            id: resultItem.id as number,
            title: resultItem.name as string,
            imageUrl: resultItem.poster_path ? resultItem.poster_path : null,
        }))
    }

    return result
}

/**
 * Converts result of movie genre list request to the app's internal model
 * If convertation fails error is thrown
 * @param response 
 */
export const convertMovieGenreListResponse = (response: Models.IGenreListResponse): Models.IGenreList => {
    if (
        (!response.genres || !Array.isArray(response.genres)) ||
        (response.genres && Array.isArray(response.genres) && response.genres.some((genresItem: Models.IGenreResponse): boolean => {
            return (
                (typeof genresItem.name !== 'string') ||
                (typeof genresItem.id !== 'number')
            )
        }))
    ) {
        throw new Error('Converter error')
    }

    const result: Models.IGenreList = {
        data: response.genres
            ? response.genres.map((genresItem: Models.IGenreResponse): Models.IGenre => ({
                id: genresItem.id !== undefined ? genresItem.id : 0,
                genre: genresItem.name !== undefined ? genresItem.name : '',
            }))
            : null
    }

    return result
}

/**
 * Converts result of TV program genre list request to the app's internal model
 * If convertation fails error is thrown
 * @param response 
 */
export const convertTVProgramGenreListResponse = (response: Models.IGenreListResponse): Models.IGenreList => {
    // Reusing converter for movie genres
    return convertMovieGenreListResponse(response)
}

/**
 * Converts result of image configuration request to the app's internal model
 * If convertation fails error is thrown
 * @param response 
 */
export const convertImageConfigResponse = (response: Models.IImageConfigResponse): Models.IImageConfig => {
    if (
        !response.images ||
        typeof response.images !== 'object' ||
        typeof response.images.secure_base_url !== 'string' ||
        !response.images.secure_base_url.includes('https') ||
        !Array.isArray(response.images.poster_sizes)
    ) {
        throw new Error('Converter error')
    }

    // Id's for images of different sizes picked
    const imageWidthList: number[] = util.getImageWidthList(response.images)
    const imageCarouselLargeWidthId: string = util.getImageWidthId(imageWidthList, response.images, 'CarouselLarge')
    const imageCarouselSmallWidthId: string = util.getImageWidthId(imageWidthList, response.images, 'CarouselSmall')
    const imageDetailsWidthId: string = util.getImageWidthId(imageWidthList, response.images, 'Details')

    const result: Models.IImageConfig = {
        imageBaseUrl: response.images && response.images.secure_base_url ? response.images.secure_base_url : '',
        imageCarouselLargeWidthId,
        imageCarouselSmallWidthId,
        imageDetailsWidthId,
    }

    return result
}
