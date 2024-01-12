import { ERRORS, prisma } from 'helper';
import { FindUser, Login, Register, UserExist } from 'services/auth.service';
jest.mock('../helper/prisma', () => ({
  user: {
    create: jest.fn(),
  },
}));
describe('Login Function', () => {
  it('should return a token for valid credentials', async () => {
    jest.spyOn(require('../helper'), 'FindUser').mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      salt: 'salt',
    });

    const token = await Login('test@example.com', 'validPassword');
    expect(token).toBeDefined();
  });

  it('should throw an error for non-existing users', async () => {
    jest.spyOn(require('../helper'), 'FindUser').mockResolvedValue(null);
    await expect(Login('nonexisting@example.com', 'password')).rejects.toThrow(
      ERRORS.userNotExists,
    );
  });

  it('should throw an error for invalid credentials', async () => {
    jest.spyOn(require('../helper'), 'FindUser').mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      salt: 'salt',
    });

    await expect(Login('test@example.com', 'invalidPassword')).rejects.toThrow(
      ERRORS.userNotExists,
    );
  });
});
describe('User Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully register a new user', async () => {
    jest.spyOn(require('../helper'), 'UserExist').mockResolvedValue(false);

    jest
      .spyOn(require('../helper'), 'hashString')
      .mockReturnValue({ hashedString: 'hashedPassword', salt: 'salt' });

    const createUserMock = prisma.user.create as jest.Mock;
    createUserMock.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      salt: 'salt',
    });

    await expect(Register('test@example.com', 'validPassword')).resolves.toEqual({
      id: 1,
      email: 'test@example.com',
      salt: 'salt',
    });
  });

  it('should throw an error if the user already exists during registration', async () => {
    jest.spyOn(require('../helper'), 'UserExist').mockResolvedValue(true);

    await expect(Register('existing@example.com', 'password')).rejects.toThrow(ERRORS.userExists);
  });

  it('should throw an error if user creation fails during registration', async () => {
    jest.spyOn(require('../helper'), 'UserExist').mockResolvedValue(false);

    const createUserMock = prisma.user.create as jest.Mock;
    createUserMock.mockRejectedValue(new Error('User creation failed'));

    await expect(Register('test@example.com', 'validPassword')).rejects.toThrow(
      ERRORS.createFailed,
    );
  });

  it('should return true if a user with a given email exists', async () => {
    const findUserMock = prisma.user.findFirst as jest.Mock;
    findUserMock.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      salt: 'salt',
    });

    const emailExists = await UserExist('test@example.com');
    expect(emailExists).toBe(true);
  });

  it('should return false if a user with a given email does not exist', async () => {
    const findUserMock = prisma.user.findFirst as jest.Mock;
    findUserMock.mockResolvedValue(null);

    const emailExists = await UserExist('nonexisting@example.com');
    expect(emailExists).toBe(false);
  });

  it('should find a user by email', async () => {
    const findUserMock = prisma.user.findFirst as jest.Mock;
    findUserMock.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      salt: 'salt',
    });

    const user = await FindUser('test@example.com');
    expect(user).toEqual({
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      salt: 'salt',
    });
  });

  it('should return null if a user with a given email does not exist when finding a user', async () => {
    const findUserMock = prisma.user.findFirst as jest.Mock;
    findUserMock.mockResolvedValue(null);

    const user = await FindUser('nonexisting@example.com');
    expect(user).toBeNull();
  });
});
