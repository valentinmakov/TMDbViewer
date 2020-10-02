import {Models} from '../Models/models'

export const CALL_GET_POPULAR_MOVIE_LIST_REQUEST = 'CALL_GET_POPULAR_MOVIE_LIST_REQUEST'
export const CALL_GET_POPULAR_MOVIE_LIST_SUCESS = 'CALL_GET_POPULAR_MOVIE_LIST_SUCESS'
export const CALL_GET_POPULAR_MOVIE_LIST_FAILURE = 'CALL_GET_POPULAR_MOVIE_LIST_FAILURE'

export const performCallGetPopularMovieListRequest = () => (dispatch: Function, getState: () => Models.IRootState): void => {
    dispatch(callGetPopularMovieListRequest())

    const rootState: Models.IRootState = getState()
    const currentPage: number = rootState.popularMovies ? rootState.popularMovies.currentPage : 0

    fetch(util.getCallGetPopularMovieListUrl(currentPage), {method: 'GET'})
        .then((response: Response): Promise<any> => response.json())
        .then((json: any): void => {
            try {
                const payload: Models.IPopularMovieList = converters.convertPopularMovieListResponse(json)
                dispatch(callGetPopularMovieListSuccess(payload))
            } catch(error: any) {
                dispatch(callGetPopularMovieListFailure({message: `Popular movies converter error`}))
            }
        })
        .catch((error: any): void => {
            dispatch(callGetPopularMovieListFailure(error))
        })
}

const callGetPopularMovieListRequest = (): Models.IAction => ({
    type: CALL_GET_POPULAR_MOVIE_LIST_REQUEST,
})

const callGetPopularMovieListSuccess = (payload: Models.IPopularMovieList): Models.IAction => ({
    type: CALL_GET_POPULAR_MOVIE_LIST_SUCESS,
    payload,
})

const callGetPopularMovieListFailure = (payload: Models.IError): Models.IAction => ({
    type: CALL_GET_POPULAR_MOVIE_LIST_FAILURE,
    payload,
})
