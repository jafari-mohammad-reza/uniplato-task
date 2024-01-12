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
async function UserExist(email: string): Promise<boolean> {
  const user = await FindUser(email);
  return !!user;
}

async function FindUser(
  email: string,
): Promise<{ id: number; email: string; password: string; salt: string }> {
  return await prisma.user.findFirst({
    where: { email },
    select: {
      email: true,
      password: true,
      salt: true,
      id: true,
    },
  });
}
