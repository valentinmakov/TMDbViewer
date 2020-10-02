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

export const getCallGetMovieByGenreListUrl = (currentPage: number, id: number): string => {
    const requestPage: number = currentPage + 1

    return `${baseUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${requestPage}&with_genres=${id}`
}
