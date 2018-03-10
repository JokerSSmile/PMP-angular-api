import { UserDefault } from "./user";
import { FilmDefault } from "./film";
import { Review } from "./review";

export class HistoryItem {
    id: number;
    film: FilmDefault;
    user?: UserDefault;
    partner?: UserDefault;
    date: Date;
    reviews: Review[];
}