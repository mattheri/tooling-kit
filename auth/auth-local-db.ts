import Dexie from "dexie";
import { User } from "../types";

interface IUser extends User {
  token: string;
}

export default class AuthLocalDb extends Dexie {
  user!: Dexie.Table<IUser, string>;

  constructor() {
    super("Auth");

    this.version(1).stores({
      user: "_id, email, token, authType, authId, authToken",
    });
  }
}
