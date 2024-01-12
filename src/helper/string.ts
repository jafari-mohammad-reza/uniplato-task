import jwt from 'jsonwebtoken';
import { createCipheriv, createDecipheriv, createHash, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface HashedData {
  salt: string;
  hashedString: string;
}

export function SignToken(paylaod: jwt.JwtPayload, exp: string = '30m'): string {
  return jwt.sign(paylaod, process.env.JWT_SECRET, { expiresIn: exp });
}

export function DecodeToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
}
export function isJwtExpired(exp: number) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return currentTimestamp > exp;
}

export function hashString(dataToHash: string): HashedData {
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256');
  const saltedData = salt + dataToHash;
  hash.update(saltedData);
  const hashedString = salt + hash.digest('hex');
  return {
    salt,
    hashedString,
  };
}

export function compareHashed(rawString: string, hashedData: HashedData): boolean {
  const { salt, hashedString } = hashedData;
  const saltedRawString = salt + rawString;
  const hashedRawString = createHash('sha256').update(saltedRawString).digest('hex');
  const hashedSaltedRawString = salt + hashedRawString;
  return hashedSaltedRawString === hashedString;
}
