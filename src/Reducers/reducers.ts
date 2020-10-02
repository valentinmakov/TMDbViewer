import * as actions from '../Actions/actions'
import {Models} from '../Models/models'

const initialState: Models.IRootState = {
    popularMovies: null,
    popularMoviesPhase: 'Never',
    popularMoviesError: null,

    popularTVPrograms: null,
    popularTVProgramsPhase: 'Never',
    popularTVProgramsError: null,

    movieGenres: null,
    movieGenresPhase: 'Never',
    movieGenresError: null,

    familyMovies: null,
    familyMoviesPhase: 'Never',
    familyMoviesError: null,

    documentaryMovies: null,
    documentaryMoviesPhase: 'Never',
    documentaryMoviesError: null,    
}

const rootReducer = (state: Models.IRootState = initialState, action: Models.IAction): Models.IRootState => {
    switch (action.type) {
        case actions.CALL_GET_POPULAR_MOVIE_LIST_REQUEST:
            return {
                ...state,
                popularMoviesPhase: 'InProgress',
            }
        case actions.CALL_GET_POPULAR_MOVIE_LIST_SUCESS:
            const popularMoviesPayload: Models.IMovieList = action.payload as Models.IMovieList
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

        case actions.CALL_GET_MOVIE_GENRE_LIST_REQUEST:
            return {
                ...state,
                movieGenresPhase: 'InProgress',
            }
        case actions.CALL_GET_MOVIE_GENRE_LIST_SUCESS:
            return {
                ...state,
                movieGenres: action.payload as Models.IMovieGenreList,
                movieGenresPhase: 'Success',
                movieGenresError: null,
            }
        case actions.CALL_GET_MOVIE_GENRE_LIST_FAILURE:
            return {
                ...state,
                movieGenresPhase: 'Failure',
                movieGenresError: action.payload as Models.IError,
            }

        case actions.CALL_GET_FAMILY_MOVIE_LIST_REQUEST:
            return {
                ...state,
                familyMoviesPhase: 'InProgress',
            }
        case actions.CALL_GET_FAMILY_MOVIE_LIST_SUCESS:
            const familyMoviesPayload: Models.IMovieList = action.payload as Models.IMovieList
            return {
                ...state,
                familyMovies: {
                    ...state.familyMovies,
                    currentPage: familyMoviesPayload.currentPage,
                    totalPages: familyMoviesPayload.totalPages,
                    movieList: state.familyMovies ? [...state.familyMovies.movieList, ...familyMoviesPayload.movieList] : familyMoviesPayload.movieList,
                },
                familyMoviesPhase: 'Success',
                familyMoviesError: null,
            }
        case actions.CALL_GET_FAMILY_MOVIE_LIST_FAILURE:
            return {
                ...state,
                familyMoviesPhase: 'Failure',
                familyMoviesError: action.payload as Models.IError,
            }

        case actions.CALL_GET_DOCUMENTARY_MOVIE_LIST_REQUEST:
            return {
                ...state,
                documentaryMoviesPhase: 'InProgress',
            }
        case actions.CALL_GET_DOCUMENTARY_MOVIE_LIST_SUCESS:
            const documentaryMoviesPayload: Models.IMovieList = action.payload as Models.IMovieList
            return {
                ...state,
                documentaryMovies: {
                    ...state.documentaryMovies,
                    currentPage: documentaryMoviesPayload.currentPage,
                    totalPages: documentaryMoviesPayload.totalPages,
                    movieList: state.documentaryMovies ? [...state.documentaryMovies.movieList, ...documentaryMoviesPayload.movieList] : documentaryMoviesPayload.movieList,
                },
                documentaryMoviesPhase: 'Success',
                documentaryMoviesError: null,
            }
        case actions.CALL_GET_DOCUMENTARY_MOVIE_LIST_FAILURE:
            return {
                ...state,
                documentaryMoviesPhase: 'Failure',
                documentaryMoviesError: action.payload as Models.IError,
            }
        default:
            return state
    }
}

export default rootReducer
