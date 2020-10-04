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
    
    tvProgramGenres: null,
    tvProgramGenresPhase: 'Never',
    tvProgramGenresError: null,

    familyTVPrograms: null,
    familyTVProgramsPhase: 'Never',
    familyTVProgramsError: null,

    documentaryTVPrograms: null,
    documentaryTVProgramsPhase: 'Never',
    documentaryTVProgramsError: null,

    imageConfig: null,
    imageConfigPhase: 'Never',
    imageConfigError: null,

    details: null,
    detailsPhase: 'Never',
    detailsError: null,

    isModalVideoPlayerVisible: false,
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
            const popularTVProgramsPayload: Models.ITVProgramList = action.payload as Models.ITVProgramList
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
                movieGenres: action.payload as Models.IGenreList,
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

        case actions.CALL_GET_TV_PROGRAM_GENRE_LIST_REQUEST:
            return {
                ...state,
                tvProgramGenresPhase: 'InProgress',
            }
        case actions.CALL_GET_TV_PROGRAM_GENRE_LIST_SUCESS:
            return {
                ...state,
                tvProgramGenres: action.payload as Models.IGenreList,
                tvProgramGenresPhase: 'Success',
                tvProgramGenresError: null,
            }
        case actions.CALL_GET_TV_PROGRAM_GENRE_LIST_FAILURE:
            return {
                ...state,
                tvProgramGenresPhase: 'Failure',
                tvProgramGenresError: action.payload as Models.IError,
            }

        case actions.CALL_GET_FAMILY_TV_PROGRAM_LIST_REQUEST:
            return {
                ...state,
                familyTVProgramsPhase: 'InProgress',
            }
        case actions.CALL_GET_FAMILY_TV_PROGRAM_LIST_SUCESS:
            const familyTVProgramsPayload: Models.ITVProgramList = action.payload as Models.ITVProgramList
            return {
                ...state,
                familyTVPrograms: {
                    ...state.familyTVPrograms,
                    currentPage: familyTVProgramsPayload.currentPage,
                    totalPages: familyTVProgramsPayload.totalPages,
                    tvList: state.familyTVPrograms ? [...state.familyTVPrograms.tvList, ...familyTVProgramsPayload.tvList] : familyTVProgramsPayload.tvList,
                },
                familyTVProgramsPhase: 'Success',
                familyTVProgramsError: null,
            }
        case actions.CALL_GET_FAMILY_TV_PROGRAM_LIST_FAILURE:
            return {
                ...state,
                familyTVProgramsPhase: 'Failure',
                familyTVProgramsError: action.payload as Models.IError,
            }

        case actions.CALL_GET_DOCUMENTARY_TV_PROGRAM_LIST_REQUEST:
            return {
                ...state,
                documentaryTVProgramsPhase: 'InProgress',
            }
        case actions.CALL_GET_DOCUMENTARY_TV_PROGRAM_LIST_SUCESS:
            const documentaryTVProgramsPayload: Models.ITVProgramList = action.payload as Models.ITVProgramList
            return {
                ...state,
                documentaryTVPrograms: {
                    ...state.documentaryTVPrograms,
                    currentPage: documentaryTVProgramsPayload.currentPage,
                    totalPages: documentaryTVProgramsPayload.totalPages,
                    tvList: state.documentaryTVPrograms ? [...state.documentaryTVPrograms.tvList, ...documentaryTVProgramsPayload.tvList] : documentaryTVProgramsPayload.tvList,
                },
                documentaryTVProgramsPhase: 'Success',
                documentaryTVProgramsError: null,
            }
        case actions.CALL_GET_DOCUMENTARY_TV_PROGRAM_LIST_FAILURE:
            return {
                ...state,
                documentaryTVProgramsPhase: 'Failure',
                documentaryTVProgramsError: action.payload as Models.IError,
            }

        case actions.CALL_GET_IMAGE_CONFIG_REQUEST:
            return {
                ...state,
                imageConfigPhase: 'InProgress',
            }
        case actions.CALL_GET_IMAGE_CONFIG_SUCESS:
            return {
                ...state,
                imageConfig: action.payload as Models.IImageConfig,
                imageConfigPhase: 'Success',
                imageConfigError: null,
            }
        case actions.CALL_GET_IMAGE_CONFIG_FAILURE:
            return {
                ...state,
                imageConfigPhase: 'Failure',
                imageConfigError: action.payload as Models.IError,
            }

        case actions.CALL_GET_DETAILS_REQUEST:
            return {
                ...state,
                detailsPhase: 'InProgress',
            }
        case actions.CALL_GET_DETAILS_SUCESS:
            return {
                ...state,
                details: action.payload as Models.IDetails,
                detailsPhase: 'Success',
                detailsError: null,
            }
        case actions.CALL_GET_DETAILS_FAILURE:
            return {
                ...state,
                detailsPhase: 'Failure',
                detailsError: action.payload as Models.IError,
            }

        case actions.MODAL_VIDEO_PLAYER_SHOW:
            return {
                ...state,
                isModalVideoPlayerVisible: true,
            }
        case actions.MODAL_VIDEO_PLAYER_HIDE:
            return {
                ...state,
                isModalVideoPlayerVisible: false,
            }
        default:
            return state
    }
}

export default rootReducer
