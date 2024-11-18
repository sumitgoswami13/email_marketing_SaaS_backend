import { tokenServiceI } from "../interface/tokenServiceI";
const jwt = require('jsonwebtoken')

class TokenService implements tokenServiceI {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(secret: string, expiresIn: string = "1h") {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  async generateToken(payload: any): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.secret, { expiresIn: this.expiresIn }, (err:any, token:any) => {
        if (err || !token) {
          return reject(new Error("Token generation failed"));
        }
        resolve(token);
      });
    });
  }

  async verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err:any, decoded:any) => {
        if (err) {
          return reject(new Error("Token verification failed"));
        }
        resolve(decoded);
      });
    });
  }
}

export default TokenService;
