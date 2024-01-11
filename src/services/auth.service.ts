import { ERRORS, prisma, SignToken } from '../helper';
import bcrypt from 'bcrypt';

export async function Login(email: string, password: string): Promise<string> {
  const existUser = await FindUser(email);
  if (!existUser) {
    throw ERRORS.userNotExists;
  }
  const validPassword = await bcrypt.compare(password.trim(), existUser.password.trim());
  if (!validPassword) {
    throw ERRORS.userNotExists;
  }
  return SignToken({ id: existUser.id });
}

export async function Register(email: string, password: string) {
  const existUser = await UserExist(email);
  if (existUser) {
    throw ERRORS.userExists;
  }
  const createdUser = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    },
  });
  if (createdUser) {
    throw ERRORS.createFailed;
  }
}
async function UserExist(email: string): Promise<boolean> {
  const user = await FindUser(email);
  return !!user;
}

async function FindUser(email: string): Promise<{ id: number; email: string; password: string }> {
  return await prisma.user.findFirst({
    where: { email },
    select: {
      email: true,
      password: true,
      id: true,
    },
  });
}
