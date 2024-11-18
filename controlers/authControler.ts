import { Request, Response } from "express";
import { AuthControllerI } from "../interface/controlers/authControlerI";
import { AuthServiceI } from "../interface/services/authServiceI";
import { User } from "../models/user";

class AuthController implements AuthControllerI {
  private authService: AuthServiceI;

  constructor(authService: AuthServiceI) {
    this.authService = authService;
  }

  async signup(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
      }

      const result: User = await this.authService.signup(name, email, password);
      return res.status(201).json({
        message: "User created successfully.",
        user: {
          id: result.id,
          name: result.name,
          email: result.email,
          isActive: result.isActive,
          isPremiumUser: result.isPremiumUser,
        },
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "An error occurred during signup." });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }

      const token: string = await this.authService.login(email, password);
      return res.status(200).json({ message: "Login successful.", token });
    } catch (error: any) {
      return res.status(401).json({ message: error.message || "Invalid email or password." });
    }
  }

  async socialLogin(req: Request, res: Response): Promise<Response> {
    try {
      const { provider, accessToken } = req.body;
      if (!provider || !accessToken) {
        return res.status(400).json({ message: "Provider and access token are required." });
      }

      const token: string = await this.authService.socialLogin(provider, accessToken);
      return res.status(200).json({ message: "Social login successful.", token });
    } catch (error: any) {
      return res.status(401).json({ message: error.message || "Social login failed." });
    }
  }
}

export default AuthController;
