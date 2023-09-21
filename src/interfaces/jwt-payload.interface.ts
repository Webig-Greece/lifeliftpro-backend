// jwt-payload.interface.ts
export interface JwtPayload {
  email: string;
  sub: number; // This is typically the user ID
  // Add any other fields you have in your JWT payload
  // role: string;
}
