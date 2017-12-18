import { User } from './user'

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
    director: string;
    actors: string;
    users: User[];
}