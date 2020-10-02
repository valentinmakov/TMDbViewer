import * as actions from '../Actions/actions'
import {Models} from '../Models/models'

const initialState: Models.IRootState = {
    popularMovies: null,
    popularMoviesPhase: 'Never',
    popularMoviesError: null,

    popularTVPrograms: null,
    popularTVProgramsPhase: 'Never',
    popularTVProgramsError: null,
}

const rootReducer = (state: Models.IRootState = initialState, action: Models.IAction): Models.IRootState => {
    switch (action.type) {
        case actions.CALL_GET_POPULAR_MOVIE_LIST_REQUEST:
            return {
                ...state,
                popularMoviesPhase: 'InProgress',
            }
        case actions.CALL_GET_POPULAR_MOVIE_LIST_SUCESS:
            const popularMoviesPayload: Models.IPopularMovieList = action.payload as Models.IPopularMovieList
            return {
                ...state,
                popularMovies: {
                    ...state.popularMovies,
                    currentPage: popularMoviesPayload.currentPage,
                    totalPages: popularMoviesPayload.totalPages,
                    movieList: state.popularMovies ? [...state.popularMovies.movieList, ...popularMoviesPayload.movieList] : popularMoviesPayload.movieList,
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

        case actions.CALL_GET_POPULAR_TV_PROGRAM_LIST_REQUEST:
            return {
                ...state,
                popularTVProgramsPhase: 'InProgress',
            }
        case actions.CALL_GET_POPULAR_TV_PROGRAM_LIST_SUCESS:
            const popularTVProgramsPayload: Models.IPopularTVProgramList = action.payload as Models.IPopularTVProgramList
            return {
                ...state,
                popularTVPrograms: {
                    ...state.popularTVPrograms,
                    currentPage: popularTVProgramsPayload.currentPage,
                    totalPages: popularTVProgramsPayload.totalPages,
                    tvList: state.popularTVPrograms ? [...state.popularTVPrograms.tvList, ...popularTVProgramsPayload.tvList] : popularTVProgramsPayload.tvList,
                },
                popularTVProgramsPhase: 'Success',
                popularTVProgramsError: null,
            }
        case actions.CALL_GET_POPULAR_TV_PROGRAM_LIST_FAILURE:
            return {
                ...state,
                popularTVProgramsPhase: 'Failure',
                popularTVProgramsError: action.payload as Models.IError,
            }
        default:
            return state
    }
}

export default rootReducer
