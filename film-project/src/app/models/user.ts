export enum Gender {
    Male = 0,
    Female = 1,
    Uncknown = 2
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
}