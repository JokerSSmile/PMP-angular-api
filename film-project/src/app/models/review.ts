import { User } from "./user";
import { HistoryItem } from "./history";

export class Review {
    id: number;
    user: User;
    sender: User;
    rating: number;
    comment: string;
    history: HistoryItem;
}