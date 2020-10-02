import {Models} from '../Models/models'

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
                (typeof resultsItem.poster_path !== 'string') ||
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
export const convertPopularTVProgramListResponse = (response: Models.IPopularTVProgramListResponse): Models.IPopularTVProgramList => {
    if (
        (typeof response.page !== 'number') ||
        (typeof response.total_pages !== 'number') ||
        (!response.results || !Array.isArray(response.results)) ||
        (response.results && Array.isArray(response.results) && response.results.some((resultsItem: Models.ITVProgramResponse): boolean => {
            return (
                (typeof resultsItem.poster_path !== 'string') ||
                (!resultsItem.id || typeof resultsItem.id !== 'number') ||
                (!resultsItem.name || typeof resultsItem.name !== 'string')
            )
        }))
    ) {
        throw new Error('Converter error')
    }

    const result: Models.IPopularTVProgramList = {
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

export const convertMovieGenreListResponse = (response: Models.IMovieGenreListResponse): Models.IMovieGenreList => {
    if (
        (!response.genres || !Array.isArray(response.genres)) ||
        (response.genres && Array.isArray(response.genres) && response.genres.some((genresItem: Models.IMovieGenreResponse): boolean => {
            return (
                (typeof genresItem.name !== 'string') ||
                (typeof genresItem.id !== 'number')
            )
        }))
    ) {
        throw new Error('Converter error')
    }

    const result: Models.IMovieGenreList = {
        data: response.genres
            ? response.genres.map((genresItem: Models.IMovieGenreResponse): Models.IMovieGenre => ({
                id: genresItem.id !== undefined ? genresItem.id : 0,
                genre: genresItem.name !== undefined ? genresItem.name : '',
            }))
            : null
    }

    return result
}
