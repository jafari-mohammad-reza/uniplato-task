import { FindUser, UserExist } from '../db';
import { compareHashed, ERRORS, hashString, prisma, SignToken } from '../helper';
export async function Login(email: string, password: string): Promise<string> {
  const existUser = await FindUser(email);
  if (!existUser) {
    throw ERRORS.userNotExists;
  }
  const isValidPassword = compareHashed(password, {
    hashedString: existUser.password,
    salt: existUser.salt,
  });
  if (!isValidPassword) {
    throw ERRORS.userNotExists;
  }
  return SignToken({ id: existUser.id });
}

export async function Register(email: string, password: string) {
  const existUser = await UserExist(email);
  if (existUser) {
    throw ERRORS.userExists;
  }
  const { hashedString, salt } = hashString(password);
  const createdUser = await prisma.user.create({
    data: {
      email,
      password: hashedString,
      salt,
    },
  });

  if (!createdUser) {
    throw ERRORS.createFailed;
  }
}
