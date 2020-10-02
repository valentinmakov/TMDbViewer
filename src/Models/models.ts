export namespace Enums {
    // Variants of network call state
    export type NetworkCallPhase = (
        'Never' | 'InProgress' | 'Success' | 'Failure'
    )

    // Variants of genre types
    export type GenreType = (
        'Family' | 'Documentary'
    )
}

export namespace Models {
    // Model for reducer state
    export interface IRootState {
        popularMovies: IMovieList | null,
        popularMoviesPhase: Enums.NetworkCallPhase,
        popularMoviesError: IError | null,

        popularTVPrograms: IPopularTVProgramList | null,
        popularTVProgramsPhase: Enums.NetworkCallPhase,
        popularTVProgramsError: IError | null,

        movieGenres: IMovieGenreList | null,
        movieGenresPhase: Enums.NetworkCallPhase,
        movieGenresError: IError | null,

        familyMovies: IMovieList | null,
        familyMoviesPhase: Enums.NetworkCallPhase,
        familyMoviesError: IError | null,

        documentaryMovies: IMovieList | null,
        documentaryMoviesPhase: Enums.NetworkCallPhase,
        documentaryMoviesError: IError | null,
    }

    /* START Models for Actions */
    export interface IAction {
        type: string,
        payload?: IActionPayload,
    }

    export type IActionPayload = (
        IError |
        IMovieList |
        IPopularTVProgramList |
        IMovieGenreList
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
    export interface IPopularTVProgramListResponse {
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
    export interface IPopularTVProgramList {
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

    /* START Models for /genre/movie/list REST response */
    export interface IMovieGenreListResponse {
        genres?: IMovieGenreResponse[],
    }

    export interface IMovieGenreResponse {
        name?: string,
        id?: number,
    }
    /* END Models for /genre/movie/list REST response */

    /* START Models for converted /genre/movie/list REST response */
    export interface IMovieGenreList {
        data: IMovieGenre[] | null,
    }

    export interface IMovieGenre {
        genre: string,
        id: number,
    }
    /* END Models for converted /genre/movie/list REST response */

    // Model for query genre object
    export interface IGenreId {
        genre: Enums.GenreType,
        id: number,
    }
}
