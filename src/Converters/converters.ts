import {Models} from '../Models/models'

/**
 * Converts result of popular movies request to the app's internal model
 * If convertation fails error is thrown
 * @param response 
 */
export const convertPopularMovieListResponse = (response: Models.IPopularMovieListResponse): Models.IPopularMovieList => {
    if (
        (typeof response.page !== 'number') ||
        (typeof response.total_pages !== 'number') ||
        (!response.results || !Array.isArray(response.results)) ||
        (response.results && Array.isArray(response.results) && response.results.some((resultsItem: Models.IMovieResponse): boolean => {
            return (
                (typeof resultsItem.poster_path !== 'string') ||
                (!resultsItem.id || typeof resultsItem.id !== 'number') ||
                (!resultsItem.title || typeof resultsItem.title !== 'string')
            )
        }))
    ) {
        throw new Error('Converter error')
    }

    const result: Models.IPopularMovieList = {
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