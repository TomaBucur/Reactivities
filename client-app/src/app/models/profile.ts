import { isThisHour } from "date-fns";
import { User } from "./User";

export interface Profile {
    username: string;
    displayName: string;
    image?: string;
    Bio?: string;
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}