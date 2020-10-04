export namespace Enums {
    // Variants of network call state
    export type NetworkCallPhase = (
        'Never' | 'InProgress' | 'Success' | 'Failure'
    )

    // Variants of genre types
    export type GenreType = (
        'Family' | 'Documentary'
    )

    // Variants of image size
    export type ImageSizeType = (
        'CarouselLarge' | 'CarouselSmall' | 'Details'
    )
}

export namespace Models {
    // Model for reducer state
    export interface IRootState {
        popularMovies: IMovieList | null,
        popularMoviesPhase: Enums.NetworkCallPhase,
        popularMoviesError: IError | null,

        popularTVPrograms: ITVProgramList | null,
        popularTVProgramsPhase: Enums.NetworkCallPhase,
        popularTVProgramsError: IError | null,

        movieGenres: IGenreList | null,
        movieGenresPhase: Enums.NetworkCallPhase,
        movieGenresError: IError | null,

        familyMovies: IMovieList | null,
        familyMoviesPhase: Enums.NetworkCallPhase,
        familyMoviesError: IError | null,

        documentaryMovies: IMovieList | null,
        documentaryMoviesPhase: Enums.NetworkCallPhase,
        documentaryMoviesError: IError | null,

        tvProgramGenres: IGenreList | null,
        tvProgramGenresPhase: Enums.NetworkCallPhase,
        tvProgramGenresError: IError | null,

        familyTVPrograms: ITVProgramList | null,
        familyTVProgramsPhase: Enums.NetworkCallPhase,
        familyTVProgramsError: IError | null,

        documentaryTVPrograms: ITVProgramList | null,
        documentaryTVProgramsPhase: Enums.NetworkCallPhase,
        documentaryTVProgramsError: IError | null,

        imageConfig: IImageConfig | null,
        imageConfigPhase: Enums.NetworkCallPhase,
        imageConfigError: IError | null,
    }

    /* START Models for Actions */
    export interface IAction {
        type: string,
        payload?: IActionPayload,
    }

    export type IActionPayload = (
        IError |
        IMovieList |
        ITVProgramList |
        IGenreList |
        IImageConfig
    )
    /* END Models for Actions */

    // Model for formatted error
    export interface IError {
        code?: string,
        message: string,
        comment?: string,
    }

    /* START Models for /discover/movie REST response */
    export interface IMovieListResponse {
        page?: number,
        total_pages?: number,
        results?: IMovieResponse[],
    }

    export interface IMovieResponse {
        id?: number,
        title?: string,
        poster_path?: string | null,
    }
    /* END Models for /discover/movie REST response */

    /* START Models for converted /discover/movie REST response */
    export interface IMovieList {
        currentPage: number,
        totalPages: number,
        movieList: IMovie[],
    }

    export interface IMovie {
        id: number,
        imageUrl: string | null,
        title: string,
    }
    /* END Models for converted /discover/movie REST response */

    /* START Models for /discover/tv REST response */
    export interface ITVProgramListResponse {
        page?: number,
        total_pages?: number,
        results?: ITVProgramResponse[],
    }

    export interface ITVProgramResponse {
        id?: number,
        name?: string,
        poster_path?: string | null,
    }
    /* END Models for /discover/tv REST response */

    /* START Models for converted /discover/tv REST response */
    export interface ITVProgramList {
        currentPage: number,
        totalPages: number,
        tvList: ITV[],
    }

    export interface ITV {
        id: number,
        imageUrl: string | null,
        title: string,
    }
    /* END Models for converted /discover/tv REST response */

    /* START Models for /genre/movie/list and /genre/tv/list REST response */
    export interface IGenreListResponse {
        genres?: IGenreResponse[],
    }

    export interface IGenreResponse {
        name?: string,
        id?: number,
    }
    /* END Models for /genre/movie/list and /genre/tv/list REST response */

    /* START Models for converted /genre/movie/list and /genre/tv/list REST response */
    export interface IGenreList {
        data: IGenre[] | null,
    }

    export interface IGenre {
        genre: string,
        id: number,
    }
    /* END Models for converted /genre/movie/list and /genre/tv/list REST response */

    // Model for query genre object
    export interface IGenreId {
        genre: Enums.GenreType,
        id: number,
    }

    /* START Models for /configuration REST response */
    export interface IImageConfigResponse {
        images?: IImageConfigDataResponse,
    }

    export interface IImageConfigDataResponse {
        secure_base_url?: string,
        poster_sizes?: string[],
    }
    /* END Models for /configuration REST response */

    /* START Models for converted /configuration REST response */
    export interface IImageConfig {
        imageBaseUrl: string,
        imageCarouselLargeWidthId: string,
        imageCarouselSmallWidthId: string,
        imageDetailsWidthId: string,
    }
    /* END Models for converted /configuration REST response */
}
