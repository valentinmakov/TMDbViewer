import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import * as actions from '../Actions/actions'
import {Enums, Models} from '../Models/models'
import ViewApp from '../Components/ViewApp'

/**
 * Provides container for app's main screen
 */
const ContainerApp: React.FC<IAppProps> = (
    {
        popularMovies,
        popularMoviesPhase,
        popularMoviesError,
        popularTVPrograms,
        popularTVProgramsPhase,
        popularTVProgramsError,
        movieGenres,
        movieGenresPhase,
        movieGenresError,
        familyMovies,
        familyMoviesPhase,
        familyMoviesError,
        documentaryMovies,
        documentaryMoviesPhase,
        documentaryMoviesError,
        tvProgramGenres,
        tvProgramGenresPhase,
        tvProgramGenresError,
        familyTVPrograms,
        familyTVProgramsPhase,
        familyTVProgramsError,
        documentaryTVPrograms,
        documentaryTVProgramsPhase,
        documentaryTVProgramsError,
        imageConfig,
        imageConfigPhase,
        imageConfigError,
        performCallGetPopularMovieListRequest,
        performCallGetPopularTVProgramListRequest,
        performCallGetMovieGenreListRequest,
        performCallGetTVProgramGenreListRequest,
        performCallGetImageConfigRequest,
    }: IAppProps
): React.ReactElement<IAppProps> => {
    // Performs network queries on mount
    useEffect(() => {
        performCallGetPopularMovieListRequest()
        performCallGetPopularTVProgramListRequest()
        performCallGetMovieGenreListRequest()
        performCallGetTVProgramGenreListRequest()
        performCallGetImageConfigRequest()
    }, [])

    return (
        <ViewApp
            popularMovies={popularMovies}
            popularMoviesPhase={popularMoviesPhase}
            popularMoviesError={popularMoviesError}
            popularTVPrograms={popularTVPrograms}
            popularTVProgramsPhase={popularTVProgramsPhase}
            popularTVProgramsError={popularTVProgramsError}
            movieGenres={movieGenres}
            movieGenresPhase={movieGenresPhase}
            movieGenresError={movieGenresError}
            familyMovies={familyMovies}
            familyMoviesPhase={familyMoviesPhase}
            familyMoviesError={familyMoviesError}
            documentaryMovies={documentaryMovies}
            documentaryMoviesPhase={documentaryMoviesPhase}
            documentaryMoviesError={documentaryMoviesError}
            tvProgramGenres={tvProgramGenres}
            tvProgramGenresPhase={tvProgramGenresPhase}
            tvProgramGenresError={tvProgramGenresError}
            familyTVPrograms={familyTVPrograms}
            familyTVProgramsPhase={familyTVProgramsPhase}
            familyTVProgramsError={familyTVProgramsError}
            documentaryTVPrograms={documentaryTVPrograms}
            documentaryTVProgramsPhase={documentaryTVProgramsPhase}
            documentaryTVProgramsError={documentaryTVProgramsError}
            imageConfig={imageConfig}
            imageConfigPhase={imageConfigPhase}
            imageConfigError={imageConfigError}
            performCallGetPopularMovieListRequest={performCallGetPopularMovieListRequest}
            performCallGetPopularTVProgramListRequest={performCallGetPopularTVProgramListRequest}
            performCallGetMovieGenreListRequest={performCallGetMovieGenreListRequest}
            performCallGetTVProgramGenreListRequest={performCallGetTVProgramGenreListRequest}
            performCallGetImageConfigRequest={performCallGetImageConfigRequest}
        />
    )
}

interface IStateProps {
    popularMovies: Models.IMovieList | null,
    popularMoviesPhase: Enums.NetworkCallPhase,
    popularMoviesError: Models.IError | null,

    popularTVPrograms: Models.ITVProgramList | null,
    popularTVProgramsPhase: Enums.NetworkCallPhase,
    popularTVProgramsError: Models.IError | null,

    movieGenres: Models.IGenreList | null,
    movieGenresPhase: Enums.NetworkCallPhase,
    movieGenresError: Models.IError | null,

    familyMovies: Models.IMovieList | null,
    familyMoviesPhase: Enums.NetworkCallPhase,
    familyMoviesError: Models.IError | null,
    
    documentaryMovies: Models.IMovieList | null,
    documentaryMoviesPhase: Enums.NetworkCallPhase,
    documentaryMoviesError: Models.IError | null,

    tvProgramGenres: Models.IGenreList | null,
    tvProgramGenresPhase: Enums.NetworkCallPhase,
    tvProgramGenresError: Models.IError | null,

    familyTVPrograms: Models.ITVProgramList | null,
    familyTVProgramsPhase: Enums.NetworkCallPhase,
    familyTVProgramsError: Models.IError | null,
    
    documentaryTVPrograms: Models.ITVProgramList | null,
    documentaryTVProgramsPhase: Enums.NetworkCallPhase,
    documentaryTVProgramsError: Models.IError | null,

    imageConfig: Models.IImageConfig | null,
    imageConfigPhase: Enums.NetworkCallPhase,
    imageConfigError: Models.IError | null,
}

interface IDispatchProps {
    performCallGetPopularMovieListRequest: () => void,
    performCallGetPopularTVProgramListRequest: () => void,
    performCallGetMovieGenreListRequest: () => void,
    performCallGetTVProgramGenreListRequest: () => void,
    performCallGetImageConfigRequest: () => void,
}

export type IAppProps = IStateProps & IDispatchProps

const mapStateToProps = (state: Models.IRootState): IStateProps => ({
    popularMovies: state.popularMovies,
    popularMoviesPhase: state.popularMoviesPhase,
    popularMoviesError: state.popularMoviesError,

    popularTVPrograms: state.popularTVPrograms,
    popularTVProgramsPhase: state.popularTVProgramsPhase,
    popularTVProgramsError: state.popularTVProgramsError,

    movieGenres: state.movieGenres,
    movieGenresPhase: state.movieGenresPhase,
    movieGenresError: state.movieGenresError,

    familyMovies: state.familyMovies,
    familyMoviesPhase: state.familyMoviesPhase,
    familyMoviesError: state.familyMoviesError,

    documentaryMovies: state.documentaryMovies,
    documentaryMoviesPhase: state.documentaryMoviesPhase,
    documentaryMoviesError: state.documentaryMoviesError,

    tvProgramGenres: state.tvProgramGenres,
    tvProgramGenresPhase: state.tvProgramGenresPhase,
    tvProgramGenresError: state.tvProgramGenresError,

    familyTVPrograms: state.familyTVPrograms,
    familyTVProgramsPhase: state.familyTVProgramsPhase,
    familyTVProgramsError: state.familyTVProgramsError,

    documentaryTVPrograms: state.documentaryTVPrograms,
    documentaryTVProgramsPhase: state.documentaryTVProgramsPhase,
    documentaryTVProgramsError: state.documentaryTVProgramsError,
    
    imageConfig: state.imageConfig,
    imageConfigPhase: state.imageConfigPhase,
    imageConfigError: state.imageConfigError,
})

const mapDispatchToProps = (dispatch: Function): IDispatchProps => ({
    performCallGetPopularMovieListRequest: () => dispatch(actions.performCallGetPopularMovieListRequest()),
    performCallGetPopularTVProgramListRequest: () => dispatch(actions.performCallGetPopularTVProgramListRequest()),
    performCallGetMovieGenreListRequest: () => dispatch(actions.performCallGetMovieGenreListRequest()),
    performCallGetTVProgramGenreListRequest: () => dispatch(actions.performCallGetTVProgramGenreListRequest()),
    performCallGetImageConfigRequest: () => dispatch(actions.performCallGetImageConfigRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContainerApp)
