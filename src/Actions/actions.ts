import {Models} from '../Models/models'
import * as util from '../Utilities/utilities'
import * as converters from '../Converters/converters'

export const CALL_GET_POPULAR_MOVIE_LIST_REQUEST = 'CALL_GET_POPULAR_MOVIE_LIST_REQUEST'
export const CALL_GET_POPULAR_MOVIE_LIST_SUCESS = 'CALL_GET_POPULAR_MOVIE_LIST_SUCESS'
export const CALL_GET_POPULAR_MOVIE_LIST_FAILURE = 'CALL_GET_POPULAR_MOVIE_LIST_FAILURE'

export const CALL_GET_POPULAR_TV_PROGRAM_LIST_REQUEST = 'CALL_GET_POPULAR_TV_PROGRAM_LIST_REQUEST'
export const CALL_GET_POPULAR_TV_PROGRAM_LIST_SUCESS = 'CALL_GET_POPULAR_TV_PROGRAM_LIST_SUCESS'
export const CALL_GET_POPULAR_TV_PROGRAM_LIST_FAILURE = 'CALL_GET_POPULAR_TV_PROGRAM_LIST_FAILURE'

export const CALL_GET_MOVIE_GENRE_LIST_REQUEST = 'CALL_GET_MOVIE_GENRE_LIST_REQUEST'
export const CALL_GET_MOVIE_GENRE_LIST_SUCESS = 'CALL_GET_MOVIE_GENRE_LIST_SUCESS'
export const CALL_GET_MOVIE_GENRE_LIST_FAILURE = 'CALL_GET_MOVIE_GENRE_LIST_FAILURE'

export const CALL_GET_FAMILY_MOVIE_LIST_REQUEST = 'CALL_GET_FAMILY_MOVIE_LIST_REQUEST'
export const CALL_GET_FAMILY_MOVIE_LIST_SUCESS = 'CALL_GET_FAMILY_MOVIE_LIST_SUCESS'
export const CALL_GET_FAMILY_MOVIE_LIST_FAILURE = 'CALL_GET_FAMILY_MOVIE_LIST_FAILURE'

export const CALL_GET_DOCUMENTARY_MOVIE_LIST_REQUEST = 'CALL_GET_DOCUMENTARY_MOVIE_LIST_REQUEST'
export const CALL_GET_DOCUMENTARY_MOVIE_LIST_SUCESS = 'CALL_GET_DOCUMENTARY_MOVIE_LIST_SUCESS'
export const CALL_GET_DOCUMENTARY_MOVIE_LIST_FAILURE = 'CALL_GET_DOCUMENTARY_MOVIE_LIST_FAILURE'

export const CALL_GET_TV_PROGRAM_GENRE_LIST_REQUEST = 'CALL_GET_TV_PROGRAM_GENRE_LIST_REQUEST'
export const CALL_GET_TV_PROGRAM_GENRE_LIST_SUCESS = 'CALL_GET_TV_PROGRAM_GENRE_LIST_SUCESS'
export const CALL_GET_TV_PROGRAM_GENRE_LIST_FAILURE = 'CALL_GET_TV_PROGRAM_GENRE_LIST_FAILURE'

export const CALL_GET_FAMILY_TV_PROGRAM_LIST_REQUEST = 'CALL_GET_FAMILY_TV_PROGRAM_LIST_REQUEST'
export const CALL_GET_FAMILY_TV_PROGRAM_LIST_SUCESS = 'CALL_GET_FAMILY_TV_PROGRAM_LIST_SUCESS'
export const CALL_GET_FAMILY_TV_PROGRAM_LIST_FAILURE = 'CALL_GET_FAMILY_TV_PROGRAM_LIST_FAILURE'

export const CALL_GET_DOCUMENTARY_TV_PROGRAM_LIST_REQUEST = 'CALL_GET_DOCUMENTARY_TV_PROGRAM_LIST_REQUEST'
export const CALL_GET_DOCUMENTARY_TV_PROGRAM_LIST_SUCESS = 'CALL_GET_DOCUMENTARY_TV_PROGRAM_LIST_SUCESS'
export const CALL_GET_DOCUMENTARY_TV_PROGRAM_LIST_FAILURE = 'CALL_GET_DOCUMENTARY_TV_PROGRAM_LIST_FAILURE'

/* START Popular movies actions */

/**
 * Starts query for popular movies (includes logic for requests sorted by genre)
 */
export const performCallGetPopularMovieListRequest = (genreId?: Models.IGenreId) => (dispatch: Function, getState: () => Models.IRootState): void => {
    // Request for general list
    if (!genreId) {
        dispatch(callGetPopularMovieListRequest())

        const rootState: Models.IRootState = getState()
        const currentPage: number = rootState.popularMovies ? rootState.popularMovies.currentPage : 0
    
        // Query url formed based on the current page value
        fetch(util.getCallGetPopularMovieListUrl(currentPage), {method: 'GET'})
            .then((response: Response): Promise<any> => response.json())
            .then((json: any): void => {
                // Here we try to convert response to the app's internal model
                // If response is invalid and converation failed error will be passed to the catch block
                try {
                    const payload: Models.IMovieList = converters.convertPopularMovieListResponse(json)
                    dispatch(callGetPopularMovieListSuccess(payload))
                } catch(error: any) {
                    dispatch(callGetPopularMovieListFailure({message: `Popular movies converter error`}))
                }
            })
            .catch((error: any): void => {
                dispatch(callGetPopularMovieListFailure(error))
            })
    // Request for Family genre list
    } else if (genreId.genre === 'Family') {
        dispatch(callGetFamilyMovieListRequest())

        const rootState: Models.IRootState = getState()
        const currentPage: number = rootState.familyMovies ? rootState.familyMovies.currentPage : 0
    
        // Query url formed based on the current page and genre id values
        fetch(util.getCallGetMovieByGenreListUrl(currentPage, genreId.id), {method: 'GET'})
            .then((response: Response): Promise<any> => response.json())
            .then((json: any): void => {
                // Here we try to convert response to the app's internal model
                // If response is invalid and converation failed error will be passed to the catch block
                try {
                    const payload: Models.IMovieList = converters.convertPopularMovieListResponse(json)
                    dispatch(callGetFamilyMovieListSuccess(payload))
                } catch(error: any) {
                    dispatch(callGetFamilyMovieListFailure({message: `Family movies converter error`}))
                }
            })
            .catch((error: any): void => {
                dispatch(callGetFamilyMovieListFailure(error))
            })
    // Request for Documentary genre list
    } else if (genreId.genre === 'Documentary') {
        dispatch(callGetDocumentaryMovieListRequest())

        const rootState: Models.IRootState = getState()
        const currentPage: number = rootState.documentaryMovies ? rootState.documentaryMovies.currentPage : 0
    
        // Query url formed based on the current page and genre id values
        fetch(util.getCallGetMovieByGenreListUrl(currentPage, genreId.id), {method: 'GET'})
            .then((response: Response): Promise<any> => response.json())
            .then((json: any): void => {
                // Here we try to convert response to the app's internal model
                // If response is invalid and converation failed error will be passed to the catch block
                try {
                    const payload: Models.IMovieList = converters.convertPopularMovieListResponse(json)
                    dispatch(callGetDocumentaryMovieListSuccess(payload))
                } catch(error: any) {
                    dispatch(callGetDocumentaryMovieListFailure({message: `Documentary movies converter error`}))
                }
            })
            .catch((error: any): void => {
                dispatch(callGetDocumentaryMovieListFailure(error))
            })
    }
    
}

const callGetPopularMovieListRequest = (): Models.IAction => ({
    type: CALL_GET_POPULAR_MOVIE_LIST_REQUEST,
})

const callGetPopularMovieListSuccess = (payload: Models.IMovieList): Models.IAction => ({
    type: CALL_GET_POPULAR_MOVIE_LIST_SUCESS,
    payload,
})

const callGetPopularMovieListFailure = (payload: Models.IError): Models.IAction => ({
    type: CALL_GET_POPULAR_MOVIE_LIST_FAILURE,
    payload,
})
/* END Popular movies actions */

/* START Popular TV programs actions */

/**
 * Starts query for populary TV shows (includes logic for requests sorted by genre)
 */
export const performCallGetPopularTVProgramListRequest = (genreId?: Models.IGenreId) => (dispatch: Function, getState: () => Models.IRootState): void => {
    // Request for general list
    if (!genreId) {
        dispatch(callGetPopularTVProgramListRequest())

        const rootState: Models.IRootState = getState()
        const currentPage: number = rootState.popularTVPrograms ? rootState.popularTVPrograms.currentPage : 0
    
        // Query url formed based on the current page value
        fetch(util.getCallGetPopularTVProgramListUrl(currentPage), {method: 'GET'})
            .then((response: Response): Promise<any> => response.json())
            .then((json: any): void => {
                // Here we try to convert response to the app's internal model
                // If response is invalid and converation failed error will be passed to the catch block
                try {
                    const payload: Models.ITVProgramList = converters.convertPopularTVProgramListResponse(json)
                    dispatch(callGetPopularTVProgramListSuccess(payload))
                } catch(error: any) {
                    dispatch(callGetPopularTVProgramListFailure({message: `Popular TV programs converter error`}))
                }
            })
            .catch((error: any): void => {
                dispatch(callGetPopularTVProgramListFailure(error))
            })
    // Request for Family genre list
    } else if (genreId.genre === 'Family') {
        dispatch(callGetFamilyTVProgramListRequest())

        const rootState: Models.IRootState = getState()
        const currentPage: number = rootState.familyTVPrograms ? rootState.familyTVPrograms.currentPage : 0
    
        // Query url formed based on the current page and genre id values
        fetch(util.getCallGetTVProgramsByGenreListUrl(currentPage, genreId.id), {method: 'GET'})
            .then((response: Response): Promise<any> => response.json())
            .then((json: any): void => {
                // Here we try to convert response to the app's internal model
                // If response is invalid and converation failed error will be passed to the catch block
                try {
                    const payload: Models.ITVProgramList = converters.convertPopularTVProgramListResponse(json)
                    dispatch(callGetFamilyTVProgramListSuccess(payload))
                } catch(error: any) {
                    dispatch(callGetFamilyTVProgramListFailure({message: `Family TV programs converter error`}))
                }
            })
            .catch((error: any): void => {
                dispatch(callGetFamilyTVProgramListFailure(error))
            })
    // Request for Documentary genre list
    } else if (genreId.genre === 'Documentary') {
        dispatch(callGetDocumentaryTVProgramListRequest())

        const rootState: Models.IRootState = getState()
        const currentPage: number = rootState.documentaryTVPrograms ? rootState.documentaryTVPrograms.currentPage : 0
    
        // Query url formed based on the current page and genre id values
        fetch(util.getCallGetTVProgramsByGenreListUrl(currentPage, genreId.id), {method: 'GET'})
            .then((response: Response): Promise<any> => response.json())
            .then((json: any): void => {
                // Here we try to convert response to the app's internal model
                // If response is invalid and converation failed error will be passed to the catch block
                try {
                    const payload: Models.ITVProgramList = converters.convertPopularTVProgramListResponse(json)
                    dispatch(callGetDocumentaryTVProgramListSuccess(payload))
                } catch(error: any) {
                    dispatch(callGetDocumentaryTVProgramListFailure({message: `Documentary TV programs converter error`}))
                }
            })
            .catch((error: any): void => {
                dispatch(callGetDocumentaryTVProgramListFailure(error))
            })
    }
}

const callGetPopularTVProgramListRequest = (): Models.IAction => ({
    type: CALL_GET_POPULAR_TV_PROGRAM_LIST_REQUEST,
})

const callGetPopularTVProgramListSuccess = (payload: Models.ITVProgramList): Models.IAction => ({
    type: CALL_GET_POPULAR_TV_PROGRAM_LIST_SUCESS,
    payload,
})

const callGetPopularTVProgramListFailure = (payload: Models.IError): Models.IAction => ({
    type: CALL_GET_POPULAR_TV_PROGRAM_LIST_FAILURE,
    payload,
})
/* END Popular TV programs actions */

/* START Genres of movies actions */

/**
 * Starts query for genres of movies
 */
export const performCallGetMovieGenreListRequest = () => (dispatch: Function): void => {
    dispatch(callGetMovieGenreListRequest())

    fetch(util.getCallGetMovieGenreListUrl(), {method: 'GET'})
        .then((response: Response): Promise<any> => response.json())
        .then((json: any): void => {
            // Here we try to convert response to the app's internal model
            // If response is invalid and converation failed error will be passed to the catch block
            try {
                const payload: Models.IGenreList = converters.convertMovieGenreListResponse(json)
                dispatch(callGetMovieGenreListSuccess(payload))

                // Calling movies of Family genre
                const familyGenre: Models.IGenre | undefined = payload.data
                    ? payload.data.find((genre: Models.IGenre): boolean => genre.genre.toLowerCase() === 'family')
                    : undefined

                if (familyGenre) {
                    dispatch(performCallGetPopularMovieListRequest({genre: 'Family', id: familyGenre.id}))
                } else {
                    dispatch(callGetFamilyMovieListFailure({message: 'No family genre code found'}))
                }

                // Calling movies of Documentary genre
                const documentaryGenre: Models.IGenre | undefined = payload.data
                    ? payload.data.find((genre: Models.IGenre): boolean => genre.genre.toLowerCase() === 'documentary')
                    : undefined

                if (documentaryGenre) {
                    dispatch(performCallGetPopularMovieListRequest({genre: 'Documentary', id: documentaryGenre.id}))
                } else {
                    dispatch(callGetDocumentaryMovieListFailure({message: 'No documentary genre code found'}))
                }
            } catch(error: any) {
                dispatch(callGetMovieGenreListFailure({message: `Genres of movies converter error`}))
            }
        })
        .catch((error: any): void => {
            dispatch(callGetMovieGenreListFailure(error))
        })
}

const callGetMovieGenreListRequest = (): Models.IAction => ({
    type: CALL_GET_MOVIE_GENRE_LIST_REQUEST,
})

const callGetMovieGenreListSuccess = (payload: Models.IGenreList): Models.IAction => ({
    type: CALL_GET_MOVIE_GENRE_LIST_SUCESS,
    payload,
})

const callGetMovieGenreListFailure = (payload: Models.IError): Models.IAction => ({
    type: CALL_GET_MOVIE_GENRE_LIST_FAILURE,
    payload,
})
/* END Genres of movies actions */

/* START Family movies actions */
const callGetFamilyMovieListRequest = (): Models.IAction => ({
    type: CALL_GET_FAMILY_MOVIE_LIST_REQUEST,
})

const callGetFamilyMovieListSuccess = (payload: Models.IMovieList): Models.IAction => ({
    type: CALL_GET_FAMILY_MOVIE_LIST_SUCESS,
    payload,
})

const callGetFamilyMovieListFailure = (payload: Models.IError): Models.IAction => ({
    type: CALL_GET_FAMILY_MOVIE_LIST_FAILURE,
    payload,
})
/* END Family movies actions */

/* START Documentary movies actions */
const callGetDocumentaryMovieListRequest = (): Models.IAction => ({
    type: CALL_GET_DOCUMENTARY_MOVIE_LIST_REQUEST,
})

const callGetDocumentaryMovieListSuccess = (payload: Models.IMovieList): Models.IAction => ({
    type: CALL_GET_DOCUMENTARY_MOVIE_LIST_SUCESS,
    payload,
})

const callGetDocumentaryMovieListFailure = (payload: Models.IError): Models.IAction => ({
    type: CALL_GET_DOCUMENTARY_MOVIE_LIST_FAILURE,
    payload,
})
/* END Documentary movies actions */

/**
 * Starts query for genres of TV shows
 */
export const performCallGetTVProgramGenreListRequest = () => (dispatch: Function): void => {
    dispatch(callGetTVProgramGenreListRequest())

    fetch(util.getCallGetTVProgramGenreListUrl(), {method: 'GET'})
        .then((response: Response): Promise<any> => response.json())
        .then((json: any): void => {
            // Here we try to convert response to the app's internal model
            // If response is invalid and converation failed error will be passed to the catch block
            try {
                const payload: Models.IGenreList = converters.convertTVProgramGenreListResponse(json)
                dispatch(callGetTVProgramGenreListSuccess(payload))

                // Calling TV programs of Family genre
                const familyGenre: Models.IGenre | undefined = payload.data
                    ? payload.data.find((genre: Models.IGenre): boolean => genre.genre.toLowerCase() === 'family')
                    : undefined

                if (familyGenre) {
                    dispatch(performCallGetPopularTVProgramListRequest({genre: 'Family', id: familyGenre.id}))
                } else {
                    dispatch(callGetFamilyTVProgramListFailure({message: 'No family genre code found'}))
                }

                // Calling TV programs of Documentary genre
                const documentaryGenre: Models.IGenre | undefined = payload.data
                    ? payload.data.find((genre: Models.IGenre): boolean => genre.genre.toLowerCase() === 'documentary')
                    : undefined

                if (documentaryGenre) {
                    dispatch(performCallGetPopularTVProgramListRequest({genre: 'Documentary', id: documentaryGenre.id}))
                } else {
                    dispatch(callGetDocumentaryTVProgramListFailure({message: 'No documentary genre code found'}))
                }
            } catch(error: any) {
                dispatch(callGetTVProgramGenreListFailure({message: `Genres of TV programs converter error`}))
            }
        })
        .catch((error: any): void => {
            dispatch(callGetTVProgramGenreListFailure(error))
        })
}

const callGetTVProgramGenreListRequest = (): Models.IAction => ({
    type: CALL_GET_TV_PROGRAM_GENRE_LIST_REQUEST,
})

const callGetTVProgramGenreListSuccess = (payload: Models.IGenreList): Models.IAction => ({
    type: CALL_GET_TV_PROGRAM_GENRE_LIST_SUCESS,
    payload,
})

const callGetTVProgramGenreListFailure = (payload: Models.IError): Models.IAction => ({
    type: CALL_GET_TV_PROGRAM_GENRE_LIST_FAILURE,
    payload,
})
/* END Genres of movies actions */

/* START Family TV programs actions */
const callGetFamilyTVProgramListRequest = (): Models.IAction => ({
    type: CALL_GET_FAMILY_TV_PROGRAM_LIST_REQUEST,
})

const callGetFamilyTVProgramListSuccess = (payload: Models.ITVProgramList): Models.IAction => ({
    type: CALL_GET_FAMILY_TV_PROGRAM_LIST_SUCESS,
    payload,
})

const callGetFamilyTVProgramListFailure = (payload: Models.IError): Models.IAction => ({
    type: CALL_GET_FAMILY_TV_PROGRAM_LIST_FAILURE,
    payload,
})
/* END Family TV programs actions */

/* START Documentary TV programs actions */
const callGetDocumentaryTVProgramListRequest = (): Models.IAction => ({
    type: CALL_GET_DOCUMENTARY_TV_PROGRAM_LIST_REQUEST,
})

const callGetDocumentaryTVProgramListSuccess = (payload: Models.ITVProgramList): Models.IAction => ({
    type: CALL_GET_DOCUMENTARY_TV_PROGRAM_LIST_SUCESS,
    payload,
})

const callGetDocumentaryTVProgramListFailure = (payload: Models.IError): Models.IAction => ({
    type: CALL_GET_DOCUMENTARY_TV_PROGRAM_LIST_FAILURE,
    payload,
})
/* END Documentary TV programs actions */
