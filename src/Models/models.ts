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
    }

    /* START Models for Actions */
    export interface IAction {
        type: string,
        payload?: IActionPayload,
    }

    export type IActionPayload = (
        IError |
        IPopularMovieList
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
}
