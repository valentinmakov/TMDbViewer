export namespace Enums {
    // Variants of network call state
    export type NetworkCallPhase = (
        'Never' | 'InProgress' | 'Success' | 'Failure'
    )
}

export namespace Models {
    // Model for reducer state
    export interface IRootState {
        popularMovies: IPopularMovieList | null,
        popularMoviesPhase: Enums.NetworkCallPhase,
        popularMoviesError: IError | null,

        popularTVPrograms: IPopularTVProgramList | null,
        popularTVProgramsPhase: Enums.NetworkCallPhase,
        popularTVProgramsError: IError | null,
    }

    /* START Models for Actions */
    export interface IAction {
        type: string,
        payload?: IActionPayload,
    }

    export type IActionPayload = (
        IError |
        IPopularMovieList |
        IPopularTVProgramList
    )
    /* END Models for Actions */

    // Model for formatted error
    export interface IError {
        code?: string,
        message: string,
        comment?: string,
    }

    /* START Models for /discover/movie REST response */
    export interface IPopularMovieListResponse {
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
    export interface IPopularMovieList {
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
}
