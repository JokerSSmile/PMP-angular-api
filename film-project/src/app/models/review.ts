import { UserDefault } from "./user";
import { HistoryItem } from "./history";

export class Review {
    id: number;
    user: UserDefault;
    sender: UserDefault;
    rating: number;
    comment: string;
    history: HistoryItem;
}

export class AddReviewRequest {
    senderId: number;
    userId: number;
    rating: number;
    comment: string;
    historyId: number;
}