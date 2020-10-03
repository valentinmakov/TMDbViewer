import React from 'react'
import {
    Text,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native'
import {IAppProps} from '../Containers/ContainerApp'
import {Models} from '../Models/models'
import * as util from '../Utilities/utilities'
import {Carousel, ICarouselItem} from '../UIKit'

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

    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <SafeAreaView style={{backgroundColor: '#000', flex: 1}}>
                <ScrollView
                    style={styles.container}
                    directionalLockEnabled={true}
                >
                    {/* {
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

                    {
                        familyTVPrograms && familyTVPrograms.tvList && familyTVPrograms.tvList.length > 0
                            ? familyTVPrograms.tvList.map((tv: Models.ITV): React.ReactElement => (
                                <Text style={{color: 'white'}} key={tv.id}>{tv.title}</Text>
                            ))
                            : <Text>Empty</Text>
                    }
                    <Text style={{color: 'white'}}>{familyTVProgramsPhase === 'InProgress' || tvProgramGenresPhase === 'InProgress' ? 'Fetching' : 'Done'}</Text>
                    <Text style={{color: 'white'}}>
                        {
                            familyTVProgramsError === null && tvProgramGenresError === null
                                ? 'No Family Error'
                                : familyTVProgramsError
                                    ? familyTVProgramsError.message
                                    : tvProgramGenresError
                                        ? tvProgramGenresError.message
                                        : 'No Family Error'
                        }
                    </Text>

                    {
                        documentaryTVPrograms && documentaryTVPrograms.tvList && documentaryTVPrograms.tvList.length > 0
                            ? documentaryTVPrograms.tvList.map((tv: Models.ITV): React.ReactElement => (
                                <Text style={{color: 'white'}} key={tv.id}>{tv.title}</Text>
                            ))
                            : <Text>Empty</Text>
                    }
                    <Text style={{color: 'white'}}>{documentaryTVProgramsPhase === 'InProgress' || tvProgramGenresPhase === 'InProgress' ? 'Fetching' : 'Done'}</Text>
                    <Text style={{color: 'white'}}>
                        {
                            documentaryTVProgramsError === null && tvProgramGenresError === null
                                ? 'No Documentary Error'
                                : documentaryTVProgramsError
                                    ? documentaryTVProgramsError.message
                                    : tvProgramGenresError
                                        ? tvProgramGenresError.message
                                        : 'No Documentary Error'
                        }
                    </Text> */}
                    {/* Movies section */}
                    <Text style={styles.title}>Movies</Text>
                    <Text style={styles.subTitle}>Most popular</Text>
                    {
                        popularMovies && imageConfig
                            ? <Carousel
                                type={'Large'}
                                itemList={
                                    popularMovies.movieList.map((movie: Models.IMovie): ICarouselItem => ({
                                        title: movie.title,
                                        imageSource: movie.imageUrl ? util.getImageUrl(imageConfig.imageBaseUrl, imageConfig.imageCarouselLargeWidthId, movie.imageUrl) : '',
                                        onPress: () => null,
                                    }))
                                }
                                onEndReached={() => performCallGetPopularMovieListRequest()}
                            />
                            : null
                    }
                    <Text style={styles.subTitle}>Family</Text>
                    {
                        familyMovies && imageConfig
                            ? <Carousel
                                type={'Small'}
                                itemList={
                                    familyMovies.movieList.map((movie: Models.IMovie): ICarouselItem => ({
                                        title: movie.title,
                                        imageSource: movie.imageUrl ? util.getImageUrl(imageConfig.imageBaseUrl, imageConfig.imageCarouselLargeWidthId, movie.imageUrl) : '',
                                        onPress: () => null,
                                    }))
                                }
                                onEndReached={() => {
                                    const familyGenre: Models.IGenre | undefined = util.getFamilyGenreId(movieGenres)
                                    familyGenre ? performCallGetPopularMovieListRequest(({genre: 'Family', id: familyGenre.id})) : null}
                                }
                            />
                            : null
                    }
                    <Text style={styles.subTitle}>Documentary</Text>
                    {
                        documentaryMovies && imageConfig
                            ? <Carousel
                                type={'Small'}
                                itemList={
                                    documentaryMovies.movieList.map((movie: Models.IMovie): ICarouselItem => ({
                                        title: movie.title,
                                        imageSource: movie.imageUrl ? util.getImageUrl(imageConfig.imageBaseUrl, imageConfig.imageCarouselLargeWidthId, movie.imageUrl) : '',
                                        onPress: () => null,
                                    }))
                                }
                                onEndReached={() => {
                                    const documentaryGenre: Models.IGenre | undefined = util.getDocumentaryGenreId(movieGenres)
                                    documentaryGenre ? performCallGetPopularMovieListRequest(({genre: 'Documentary', id: documentaryGenre.id})) : null}
                                }
                            />
                            : null
                    }

                    {/* TV section */}
                    <Text style={styles.title}>TV Series</Text>
                    <Text style={styles.subTitle}>Most popular</Text>
                    {
                        popularTVPrograms && imageConfig
                            ? <Carousel
                                type={'Large'}
                                itemList={
                                    popularTVPrograms.tvList.map((tv: Models.ITV): ICarouselItem => ({
                                        title: tv.title,
                                        imageSource: tv.imageUrl ? util.getImageUrl(imageConfig.imageBaseUrl, imageConfig.imageCarouselLargeWidthId, tv.imageUrl) : '',
                                        onPress: () => null,
                                    }))
                                }
                                onEndReached={() => performCallGetPopularTVProgramListRequest()}
                            />
                            : null
                    }
                    <Text style={styles.subTitle}>Family</Text>
                    {
                        familyTVPrograms && imageConfig
                            ? <Carousel
                                type={'Small'}
                                itemList={
                                    familyTVPrograms.tvList.map((tv: Models.ITV): ICarouselItem => ({
                                        title: tv.title,
                                        imageSource: tv.imageUrl ? util.getImageUrl(imageConfig.imageBaseUrl, imageConfig.imageCarouselLargeWidthId, tv.imageUrl) : '',
                                        onPress: () => null,
                                    }))
                                }
                                onEndReached={() => {
                                    const familyGenre: Models.IGenre | undefined = util.getFamilyGenreId(tvProgramGenres)
                                    familyGenre ? performCallGetPopularTVProgramListRequest(({genre: 'Family', id: familyGenre.id})) : null}
                                }
                            />
                            : null
                    }
                    <Text style={styles.subTitle}>Documentary</Text>
                    {
                        documentaryTVPrograms && imageConfig
                            ? <Carousel
                                type={'Small'}
                                itemList={
                                    documentaryTVPrograms.tvList.map((tv: Models.ITV): ICarouselItem => ({
                                        title: tv.title,
                                        imageSource: tv.imageUrl ? util.getImageUrl(imageConfig.imageBaseUrl, imageConfig.imageCarouselLargeWidthId, tv.imageUrl) : '',
                                        onPress: () => null,
                                    }))
                                }
                                onEndReached={() => {
                                    const documentaryGenre: Models.IGenre | undefined = util.getDocumentaryGenreId(movieGenres)
                                    documentaryGenre ? performCallGetPopularTVProgramListRequest(({genre: 'Documentary', id: documentaryGenre.id})) : null}
                                }
                            />
                            : null
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    title: {
        color: '#FFF',
        fontSize: 26,
        fontWeight: '800',
        marginLeft: 14,
        marginBottom: 25,
    },
    subTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 14,
        marginBottom: 10,
    },
})

export default ViewApp
