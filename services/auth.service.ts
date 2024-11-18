import { AuthServiceI } from "../interface/services/authServiceI";
import { emailServiceI } from "../interface/emailServiceI";
import { UserRepositoryI } from "../interface/repositoriesI/userRepositoryI";
import { User } from "../models/user";
import { tokenServiceI } from "../interface/tokenServiceI";

class AuthService implements AuthServiceI {
  private userRepository: UserRepositoryI ;
  private emailService: emailServiceI;
  private tokenService: tokenServiceI;

  constructor(userRepository: UserRepositoryI, emailService: any, tokenService: any) {
    this.userRepository = userRepository;
    this.emailService = emailService;
    this.tokenService = tokenService;
  }

  async signup(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      isActive: true,
      isPremiumUser: false,
    });
    const data = {
      subject: "Welcome to Our Platform!",
      message: `Hi ${name}, thank you for signing up!`
    };
    
    await this.emailService.sendEmail(email, data);
    
    return newUser;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user || !user.password) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await this.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const token = this.tokenService.generateToken({ id: user.id, email: user.email });
    return token;
  }
  

  async socialLogin(provider: string, accessToken: string): Promise<string> {
    const userInfo = await this.verifySocialAccessToken(provider, accessToken);

    let user = await this.userRepository.findUserByEmail(userInfo.email);
    if (!user) {
      user = await this.userRepository.create({
        name: userInfo.name,
        email: userInfo.email,
        password: null,
        isActive: true,
        isPremiumUser: false,
      });
    }

    const token = this.tokenService.generateToken({ id: user.id, email: user.email });
    return token;
  }

  private async hashPassword(password: string): Promise<string> {
    const bcrypt = require("bcrypt");
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const bcrypt = require("bcrypt");
    return bcrypt.compare(password, hashedPassword);
  }

  private async verifySocialAccessToken(
    provider: string,
    accessToken: string
  ): Promise<{ email: string; name: string }> {
    if (provider === "google") {
      return { email: "google_user@example.com", name: "Google User" };
    } else if (provider === "facebook") {
      return { email: "facebook_user@example.com", name: "Facebook User" };
    }

    throw new Error("Unsupported social login provider");
  }
}

export default AuthService;
