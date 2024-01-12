import { hashString, prisma } from '../helper';
import { config } from 'dotenv';

async function Seed() {
  config();

  const adminData = { email: 'admin@gmail.com', password: 'Pass#1234' };
  const userData = { email: 'user@gmail.com', password: 'UserPass#1234' };

  const { hashedString: adminHash, salt: adminSalt } = hashString(adminData.password);
  const { hashedString: userHash, salt: userSalt } = hashString(userData.password);

  const seedUsers = [
    { email: adminData.email, password: adminHash, salt: adminSalt },
    { email: userData.email, password: userHash, salt: userSalt },
  ];

  await Promise.all(
    seedUsers.map(async (user) => {
      const existUser = await prisma.user.findFirst({ where: { email: user.email } });
      if (!existUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            password: user.password,
            salt: user.salt,
          },
        });
      }
    }),
  );
}

Seed();
