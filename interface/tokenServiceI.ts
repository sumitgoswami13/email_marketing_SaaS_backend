export interface tokenServiceI {
    generateToken(payload: any): Promise<string>; // Generate a token asynchronously
  
    verifyToken(token: string): Promise<any>; // Verify a token and return the decoded payload asynchronously
  }
  