import { Gender } from "./user";

export class SettingsRequest {
    firstName: string;
    surname: string;
    age: number;
    gender: Gender;
    phone: string;
}