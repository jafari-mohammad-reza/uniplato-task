import jwt from 'jsonwebtoken';
export function SignToken(paylaod: jwt.JwtPayload, exp: string = '30m'): string {
  return jwt.sign(paylaod, process.env.JWT_SECRET, { expiresIn: exp });
}

export function DecodeToken(token: string): jwt.JwtPayload {
  return jwt.decode(token) as jwt.JwtPayload;
}
