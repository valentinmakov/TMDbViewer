import React from 'react'
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {IAppProps} from '../Containers/ContainerApp'
import {Models} from '../Models/models'
import * as util from '../Utilities/utilities'
import {Carousel, ICarouselItem} from '../UIKit'

/**
 * Returns true if all network are in progress or are about to start
 */
const isEverythingLoading = (
    {
        popularMoviesPhase,
        popularTVProgramsPhase,
        movieGenresPhase,
        familyMoviesPhase,
        documentaryMoviesPhase,
        tvProgramGenresPhase,
        familyTVProgramsPhase,
        documentaryTVProgramsPhase,
        imageConfigPhase,
    }: IAppProps
): boolean => {
    return (
        (popularMoviesPhase === 'InProgress' || popularMoviesPhase === 'Never') &&
        (popularTVProgramsPhase === 'InProgress' || popularTVProgramsPhase === 'Never') &&
        (movieGenresPhase === 'InProgress' || movieGenresPhase === 'Never') &&
        (familyMoviesPhase === 'InProgress' || familyMoviesPhase === 'Never') &&
        (documentaryMoviesPhase === 'InProgress' || documentaryMoviesPhase === 'Never') &&
        (tvProgramGenresPhase === 'InProgress' || tvProgramGenresPhase === 'Never') &&
        (familyTVProgramsPhase === 'InProgress' || familyTVProgramsPhase === 'Never') &&
        (documentaryTVProgramsPhase === 'InProgress' || documentaryTVProgramsPhase === 'Never') &&
        (imageConfigPhase === 'InProgress' || imageConfigPhase === 'Never')
    )
}

const renderLoader = (): React.ReactElement<View> => {
    return (
        <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator/>
        </View>
    )
}

const renderBody = (
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
): React.ReactElement<ScrollView> => {
    return (
        <ScrollView
            style={styles.container}
            directionalLockEnabled={true}
        >
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
                    : popularMoviesPhase === 'InProgress' || imageConfigPhase === 'InProgress'
                        ? <Carousel
                            type={'LargeShimmer'}
                            itemList={[]}
                            onEndReached={() => null}
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
                    : familyMoviesPhase === 'InProgress' || imageConfigPhase === 'InProgress'
                        ? <Carousel
                            type={'SmallShimmer'}
                            itemList={[]}
                            onEndReached={() => null}
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
                    : documentaryMoviesPhase === 'InProgress' || imageConfigPhase === 'InProgress'
                        ? <Carousel
                            type={'SmallShimmer'}
                            itemList={[]}
                            onEndReached={() => null}
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
                    : popularTVProgramsPhase === 'InProgress' || imageConfigPhase === 'InProgress'
                        ? <Carousel
                            type={'LargeShimmer'}
                            itemList={[]}
                            onEndReached={() => null}
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
                    : familyTVProgramsPhase === 'InProgress' || imageConfigPhase === 'InProgress'
                        ? <Carousel
                            type={'SmallShimmer'}
                            itemList={[]}
                            onEndReached={() => null}
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
                    : documentaryTVProgramsPhase === 'InProgress' || imageConfigPhase === 'InProgress'
                        ? <Carousel
                            type={'SmallShimmer'}
                            itemList={[]}
                            onEndReached={() => null}
                        />
                        : null
            }
        </ScrollView>
    )
}

/**
 * Renders app's main screen
 */
const ViewApp: React.FunctionComponent<IAppProps> = (props: IAppProps): React.ReactElement<IAppProps> => {
    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <SafeAreaView style={{backgroundColor: '#000', flex: 1}}>
                {
                    isEverythingLoading(props)
                        ? renderLoader()
                        : renderBody(props)}
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
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
