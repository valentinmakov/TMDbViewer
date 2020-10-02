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
        performCallGetPopularMovieListRequest,
        performCallGetPopularTVProgramListRequest,
    }: IAppProps
): React.ReactElement<IAppProps> => {
    // Performs network queries on mount
    useEffect(() => {
        performCallGetPopularMovieListRequest()
        performCallGetPopularTVProgramListRequest()
    }, [])

    return (
        <ViewApp
            popularMovies={popularMovies}
            popularMoviesPhase={popularMoviesPhase}
            popularMoviesError={popularMoviesError}
            popularTVPrograms={popularTVPrograms}
            popularTVProgramsPhase={popularTVProgramsPhase}
            popularTVProgramsError={popularTVProgramsError}
            performCallGetPopularMovieListRequest={performCallGetPopularMovieListRequest}
            performCallGetPopularTVProgramListRequest={performCallGetPopularTVProgramListRequest}
        />
    )
}

interface IStateProps {
    popularMovies: Models.IPopularMovieList | null,
    popularMoviesPhase: Enums.NetworkCallPhase,
    popularMoviesError: Models.IError | null,

    popularTVPrograms: Models.IPopularTVProgramList | null,
    popularTVProgramsPhase: Enums.NetworkCallPhase,
    popularTVProgramsError: Models.IError | null,
}

interface IDispatchProps {
    performCallGetPopularMovieListRequest: () => void,
    performCallGetPopularTVProgramListRequest: () => void,
}

export type IAppProps = IStateProps & IDispatchProps

const mapStateToProps = (state: Models.IRootState): IStateProps => ({
    popularMovies: state.popularMovies,
    popularMoviesPhase: state.popularMoviesPhase,
    popularMoviesError: state.popularMoviesError,

    popularTVPrograms: state.popularTVPrograms,
    popularTVProgramsPhase: state.popularTVProgramsPhase,
    popularTVProgramsError: state.popularTVProgramsError,
})

const mapDispatchToProps = (dispatch: Function): IDispatchProps => ({
    performCallGetPopularMovieListRequest: () => dispatch(actions.performCallGetPopularMovieListRequest()),
    performCallGetPopularTVProgramListRequest: () => dispatch(actions.performCallGetPopularTVProgramListRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContainerApp)
