import { UserDefault } from './user';
import { FilmDefault } from './film';

export enum InviteStatus {
    Waiting = '0',
    Accepted = '1',
    Cancelled = '2'
}

export class Invite {
    id: number;
    invited_user?: UserDefault;
    user?: UserDefault;
    film: FilmDefault;
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