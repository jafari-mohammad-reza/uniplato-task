import { prisma } from 'helper';
import bcrypt from 'bcrypt';

async function Seed() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('Admin@123', salt);
  const seedUsers = [
    { email: 'admin@gmail.com', password: hashedPassword },
    { email: 'user@gmail.com', password: hashedPassword },
  ];
  await Promise.all([
    seedUsers.forEach(async (user) => {
      const existUser = await prisma.user.findFirst({ where: { email: user.email } });
      if (!existUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            password: user.password,
          },
        });
      }
    }),
  ]);
}
Seed();
