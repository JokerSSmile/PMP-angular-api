import { HistoryItem } from './history';

export enum FilmStatus {
    Current = 0,
    History = 1
}

export class FilmDefault {
    id: number;
    title: string;
    status: FilmStatus;
    description: string;
    img_url: string;
    director: string;
    users_count: number;
}

export class FilmExtended {
    id: number;
    title: string;
    status: FilmStatus;
    description: string;
    genres: string;
    rating: number;
    release_date: Date;
    running_time: Date;
    img_url: string;
    wide_img_url: string;
    kinopoisk_id: number;
    director: string;
    actors: string;
}

export class Ratings {
    kp_rating: number;
    imdb_rating: number;
}