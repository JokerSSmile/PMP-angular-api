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

export class AddReviewRequest {
    senderId: number;
    userId: number;
    rating: number;
    comment: string;
    historyId: number;
}