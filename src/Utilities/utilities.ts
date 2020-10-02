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
