import { Request, Response } from "express";

export interface AuthControllerI {
  signup(req: Request, res: Response): Promise<Response>;
  login(req: Request, res: Response) :Promise <Response>;
  socialLogin(req:Request,res:Response) :Promise<Response>
}
