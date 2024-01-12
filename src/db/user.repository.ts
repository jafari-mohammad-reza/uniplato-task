import { prisma } from '../helper';

export async function UserExist(email: string): Promise<boolean> {
  const user = await FindUser(email);
  return !!user;
}

export async function FindUser(
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
