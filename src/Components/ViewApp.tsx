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

            {
                familyMovies && familyMovies.movieList && familyMovies.movieList.length > 0
                    ? familyMovies.movieList.map((movie: Models.IMovie): React.ReactElement => (
                        <Text style={{color: 'white'}} key={movie.id}>{movie.title}</Text>
                    ))
                    : <Text>Empty</Text>
            }
            <Text style={{color: 'white'}}>{familyMoviesPhase === 'InProgress' || movieGenresPhase === 'InProgress' ? 'Fetching' : 'Done'}</Text>
            <Text style={{color: 'white'}}>
                {
                    familyMoviesError === null && movieGenresError === null
                        ? 'No Family Error'
                        : familyMoviesError
                            ? familyMoviesError.message
                            : movieGenresError
                                ? movieGenresError.message
                                : 'No Family Error'
                }
            </Text>

            {
                documentaryMovies && documentaryMovies.movieList && documentaryMovies.movieList.length > 0
                    ? documentaryMovies.movieList.map((movie: Models.IMovie): React.ReactElement => (
                        <Text style={{color: 'white'}} key={movie.id}>{movie.title}</Text>
                    ))
                    : <Text>Empty</Text>
            }
            <Text style={{color: 'white'}}>{documentaryMoviesPhase === 'InProgress' || movieGenresPhase === 'InProgress' ? 'Fetching' : 'Done'}</Text>
            <Text style={{color: 'white'}}>
                {
                    documentaryMoviesError === null && movieGenresError === null
                        ? 'No Documentary Error'
                        : documentaryMoviesError
                            ? documentaryMoviesError.message
                            : movieGenresError
                                ? movieGenresError.message
                                : 'No Documentary Error'
                }
            </Text>
        </View>
    );
};

export default ViewApp;
