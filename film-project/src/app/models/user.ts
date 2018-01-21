import { Film } from '../models/film';
import { Invite } from '../models/invite';
import { Review } from '../models/review';

export enum Gender {
    Male = '0',
    Female = '1',
    Uncknown = '2'
}

export class User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    surname: string;
    age: number;
    gender: Gender;
    phone: string;
    user_image_url: string;
    films: Film[];
    invites: Invite[];
    invited_me: Invite[];
    reviews: Review[];
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