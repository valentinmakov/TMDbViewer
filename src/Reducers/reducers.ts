import * as actions from '../Actions/actions'
import {Models} from '../Models/models'

const initialState: Models.IRootState = {
    popularMovies: null,
    popularMoviesPhase: 'Never',
    popularMoviesError: null,
}

const rootReducer = (state: Models.IRootState = initialState, action: Models.IAction): Models.IRootState => {
    switch (action.type) {
        case actions.CALL_GET_POPULAR_MOVIE_LIST_REQUEST:
            return {
                ...state,
                popularMoviesPhase: 'InProgress',
            }
        case actions.CALL_GET_POPULAR_MOVIE_LIST_SUCESS:
            const payload: Models.IPopularMovieList = action.payload as Models.IPopularMovieList
            return {
                ...state,
                popularMovies: {
                    ...state.popularMovies,
                    currentPage: payload.currentPage,
                    totalPages: payload.totalPages,
                    movieList: state.popularMovies ? [...state.popularMovies.movieList, ...payload.movieList] : payload.movieList,
                },
                popularMoviesPhase: 'Success',
                popularMoviesError: null,
            }
        case actions.CALL_GET_POPULAR_MOVIE_LIST_FAILURE:
            return {
                ...state,
                popularMoviesPhase: 'Failure',
                popularMoviesError: action.payload as Models.IError,
            }
        default:
            return state
    }
}

export default rootReducer
