import constants from "../constants";
import { UserWithToken } from "../types";
import AuthLocalDb from "./auth-local-db";

export default class Auth {
  static instance: Auth;

  static {
    if (!Auth.instance) {
      Auth.instance = new Auth();
    }
  }

  static isClient() {
    return typeof window !== "undefined";
  }

  static getDbInstance() {
    return new AuthLocalDb();
  }

  static validateUser(user: UserWithToken) {
    return !!(user._id && user.email && user.token);
  }

  async loginWithPassword(
    email: string,
    password: string
  ): Promise<UserWithToken> {
    try {
      const response = await fetch(`${constants.baseUrl}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const json = await response.json();

      if (Auth.isClient() && Auth.validateUser(json)) {
        const db = Auth.getDbInstance();

        await db.user.put(json);
      }

      return json;
    } catch (e) {
      const error = e as Error;

      throw new Error(error.message);
    }
  }

  async signupWithPassword(
    email: string,
    password: string
  ): Promise<UserWithToken> {
    try {
      const response = await fetch(
        `${constants.baseUrl}/api/auth/localSignUp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const json = await response.json();

      if (Auth.isClient()) {
        const db = Auth.getDbInstance();

        await db.user.put(json);
      }

      return json;
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }

  async initiateLoginWithGoogle(): Promise<void> {
    try {
      const response = await fetch(`${constants.baseUrl}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (Auth.isClient()) {
        window.location.href = json.url;
      }
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }

  async loginWithGoogle(url: string): Promise<UserWithToken> {
    try {
      const response = await fetch(
        `${constants.baseUrl}/api/auth/oauthConfirm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
          }),
        }
      );

      const json = await response.json();

      if (Auth.isClient()) {
        const db = Auth.getDbInstance();

        await db.user.put(json);
      }

      return json;
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }
}
