import { User } from './user';
import { Film } from './film';

export enum InviteStatus {
    Waiting = '0',
    Accepted = '1',
    Cancelled = '2'
}

export class Invite {
    id: number;
    invited_user?: User;
    user?: User;
    film: Film;
    status: InviteStatus;
    date: Date;
}

export class InviteRequest {
    filmId: number;
    from: number;
    to: number;
}

export class InviteStatusUpdateRequest {
    inviteId: number;
    status: InviteStatus;
}