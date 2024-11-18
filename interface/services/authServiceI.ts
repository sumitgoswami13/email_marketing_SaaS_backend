import { User } from '../../models/user'; // Assuming you have a User model/interface

export interface AuthServiceI {
  /**
   * Registers a new user.
   * @param userData - Partial user data required for signup.
   * @returns The created user object.
   */
  signup(name:string, email: string, password: string): Promise<User>;

  /**
   * Logs in a user.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns An authentication token if the login is successful.
   */
  login(email: string, password: string): Promise<string>;

  /**
   * Logs in a user using social credentials.
   * @param provider - The social login provider (e.g., Google, Facebook).
   * @param accessToken - The access token provided by the social platform.
   * @returns An authentication token if the social login is successful.
   */
  socialLogin(provider: string, accessToken: string): Promise<string>;
}
