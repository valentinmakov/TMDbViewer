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
        performCallGetPopularMovieListRequest,
    }: IAppProps
): React.ReactElement<IAppProps> => {
    // Performs network queries on mount
    useEffect(() => {
        performCallGetPopularMovieListRequest()
    }, [])

    return (
        <ViewApp
            popularMovies={popularMovies}
            popularMoviesPhase={popularMoviesPhase}
            popularMoviesError={popularMoviesError}
            performCallGetPopularMovieListRequest={performCallGetPopularMovieListRequest}
        />
    )
}

interface IStateProps {
    popularMovies: Models.IPopularMovieList | null,
    popularMoviesPhase: Enums.NetworkCallPhase,
    popularMoviesError: Models.IError | null,
}

interface IDispatchProps {
    performCallGetPopularMovieListRequest: () => void,
}

export type IAppProps = IStateProps & IDispatchProps

const mapStateToProps = (state: Models.IRootState): IStateProps => ({
    popularMovies: state.popularMovies,
    popularMoviesPhase: state.popularMoviesPhase,
    popularMoviesError: state.popularMoviesError,
})

const mapDispatchToProps = (dispatch: Function): IDispatchProps => ({
    performCallGetPopularMovieListRequest: () => dispatch(actions.performCallGetPopularMovieListRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContainerApp)
