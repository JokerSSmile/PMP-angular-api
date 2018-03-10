import { FilmDefault } from '../models/film';
import { Invite } from '../models/invite';
import { Review } from '../models/review';
import { HistoryItem } from './history';

export enum Gender {
    Male = '0',
    Female = '1',
    Uncknown = '2'
}

export class UserDefault {
    id: number;
    username: string;
    email: string;
    first_name: string;
    surname: string;
    phone: string;
    user_image_url: string;
}

export class UserExtended {
    id: number;
    username: string;
    email: string;
    first_name: string;
    surname: string;
    age: number;
    gender: Gender;
    phone: string;
    user_image_url: string;
}

export class Password {
    first: string;
    second: string;
}

export class UserRegisterPreRequest {
    username: string;
    email: string;
    plainPassword: Password;
}

export class UserRegusterRequest {
    id: number;
    name: string;
    surname: string;
    age: number;
    gender: Gender;
    phone: string;
}