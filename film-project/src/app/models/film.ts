import { User } from './user'
import { HistoryItem } from './history';

export enum FilmStatus {
    Current = 0,
    History = 1
}

export class Film {
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
    users: User[];
    histories: HistoryItem[];
}

export class Ratings {
    kp_rating: number;
    imdb_rating: number;
}