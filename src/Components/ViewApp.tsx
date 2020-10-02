import React from 'react'
import {
    Text,
    View,
} from 'react-native'
import {IAppProps} from '../Containers/ContainerApp'
import {Models} from '../Models/models'

/**
 * Renders app's main screen
 */
const ViewApp: React.FunctionComponent<IAppProps> = (
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

    return (
        <View
            style={{flex: 1, backgroundColor: 'black'}}
        >
            {
                popularMovies && popularMovies.movieList && popularMovies.movieList.length > 0
                    ? popularMovies.movieList.map((movie: Models.IMovie): React.ReactElement => (
                        <Text style={{color: 'white'}} key={movie.id}>{movie.title}</Text>
                    ))
                    : <Text>Empty</Text>
            }
            <Text style={{color: 'white'}}>{popularMoviesPhase === 'InProgress' ? 'Fetching' : 'Done'}</Text>
            <Text style={{color: 'white'}}>{popularMoviesError === null ? 'No Error' : popularMoviesError.message}</Text>

            {
                popularTVPrograms && popularTVPrograms.tvList && popularTVPrograms.tvList.length > 0
                    ? popularTVPrograms.tvList.map((tv: Models.ITV): React.ReactElement => (
                        <Text style={{color: 'white'}} key={tv.id}>{tv.title}</Text>
                    ))
                    : <Text>Empty</Text>
            }
            <Text style={{color: 'white'}}>{popularTVProgramsPhase === 'InProgress' ? 'Fetching' : 'Done'}</Text>
            <Text style={{color: 'white'}}>{popularTVProgramsError === null ? 'No Error' : popularTVProgramsError.message}</Text>
        </View>
    );
};

export default ViewApp;
