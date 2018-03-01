import { User } from "./user";
import { Film } from "./film";
import { Review } from "./review";

export class HistoryItem {
    id: number;
    film: Film;
    user?: User;
    partner?: User;
    date: Date;
    reviews: Review[];
}