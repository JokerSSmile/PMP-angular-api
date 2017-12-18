export enum InviteStatus {
    Waiting = 0,
    Accepted = 1,
    Cancelled = 2
}

export class Invite {
    id: number;
    userId: number;
    invitedUserId: number;
    filmId: number;
    status: InviteStatus;
}