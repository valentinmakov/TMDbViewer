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
        performCallGetPopularMovieListRequest,
        performCallGetPopularTVProgramListRequest,
        performCallGetMovieGenreListRequest,
    }: IAppProps
): React.ReactElement<IAppProps> => {
    // Performs network queries on mount
    useEffect(() => {
        performCallGetPopularMovieListRequest()
        performCallGetPopularTVProgramListRequest()
        performCallGetMovieGenreListRequest()
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
            performCallGetPopularMovieListRequest={performCallGetPopularMovieListRequest}
            performCallGetPopularTVProgramListRequest={performCallGetPopularTVProgramListRequest}
            performCallGetMovieGenreListRequest={performCallGetMovieGenreListRequest}
        />
    )
}

interface IStateProps {
    popularMovies: Models.IMovieList | null,
    popularMoviesPhase: Enums.NetworkCallPhase,
    popularMoviesError: Models.IError | null,

    popularTVPrograms: Models.IPopularTVProgramList | null,
    popularTVProgramsPhase: Enums.NetworkCallPhase,
    popularTVProgramsError: Models.IError | null,

    movieGenres: Models.IMovieGenreList | null,
    movieGenresPhase: Enums.NetworkCallPhase,
    movieGenresError: Models.IError | null,

    familyMovies: Models.IMovieList | null,
    familyMoviesPhase: Enums.NetworkCallPhase,
    familyMoviesError: Models.IError | null,
    
    documentaryMovies: Models.IMovieList | null,
    documentaryMoviesPhase: Enums.NetworkCallPhase,
    documentaryMoviesError: Models.IError | null,
}

interface IDispatchProps {
    performCallGetPopularMovieListRequest: () => void,
    performCallGetPopularTVProgramListRequest: () => void,
    performCallGetMovieGenreListRequest: () => void,
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
})

const mapDispatchToProps = (dispatch: Function): IDispatchProps => ({
    performCallGetPopularMovieListRequest: () => dispatch(actions.performCallGetPopularMovieListRequest()),
    performCallGetPopularTVProgramListRequest: () => dispatch(actions.performCallGetPopularTVProgramListRequest()),
    performCallGetMovieGenreListRequest: () => dispatch(actions.performCallGetMovieGenreListRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContainerApp)
